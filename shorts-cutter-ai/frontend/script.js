const form = document.getElementById('process-form');
const panel = document.getElementById('panel');
const resultsSection = document.getElementById('results');
const statusEl = document.getElementById('status');
const countEl = document.getElementById('count');
const infoEl = document.getElementById('video-info');
const clipsGrid = document.getElementById('clips-grid');
const zipButton = document.getElementById('download-zip');

let currentId = null;
let pollTimer = null;

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const url = document.getElementById('youtube-url').value.trim();
  const subtitleStyle = document.getElementById('subtitle-style').value;
  const authorized = document.getElementById('authorized').checked;

  try {
    const resp = await fetch('/api/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, subtitleStyle, authorized }),
    });
    const data = await resp.json();
    if (!resp.ok) throw new Error(data.error || 'Falha ao iniciar processamento.');

    currentId = data.id;
    panel.classList.remove('hidden');
    resultsSection.classList.add('hidden');
    renderVideoInfo(data.videoInfo, url);
    startPolling();
  } catch (error) {
    alert(error.message);
  }
});

function renderVideoInfo(videoInfo, url) {
  infoEl.innerHTML = `
    <p><strong>Link original:</strong> ${url}</p>
    <p><strong>Título:</strong> ${videoInfo.title}</p>
    <p><strong>Canal:</strong> ${videoInfo.channel}</p>
    <p><strong>Duração:</strong> ${videoInfo.duration}s</p>
    <img src="${videoInfo.thumbnail}" alt="thumbnail" style="width:220px;border-radius:10px" />
  `;
}

function startPolling() {
  if (pollTimer) clearInterval(pollTimer);
  pollTimer = setInterval(async () => {
    const resp = await fetch(`/api/status/${currentId}`);
    const data = await resp.json();
    if (!resp.ok) return;

    statusEl.textContent = data.status;
    countEl.textContent = data.count;

    if (data.status === 'Finalizado') {
      clearInterval(pollTimer);
      await loadResults();
    }

    if (data.status === 'Erro') {
      clearInterval(pollTimer);
      alert(data.error || 'Erro no processamento.');
    }
  }, 3000);
}

async function loadResults() {
  const resp = await fetch(`/api/results/${currentId}`);
  const data = await resp.json();
  if (!resp.ok) return alert(data.error);

  clipsGrid.innerHTML = '';
  data.clips.forEach((clip) => {
    const card = document.createElement('article');
    card.className = 'clip-card';
    card.innerHTML = `
      <video controls src="/api/download/${currentId}/${clip.fileName}"></video>
      <h3>${clip.title}</h3>
      <p>${clip.description || ''}</p>
      <p><strong>Hashtags:</strong> ${clip.hashtags.join(' ')}</p>
      <a class="btn" href="/api/download/${currentId}/${clip.fileName}">Baixar ${clip.fileName}</a>
    `;
    clipsGrid.appendChild(card);
  });

  zipButton.href = `/api/download-zip/${currentId}`;
  resultsSection.classList.remove('hidden');
}
