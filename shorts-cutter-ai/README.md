# Shorts Cutter AI

Plataforma web para gerar cortes curtos (Shorts/Reels/TikTok) a partir de vídeos do YouTube **próprios ou autorizados**.

## Recursos implementados
- Validação de link do YouTube.
- Coleta de título, duração, thumbnail e canal.
- Fila simples de processamento (job por ID).
- Download e processamento de vídeo autorizado.
- Extração de áudio com FFmpeg.
- Transcrição automática com OpenAI (Whisper API).
- Seleção automática dos melhores momentos com IA.
- Geração de cortes 9:16 em 1080x1920 com legenda embutida.
- Estilos de legenda: branco, amarelo, TikTok/Reels.
- Página de resultados com preview, download individual e ZIP.
- Recomendações de hashtags por corte.

## Requisitos
- Node.js 18+
- FFmpeg instalado e disponível no PATH
- (Opcional, recomendado) yt-dlp instalado para fallback de download
- Chave da OpenAI (`OPENAI_API_KEY`) para transcrição e análise inteligente

## Instalação
```bash
npm install
```

## Configuração
Crie `.env` na raiz (`shorts-cutter-ai/.env`):
```env
OPENAI_API_KEY=sua_chave_aqui
PORT=3000
```

## Executar em desenvolvimento
```bash
npm run dev
```

Acesse:
- http://localhost:3000

## Estrutura
```
shorts-cutter-ai/
  frontend/
    index.html
    style.css
    script.js
  backend/
    server.js
    routes/
      processRoutes.js
    services/
      videoService.js
      transcriptService.js
      clipService.js
      hashtagService.js
    outputs/
    temp/
  package.json
  README.md
```

## Endpoints
- `POST /api/process` inicia processamento
- `GET /api/status/:id` status do job
- `GET /api/results/:id` resultados dos cortes
- `GET /api/download/:id/:file` download individual
- `GET /api/download-zip/:id` download de ZIP

## Observações legais
Este sistema **não deve** ser utilizado para burlar DRM, paywall ou direitos autorais. Processe somente vídeos dos quais você seja proprietário ou possua autorização explícita.
