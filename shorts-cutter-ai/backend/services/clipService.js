const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

const subtitleStyles = {
  white: 'Fontsize=18,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,BorderStyle=1,Outline=3,Shadow=1,Alignment=2,MarginV=80',
  yellow: 'Fontsize=18,PrimaryColour=&H0000FFFF,OutlineColour=&H00000000,BorderStyle=1,Outline=3,Shadow=1,Alignment=2,MarginV=80',
  tiktok: 'Fontsize=20,PrimaryColour=&H00FFFFFF,BackColour=&H80000000,BorderStyle=3,Outline=0,Shadow=0,Alignment=2,MarginV=110'
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function renderClip({ inputVideo, outputFile, start, duration, subtitleFile, subtitleStyle = 'white' }) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputVideo)
      .setStartTime(start)
      .setDuration(duration)
      .videoFilters([
        {
          filter: 'scale',
          options: {
            w: 1080,
            h: 1920,
            force_original_aspect_ratio: 'increase'
          }
        },
        { filter: 'crop', options: { w: 1080, h: 1920 } },
        { filter: 'subtitles', options: `${subtitleFile}:force_style='${subtitleStyles[subtitleStyle] || subtitleStyles.white}'` }
      ])
      .outputOptions(['-preset medium', '-crf 22', '-c:a aac', '-b:a 192k'])
      .save(outputFile)
      .on('end', () => resolve(outputFile))
      .on('error', (err) => reject(new Error(`Erro ao renderizar corte: ${err.message}`)));
  });
}

module.exports = { renderClip, ensureDir };
