const fs = require('fs');
const OpenAI = require('openai');

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

async function transcribeAudio(audioPath) {
  if (!client) {
    throw new Error('OPENAI_API_KEY não configurada. Defina no .env para transcrição automática.');
  }

  const transcript = await client.audio.transcriptions.create({
    file: fs.createReadStream(audioPath),
    model: 'gpt-4o-mini-transcribe',
    response_format: 'verbose_json',
  });

  return transcript;
}

async function findBestMoments(transcript) {
  const segments = transcript.segments || [];

  if (!segments.length) {
    return [];
  }

  const prompt = `Você é um editor de vídeos curtos. Com base nos segmentos abaixo, escolha de 3 a 6 cortes com alto potencial viral.
Critérios: frases fortes, momentos emocionantes/divertidos, explicações importantes e pausas naturais.
Cada corte deve ter entre 15 e 60 segundos.
Responda APENAS JSON com formato:
[{"start":number,"end":number,"reason":"...","title":"...","description":"..."}]

SEGMENTOS:
${JSON.stringify(segments.slice(0, 500))}`;

  const result = await client.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.5,
  });

  const content = result.choices[0]?.message?.content || '[]';
  let clips = [];

  try {
    clips = JSON.parse(content);
  } catch {
    clips = [];
  }

  return clips
    .filter((clip) => clip.end - clip.start >= 15 && clip.end - clip.start <= 60)
    .slice(0, 6);
}

function transcriptToSrtForClip(transcript, start, end) {
  const segments = (transcript.segments || []).filter(
    (seg) => seg.start < end && seg.end > start
  );

  const toTimestamp = (seconds) => {
    const date = new Date(seconds * 1000).toISOString().substring(11, 23);
    return date.replace('.', ',');
  };

  return segments
    .map((seg, index) => {
      const s = Math.max(seg.start, start) - start;
      const e = Math.min(seg.end, end) - start;
      const text = (seg.text || '').trim();
      return `${index + 1}\n${toTimestamp(s)} --> ${toTimestamp(e)}\n${text}\n`;
    })
    .join('\n');
}

module.exports = { transcribeAudio, findBestMoments, transcriptToSrtForClip };
