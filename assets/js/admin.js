/* Admin panel — client-side content manager & data tools.
   Default password on first run: admin123 (change it in Settings). */
(function () {
  'use strict';
  if (!window.Store) return;

  const SESSION = 'ielts-admin-session';

  // seed a default password on first ever visit
  if (!Store.hasAdminPass()) Store.setAdminPass('admin123');

  const gate = document.getElementById('loginGate');
  const app = document.getElementById('adminApp');
  const passInput = document.getElementById('passInput');
  const loginMsg = document.getElementById('loginMsg');

  function showApp() {
    gate.style.display = 'none';
    app.style.display = 'block';
    renderAll();
  }
  function unlock() {
    const v = passInput.value;
    if (Store.checkAdminPass(v)) {
      sessionStorage.setItem(SESSION, '1');
      showApp();
    } else {
      loginMsg.textContent = '❌ Incorrect password.';
      loginMsg.style.color = 'var(--danger-500)';
    }
  }

  if (sessionStorage.getItem(SESSION) === '1') showApp();

  document.getElementById('loginBtn').addEventListener('click', unlock);
  passInput.addEventListener('keydown', e => { if (e.key === 'Enter') unlock(); });
  document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem(SESSION); location.reload();
  });

  // hint about default password on first run
  (function firstRunHint() {
    // if password is still the default hash, show a gentle hint
    if (Store.checkAdminPass('admin123')) {
      document.getElementById('loginHint').innerHTML = 'First time? Default password is <b>admin123</b> — change it in Settings after logging in.';
    }
  })();

  /* ---- tab switching ---- */
  document.getElementById('adminTabs').addEventListener('click', (e) => {
    const b = e.target.closest('.tab'); if (!b) return;
    document.querySelectorAll('#adminTabs .tab').forEach(t => t.classList.remove('active'));
    b.classList.add('active');
    document.querySelectorAll('.admin-sec').forEach(s => s.style.display = s.dataset.sec === b.dataset.t ? 'block' : 'none');
  });

  const SKILLS = { reading: '📖 Reading', listening: '🎧 Listening', writing: '✍️ Writing', speaking: '🗣️ Speaking' };
  const esc = s => (s || '').replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));

  function renderAll() { renderOverview(); renderVocab(); renderPrompts(); renderSettings(); }

  /* ---- overview ---- */
  function renderOverview() {
    const s = Store.getStats();
    document.getElementById('adminKpis').innerHTML = [
      ['Tests taken', s.totalTests, '📝'],
      ['Est. overall', s.overall ? s.overall.toFixed(1) : '—', '🎯'],
      ['Best band', s.bestBand ? s.bestBand.toFixed(1) : '—', '🏆'],
      ['Day streak', s.streak + '🔥', '📅'],
    ].map(([l, v, i]) => `<div class="card" style="padding:18px;"><div style="font-size:1.4rem;">${i}</div>
      <div class="big text-grad" style="font-size:1.9rem;">${v}</div><div class="small muted">${l}</div></div>`).join('');

    const hist = Store.getHistory().slice().reverse().slice(0, 25);
    const rows = hist.length ? hist.map(e => {
      const d = new Date(e.date).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      const res = typeof e.band === 'number' ? '<b class="text-grad">' + e.band.toFixed(1) + '</b>' + (e.correct != null ? ` (${e.correct}/${e.total})` : '') : (e.mode || 'practised');
      return `<tr style="border-bottom:1px solid var(--border);"><td style="padding:9px 6px;">${SKILLS[e.skill] || e.skill}</td><td style="padding:9px 6px;">${res}</td><td style="padding:9px 6px;text-align:right;" class="muted small">${d}</td></tr>`;
    }).join('') : '<tr><td class="muted" style="padding:14px;">No activity recorded yet.</td></tr>';
    document.getElementById('adminHist').innerHTML =
      '<thead><tr style="text-align:left;border-bottom:2px solid var(--border);"><th style="padding:6px;">Skill</th><th style="padding:6px;">Result</th><th style="padding:6px;text-align:right;">When</th></tr></thead><tbody>' + rows + '</tbody>';
  }

  /* ---- vocabulary manager ---- */
  function renderVocab() {
    const data = Store.getCustomVocab();
    const list = document.getElementById('vList');
    const topics = Object.keys(data);
    if (!topics.length) { list.innerHTML = '<p class="muted small">No custom cards yet.</p>'; return; }
    list.innerHTML = topics.map(t =>
      `<div style="margin-bottom:14px;"><b>${esc(t)}</b>
        ${data[t].map((c, i) => `<div class="flex between items-center" style="padding:8px 0;border-bottom:1px solid var(--border);">
          <span><b>${esc(c.w)}</b> <span class="muted small">(${esc(c.p)})</span> — ${esc(c.d)}</span>
          <button class="btn btn-ghost small vdel" data-t="${esc(t)}" data-i="${i}" style="padding:5px 10px;">✕</button></div>`).join('')}
      </div>`).join('');
  }
  document.getElementById('vAdd').addEventListener('click', () => {
    const topic = document.getElementById('vTopic').value.trim() || 'My set';
    const w = document.getElementById('vWord').value.trim();
    const p = document.getElementById('vPos').value.trim() || 'word';
    const d = document.getElementById('vDef').value.trim();
    const e = document.getElementById('vEx').value.trim();
    if (!w || !d) { alert('Please enter at least a word and a definition.'); return; }
    const data = Store.getCustomVocab();
    (data[topic] = data[topic] || []).push({ w, p, d, e: e || (w + ' is a useful word.') });
    Store.setCustomVocab(data);
    document.getElementById('vWord').value = ''; document.getElementById('vDef').value = '';
    document.getElementById('vPos').value = ''; document.getElementById('vEx').value = '';
    renderVocab();
  });
  document.getElementById('vList').addEventListener('click', (e) => {
    const b = e.target.closest('.vdel'); if (!b) return;
    const data = Store.getCustomVocab();
    data[b.dataset.t].splice(+b.dataset.i, 1);
    if (!data[b.dataset.t].length) delete data[b.dataset.t];
    Store.setCustomVocab(data); renderVocab();
  });

  /* ---- writing prompts manager ---- */
  function renderPrompts() {
    const arr = Store.getCustomPrompts();
    const list = document.getElementById('pList');
    list.innerHTML = arr.length ? arr.map((p, i) =>
      `<div class="flex between items-center gap" style="padding:9px 0;border-bottom:1px solid var(--border);">
        <span class="small">${esc(p)}</span>
        <button class="btn btn-ghost small pdel" data-i="${i}" style="padding:5px 10px;flex:none;">✕</button></div>`).join('')
      : '<p class="muted small">No custom prompts yet.</p>';
  }
  document.getElementById('pAdd').addEventListener('click', () => {
    const t = document.getElementById('pText').value.trim();
    if (t.length < 15) { alert('Please enter a full essay question.'); return; }
    const arr = Store.getCustomPrompts(); arr.push(t); Store.setCustomPrompts(arr);
    document.getElementById('pText').value = ''; renderPrompts();
  });
  document.getElementById('pList').addEventListener('click', (e) => {
    const b = e.target.closest('.pdel'); if (!b) return;
    const arr = Store.getCustomPrompts(); arr.splice(+b.dataset.i, 1); Store.setCustomPrompts(arr); renderPrompts();
  });

  /* ---- data tools ---- */
  document.getElementById('exportBtn').addEventListener('click', () => {
    const json = Store.exportAll();
    document.getElementById('dataView').value = json;
    const blob = new Blob([json], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ielts-master-backup-' + new Date().toISOString().slice(0, 10) + '.json';
    a.click();
    document.getElementById('dataMsg').textContent = '✅ Exported.';
  });
  document.getElementById('importFile').addEventListener('change', (e) => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try { Store.importAll(r.result); document.getElementById('dataMsg').textContent = '✅ Imported. Reloading…'; setTimeout(() => location.reload(), 900); }
      catch (err) { document.getElementById('dataMsg').textContent = '❌ Invalid file.'; }
    };
    r.readAsText(f);
  });
  document.getElementById('wipeBtn').addEventListener('click', () => {
    if (confirm('Delete ALL stored data (progress, custom content, settings)? This cannot be undone.')) {
      ['ielts-history','ielts-progress','ielts-streak','ielts-goal','ielts-custom-vocab','ielts-custom-prompts','ielts-brand'].forEach(k => localStorage.removeItem(k));
      document.getElementById('dataMsg').textContent = '🗑 Wiped. Reloading…';
      setTimeout(() => location.reload(), 900);
    }
  });

  /* ---- settings ---- */
  function renderSettings() {
    document.getElementById('brandInput').value = Store.getBrand();
  }
  document.getElementById('brandSave').addEventListener('click', () => {
    Store.setBrand(document.getElementById('brandInput').value.trim());
    alert('Branding saved. Reload to see it in the header.');
  });
  document.getElementById('passSave').addEventListener('click', () => {
    const p = document.getElementById('newPass').value;
    if (p.length < 4) { document.getElementById('passMsg').textContent = 'Password must be at least 4 characters.'; return; }
    Store.setAdminPass(p);
    document.getElementById('newPass').value = '';
    document.getElementById('passMsg').textContent = '✅ Password updated.';
    document.getElementById('passMsg').style.color = 'var(--accent-600)';
  });
})();
