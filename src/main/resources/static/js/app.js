const TOTAL_CHAPTERS = 8;

function getProgress() {
  return JSON.parse(localStorage.getItem('cs50-progress') || '[]');
}

function markChapterDone(chapterId) {
  const progress = new Set(getProgress());
  progress.add(chapterId);
  localStorage.setItem('cs50-progress', JSON.stringify([...progress]));
  alert('Capítulo marcado como concluído!');
  updateProgressUI();
}

function updateProgressUI() {
  const progress = getProgress();
  const percent = Math.round((progress.length / TOTAL_CHAPTERS) * 100);
  const fill = document.getElementById('progressFill');
  const text = document.getElementById('progressText');
  if (fill) fill.style.width = `${percent}%`;
  if (text) text.textContent = `${percent}% concluído (${progress.length}/${TOTAL_CHAPTERS})`;
}

function toggleAnswer(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = el.style.display === 'block' ? 'none' : 'block';
}

(function initTheme(){
  const saved = localStorage.getItem('theme') || 'dark';
  if (saved === 'light') document.body.classList.add('light');
  window.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        document.body.classList.toggle('light');
        localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
      });
    }
    updateProgressUI();
  });
})();
