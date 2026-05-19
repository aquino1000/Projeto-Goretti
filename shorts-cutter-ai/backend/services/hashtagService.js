const OpenAI = require('openai');

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

async function recommendHashtags(text, fallbackTopic = 'conteúdo') {
  if (!client) {
    return ['#shorts', '#viral', '#youtube', '#reels', '#tiktok', '#conteudo'];
  }

  const prompt = `Gere 8 hashtags relevantes em português para o texto abaixo, incluindo #shorts e #viral.
Retorne APENAS JSON array.
Texto: ${text || fallbackTopic}`;

  try {
    const resp = await client.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.6,
    });
    return JSON.parse(resp.choices[0].message.content);
  } catch {
    return ['#shorts', '#viral', '#youtube', '#reels', '#tiktok', '#inteligenciaartificial'];
  }
}

module.exports = { recommendHashtags };
