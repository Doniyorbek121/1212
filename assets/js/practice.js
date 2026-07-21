/* Practice hub — render saved progress from localStorage */
(function () {
  'use strict';
  const grid = document.getElementById('progressGrid');
  if (!grid) return;

  const SKILLS = [
    { key: 'reading', name: 'Reading', icon: '📖' },
    { key: 'listening', name: 'Listening', icon: '🎧' },
    { key: 'writing', name: 'Writing', icon: '✍️' },
    { key: 'speaking', name: 'Speaking', icon: '🗣️' },
  ];

  function render() {
    let p = {};
    try { p = JSON.parse(localStorage.getItem('ielts-progress') || '{}'); } catch (e) {}
    grid.innerHTML = SKILLS.map(s => {
      const r = p[s.key];
      const hasBand = r && typeof r.band === 'number';
      const band = hasBand ? r.band.toFixed(1) : '—';
      const detail = r ? (r.correct != null ? r.correct + '/' + r.total + ' correct' : 'practised') : 'Not attempted yet';
      const pct = hasBand ? Math.round((r.band / 9) * 100) : 0;
      return `<div class="card" style="padding:20px;">
        <div class="flex between items-center"><span style="font-size:1.6rem;">${s.icon}</span>
          <b class="text-grad" style="font-size:1.5rem;">${band}</b></div>
        <div style="font-weight:700;margin-top:8px;">${s.name}</div>
        <div class="small muted">${detail}</div>
        <div class="bar mt-2"><i style="width:${pct}%"></i></div>
      </div>`;
    }).join('');
  }

  document.getElementById('clearProgress').addEventListener('click', () => {
    if (confirm('Reset all saved practice results on this device?')) {
      localStorage.removeItem('ielts-progress'); render();
    }
  });

  render();
})();
