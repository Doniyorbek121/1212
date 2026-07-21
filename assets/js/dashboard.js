/* Dashboard — KPIs, band-trend SVG chart, skill bars, history table */
(function () {
  'use strict';
  if (!window.Store) return;
  const SKILLS = { reading: '📖 Reading', listening: '🎧 Listening', writing: '✍️ Writing', speaking: '🗣️ Speaking' };

  const history = Store.getHistory();
  const scored = history.filter(e => typeof e.band === 'number');

  if (!scored.length) {
    document.getElementById('emptyState').style.display = 'block';
    document.getElementById('dashContent').style.display = 'none';
    return;
  }

  const stats = Store.getStats();

  /* ---- KPIs ---- */
  document.getElementById('kpis').innerHTML = [
    ['Estimated overall', stats.overall.toFixed(1), '🎯'],
    ['Best band', stats.bestBand.toFixed(1), '🏆'],
    ['Tests taken', stats.totalTests, '📝'],
    ['Day streak', stats.streak + '🔥', '📅'],
  ].map(([label, val, ic]) =>
    `<div class="card" style="padding:20px;">
      <div style="font-size:1.5rem;">${ic}</div>
      <div class="big text-grad" style="font-size:2.1rem;font-weight:900;">${val}</div>
      <div class="small muted">${label}</div>
    </div>`).join('');

  /* ---- Band-trend chart (SVG) ---- */
  let currentSkill = 'all';
  const skillsWithData = Object.keys(SKILLS).filter(s => Store.getSkillSeries(s).length);
  const tabs = document.getElementById('trendTabs');
  tabs.innerHTML = ['all', ...skillsWithData].map(s =>
    `<button class="tab ${s === 'all' ? 'active' : ''}" data-s="${s}" style="padding:6px 12px;font-size:.82rem;">${s === 'all' ? 'All' : SKILLS[s].split(' ')[1]}</button>`).join('');

  function series(skill) {
    const arr = skill === 'all' ? scored : Store.getSkillSeries(skill);
    return arr.map(e => e.band);
  }

  function drawChart(skill) {
    const data = series(skill);
    const W = 520, H = 240, pad = 34;
    const el = document.getElementById('chart');
    if (data.length < 2) {
      el.innerHTML = `<p class="muted center" style="padding:40px 0;">Take at least two ${skill === 'all' ? '' : SKILLS[skill].split(' ')[1] + ' '}tests to see a trend.</p>`;
      return;
    }
    const minB = 4, maxB = 9;
    const x = i => pad + (i / (data.length - 1)) * (W - pad * 2);
    const y = b => H - pad - ((b - minB) / (maxB - minB)) * (H - pad * 2);
    const pts = data.map((b, i) => [x(i), y(b)]);
    const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
    const area = line + ` L ${x(data.length - 1).toFixed(1)} ${H - pad} L ${pad} ${H - pad} Z`;
    const grid = [4, 5, 6, 7, 8, 9].map(b =>
      `<line x1="${pad}" y1="${y(b)}" x2="${W - pad}" y2="${y(b)}" stroke="var(--border)" stroke-width="1"/>
       <text x="${pad - 8}" y="${y(b) + 4}" text-anchor="end" font-size="10" fill="var(--text-mut)">${b}</text>`).join('');
    const dots = pts.map((p, i) =>
      `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="4" fill="var(--brand-500)"/>
       <text x="${p[0].toFixed(1)}" y="${(p[1] - 10).toFixed(1)}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--text)">${data[i].toFixed(1)}</text>`).join('');
    el.innerHTML =
      `<svg viewBox="0 0 ${W} ${H}" width="100%" style="overflow:visible;">
        <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--brand-500)" stop-opacity="0.28"/>
          <stop offset="1" stop-color="var(--brand-500)" stop-opacity="0"/></linearGradient></defs>
        ${grid}
        <path d="${area}" fill="url(#ag)"/>
        <path d="${line}" fill="none" stroke="var(--brand-500)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        ${dots}
      </svg>`;
  }
  tabs.addEventListener('click', (e) => {
    const b = e.target.closest('.tab'); if (!b) return;
    tabs.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    b.classList.add('active'); currentSkill = b.dataset.s; drawChart(currentSkill);
  });
  drawChart('all');

  /* ---- Skill bars ---- */
  document.getElementById('skillBars').innerHTML = Object.keys(SKILLS).map(s => {
    const latest = Store.getLatest(s);
    const band = latest && typeof latest.band === 'number' ? latest.band : null;
    const pct = band ? (band / 9 * 100) : 0;
    return `<div class="skill-row"><span class="s-name" style="width:96px;">${SKILLS[s].split(' ')[1]}</span>
      <div class="bar"><i style="width:${pct}%"></i></div>
      <span class="s-val">${band ? band.toFixed(1) : '—'}</span></div>`;
  }).join('');

  /* ---- Goal ---- */
  const goalInput = document.getElementById('goalInput');
  goalInput.value = Store.getGoal();
  function goalMsg() {
    const g = parseFloat(goalInput.value), o = stats.overall;
    const m = document.getElementById('goalMsg');
    if (o >= g) { m.textContent = '🎉 Goal reached!'; m.style.color = 'var(--accent-600)'; }
    else { m.textContent = `${(g - o).toFixed(1)} band to go`; m.style.color = ''; }
  }
  goalInput.addEventListener('input', () => { Store.setGoal(parseFloat(goalInput.value) || 7); goalMsg(); });
  goalMsg();

  /* ---- History table ---- */
  const rows = history.slice().reverse().map(e => {
    const d = new Date(e.date);
    const when = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    const skill = SKILLS[e.skill] || e.skill;
    const result = typeof e.band === 'number'
      ? `<b class="text-grad">${e.band.toFixed(1)}</b>` + (e.correct != null ? ` <span class="muted small">(${e.correct}/${e.total})</span>` : '')
      : `<span class="muted small">${e.mode || 'practised'}</span>`;
    return `<tr style="border-bottom:1px solid var(--border);">
      <td style="padding:11px 8px;">${skill}</td>
      <td style="padding:11px 8px;">${result}</td>
      <td style="padding:11px 8px;text-align:right;" class="muted small">${when}</td></tr>`;
  }).join('');
  document.getElementById('histTable').innerHTML =
    `<thead><tr style="text-align:left;border-bottom:2px solid var(--border);">
      <th style="padding:8px;">Skill</th><th style="padding:8px;">Result</th><th style="padding:8px;text-align:right;">When</th></tr></thead><tbody>${rows}</tbody>`;

  document.getElementById('clearBtn').addEventListener('click', () => {
    if (confirm('Delete all saved progress and history on this device?')) { Store.clearAll(); location.reload(); }
  });
})();
