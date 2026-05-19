const express = require('express');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const { v4: uuidv4 } = require('uuid');

const {
  isValidYouTubeUrl,
  getVideoInfo,
  downloadAuthorizedVideo,
  extractAudio,
} = require('../services/videoService');
const {
  transcribeAudio,
  findBestMoments,
  transcriptToSrtForClip,
} = require('../services/transcriptService');
const { renderClip, ensureDir } = require('../services/clipService');
const { recommendHashtags } = require('../services/hashtagService');

const router = express.Router();
const jobs = new Map();
const queue = [];
let running = false;

async function processQueue() {
  if (running || queue.length === 0) return;
  running = true;
  const id = queue.shift();
  const job = jobs.get(id);
  if (!job) {
    running = false;
    return processQueue();
  }

  const tempDir = path.join(__dirname, '..', 'temp', id);
  const outputDir = path.join(__dirname, '..', 'outputs', id);
  ensureDir(tempDir);
  ensureDir(outputDir);

  try {
    job.status = 'Baixando/processando';
    const videoPath = path.join(tempDir, 'source.mp4');
    await downloadAuthorizedVideo(job.url, videoPath);

    job.status = 'Transcrevendo';
    const audioPath = path.join(tempDir, 'audio.mp3');
    await extractAudio(videoPath, audioPath);
    const transcript = await transcribeAudio(audioPath);

    job.status = 'Gerando cortes';
    const moments = await findBestMoments(transcript);
    if (!moments.length) throw new Error('Nenhum trecho adequado encontrado.');

    const clips = [];
    for (let i = 0; i < moments.length; i++) {
      const m = moments[i];
      const fileName = `corte-${String(i + 1).padStart(2, '0')}.mp4`;
      const srtName = `corte-${String(i + 1).padStart(2, '0')}.srt`;
      const srtPath = path.join(tempDir, srtName);
      fs.writeFileSync(srtPath, transcriptToSrtForClip(transcript, m.start, m.end), 'utf-8');

      const outputFile = path.join(outputDir, fileName);
      await renderClip({
        inputVideo: videoPath,
        outputFile,
        start: m.start,
        duration: m.end - m.start,
        subtitleFile: srtPath,
        subtitleStyle: job.subtitleStyle,
      });

      const hashtags = await recommendHashtags(`${m.title}. ${m.description}. ${m.reason}`);
      clips.push({
        fileName,
        title: m.title || `Corte ${i + 1}`,
        description: m.description || m.reason,
        hashtags,
        reason: m.reason,
        duration: Math.round(m.end - m.start),
      });
    }

    job.clips = clips;
    job.status = 'Finalizado';
    job.count = clips.length;
  } catch (error) {
    job.status = 'Erro';
    job.error = error.message;
  } finally {
    running = false;
    processQueue();
  }
}

router.post('/process', async (req, res) => {
  const { url, authorized, subtitleStyle = 'white' } = req.body;

  if (!url || !isValidYouTubeUrl(url)) {
    return res.status(400).json({ error: 'Link inválido. Envie uma URL válida do YouTube.' });
  }

  if (!authorized) {
    return res.status(400).json({ error: 'Confirme que o vídeo é seu ou autorizado para processamento.' });
  }

  try {
    const videoInfo = await getVideoInfo(url);
    const id = uuidv4();

    jobs.set(id, {
      id,
      url,
      subtitleStyle,
      videoInfo,
      status: 'Aguardando',
      count: 0,
      clips: [],
      createdAt: new Date().toISOString(),
    });

    queue.push(id);
    processQueue();

    return res.json({ id, status: 'Aguardando', videoInfo });
  } catch (error) {
    return res.status(500).json({ error: `Falha ao iniciar processamento: ${error.message}` });
  }
});

router.get('/status/:id', (req, res) => {
  const job = jobs.get(req.params.id);
  if (!job) return res.status(404).json({ error: 'Processo não encontrado.' });

  return res.json({
    id: job.id,
    url: job.url,
    videoInfo: job.videoInfo,
    status: job.status,
    count: job.count,
    error: job.error || null,
  });
});

router.get('/results/:id', (req, res) => {
  const job = jobs.get(req.params.id);
  if (!job) return res.status(404).json({ error: 'Processo não encontrado.' });
  if (job.status !== 'Finalizado') return res.status(400).json({ error: 'Processamento ainda não finalizado.' });

  return res.json({ id: job.id, url: job.url, videoInfo: job.videoInfo, clips: job.clips });
});

router.get('/download/:id/:file', (req, res) => {
  const { id, file } = req.params;
  const filePath = path.join(__dirname, '..', 'outputs', id, file);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Arquivo não encontrado.' });
  return res.download(filePath);
});

router.get('/download-zip/:id', (req, res) => {
  const id = req.params.id;
  const dir = path.join(__dirname, '..', 'outputs', id);
  if (!fs.existsSync(dir)) return res.status(404).json({ error: 'Saída não encontrada.' });

  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', `attachment; filename=cortes-${id}.zip`);

  const archive = archiver('zip', { zlib: { level: 9 } });
  archive.on('error', (err) => res.status(500).send({ error: err.message }));
  archive.pipe(res);
  archive.directory(dir, false);
  archive.finalize();
});

module.exports = router;
