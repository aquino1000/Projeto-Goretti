const fs = require('fs');
const path = require('path');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const YTDlpWrap = require('yt-dlp-wrap').default;

const ytDlp = new YTDlpWrap();

function isValidYouTubeUrl(url) {
  return ytdl.validateURL(url);
}

async function getVideoInfo(url) {
  const info = await ytdl.getInfo(url);
  return {
    title: info.videoDetails.title,
    duration: Number(info.videoDetails.lengthSeconds),
    thumbnail: info.videoDetails.thumbnails?.at(-1)?.url,
    channel: info.videoDetails.author?.name,
  };
}

async function downloadAuthorizedVideo(url, outputPath) {
  return new Promise((resolve, reject) => {
    const stream = ytdl(url, { quality: 'highestvideo' });
    stream.pipe(fs.createWriteStream(outputPath));
    stream.on('end', () => resolve(outputPath));
    stream.on('error', async () => {
      try {
        await ytDlp.execPromise([
          url,
          '-f',
          'bestvideo+bestaudio/best',
          '-o',
          outputPath,
        ]);
        resolve(outputPath);
      } catch (error) {
        reject(new Error('Falha ao baixar vídeo. Verifique autorização e disponibilidade.'));
      }
    });
  });
}

function extractAudio(videoPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .noVideo()
      .audioCodec('libmp3lame')
      .audioBitrate('192k')
      .save(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', (err) => reject(new Error(`Erro ao extrair áudio: ${err.message}`)));
  });
}

function formatSeconds(total) {
  const min = Math.floor(total / 60)
    .toString()
    .padStart(2, '0');
  const sec = Math.floor(total % 60)
    .toString()
    .padStart(2, '0');
  return `${min}:${sec}`;
}

module.exports = {
  isValidYouTubeUrl,
  getVideoInfo,
  downloadAuthorizedVideo,
  extractAudio,
  formatSeconds,
};
