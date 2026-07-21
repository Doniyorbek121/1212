/* Full Listening test engine — 4 sections, audio via speech synthesis, grading */
(function () {
  'use strict';
  const TEST = window.LISTENING_TEST;
  const wrap = document.getElementById('sections');
  if (!TEST || !wrap) return;

  const synth = window.speechSynthesis;
  let voice = null;
  function pickVoice() {
    if (!synth) return;
    const vs = synth.getVoices();
    voice = vs.find(v => /en-GB/i.test(v.lang)) || vs.find(v => /en/i.test(v.lang)) || null;
  }
  if (synth) { pickVoice(); synth.onvoiceschanged = pickVoice; }

  function qHtml(g, q) {
    let control;
    if (g.type === 'mcq') {
      control = '<div class="opts">' + q.options.map(o =>
        `<label class="opt"><input type="radio" name="q${q.n}" value="${o.trim().charAt(0)}"> ${o}</label>`).join('') + '</div>';
    } else if (g.type === 'match') {
      control = `<select class="field" name="q${q.n}"><option value="">Choose…</option>` +
        g.options.map(o => `<option value="${o.trim().charAt(0)}">${o}</option>`).join('') + '</select>';
    } else {
      control = `<input class="gap-input" name="q${q.n}" autocomplete="off" placeholder="type answer">`;
    }
    return `<div class="q" data-answer="${q.a}"><div class="q-text"><span class="q-num">${q.n}</span>${q.text}</div>${control}</div>`;
  }

  function sectionHtml(s, i) {
    const groups = s.groups.map(g =>
      `<div style="margin-bottom:10px;"><b>${g.instr.split('—')[0].trim()}</b>
        <p class="small muted">${g.instr.split('—').slice(1).join('—').trim()}</p>
        <div class="panel" style="background:var(--surface-2);padding:18px;border-radius:12px;">${g.qs.map(q => qHtml(g, q)).join('')}</div></div>`).join('');
    return `<div class="section-block" data-s="${i}" style="${i ? 'display:none;' : ''}">
      <div class="panel panel-pad" style="margin-bottom:16px;">
        <div class="flex between items-center wrap gap">
          <div><b>🔊 ${s.title}</b><p class="small muted mb-0">${s.blurb}</p></div>
          <div class="flex gap-sm items-center">
            <button class="btn btn-primary play" data-s="${i}">▶ Play</button>
            <button class="btn btn-ghost stop">■ Stop</button>
            <span class="muted small status">Ready</span>
          </div>
        </div>
        <div class="bar mt-2" style="height:6px;"><i class="abar" style="width:0%"></i></div>
        <details class="mt-2"><summary class="small muted" style="cursor:pointer;">Show transcript (after trying)</summary>
          <p class="small mt-2" style="line-height:1.7;">${s.script}</p></details>
      </div>
      <div class="panel panel-pad">${groups}</div></div>`;
  }

  wrap.innerHTML = TEST.map(sectionHtml).join('');

  // tabs
  const tabs = document.getElementById('sectionTabs');
  tabs.innerHTML = TEST.map((s, i) => `<button class="tab ${i === 0 ? 'active' : ''}" data-s="${i}">Section ${i + 1}</button>`).join('');
  tabs.addEventListener('click', (e) => {
    const b = e.target.closest('.tab'); if (!b) return;
    if (synth) synth.cancel();
    tabs.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    b.classList.add('active');
    document.querySelectorAll('.section-block').forEach(bl => bl.style.display = bl.dataset.s === b.dataset.s ? 'block' : 'none');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // audio play/stop (delegated)
  let progTimer = null;
  wrap.addEventListener('click', (e) => {
    const play = e.target.closest('.play');
    const stop = e.target.closest('.stop');
    if (play) {
      const block = play.closest('.section-block');
      const status = block.querySelector('.status');
      const abar = block.querySelector('.abar');
      const script = TEST[+play.dataset.s].script;
      if (!synth) { status.textContent = 'Speech not supported — read the transcript.'; return; }
      synth.cancel(); clearInterval(progTimer);
      const u = new SpeechSynthesisUtterance(script);
      u.rate = 0.98; if (voice) u.voice = voice;
      status.textContent = 'Playing…';
      const words = script.split(' ').length, est = (words / 2.4) * 1000, start = Date.now();
      progTimer = setInterval(() => { abar.style.width = Math.min(100, (Date.now() - start) / est * 100) + '%'; }, 120);
      u.onend = () => { clearInterval(progTimer); abar.style.width = '100%'; status.textContent = 'Finished'; };
      synth.speak(u);
    }
    if (stop) {
      if (synth) synth.cancel(); clearInterval(progTimer);
      stop.closest('.section-block').querySelector('.status').textContent = 'Stopped';
    }
  });

  // answered count
  const answeredEl = document.getElementById('answeredCount');
  function updateCount() {
    let n = 0;
    document.querySelectorAll('.q').forEach(q => {
      const r = q.querySelector('input[type=radio]:checked');
      const i = q.querySelector('.gap-input');
      const s = q.querySelector('select');
      if (r || (i && i.value.trim()) || (s && s.value)) n++;
    });
    answeredEl.textContent = n;
  }
  wrap.addEventListener('input', updateCount);
  wrap.addEventListener('change', updateCount);

  const norm = s => (s || '').trim().toLowerCase().replace(/[£.,!?;:]/g, '');
  function toBand(c) {
    const t = [[39,9],[37,8.5],[35,8],[32,7.5],[30,7],[26,6.5],[23,6],[18,5.5],[16,5],[13,4.5],[10,4],[8,3.5]];
    for (const [m, b] of t) if (c >= m) return b;
    return 3.0;
  }

  function grade() {
    let correct = 0;
    const per = TEST.map(() => ({ c: 0, t: 0 }));
    document.querySelectorAll('.section-block').forEach((block, si) => {
      block.querySelectorAll('.q').forEach(q => {
        per[si].t++;
        const ans = q.dataset.answer;
        const radios = q.querySelectorAll('input[type=radio]');
        const input = q.querySelector('.gap-input');
        const select = q.querySelector('select');
        let ok = false;
        if (radios.length) {
          const chosen = [...radios].find(r => r.checked);
          radios.forEach(r => r.closest('.opt').classList.remove('correct', 'wrong'));
          if (chosen && chosen.value === ans) { chosen.closest('.opt').classList.add('correct'); ok = true; }
          else if (chosen) chosen.closest('.opt').classList.add('wrong');
          [...radios].find(r => r.value === ans)?.closest('.opt').classList.add('correct');
        } else if (input) {
          input.classList.remove('correct', 'wrong');
          if (norm(input.value) === norm(ans)) { input.classList.add('correct'); ok = true; }
          else { input.classList.add('wrong'); input.placeholder = 'Answer: ' + ans; }
        } else if (select) {
          select.classList.remove('correct', 'wrong');
          if (select.value === ans) { select.classList.add('correct'); ok = true; }
          else select.classList.add('wrong');
        }
        if (ok) { correct++; per[si].c++; }
      });
    });
    const band = toBand(correct);
    document.getElementById('scoreText').textContent = correct + ' / 40';
    document.getElementById('bandPill').textContent = 'Band ' + band.toFixed(1);
    document.getElementById('resultMsg').textContent =
      band >= 7 ? 'Sharp listening — band 7+! 🎧' : band >= 6 ? 'Good work. Replay the sections you missed.' : 'Use the transcripts to train the details, then retry.';
    document.getElementById('perSection').innerHTML = per.map((p, i) =>
      `<div class="card" style="padding:14px;"><b>Sec ${i + 1}</b><div class="big text-grad" style="font-size:1.5rem;">${p.c}/${p.t}</div></div>`).join('');
    const box = document.getElementById('result');
    box.classList.add('show');
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (window.Store) Store.record('listening', { band, correct, total: 40, mode: 'full' });
    if (synth) synth.cancel();
  }

  document.getElementById('submitBtn').addEventListener('click', () => {
    const a = parseInt(answeredEl.textContent, 10);
    if (a < 40 && !confirm(`You've answered ${a}/40. Submit anyway?`)) return;
    grade();
  });
  document.getElementById('retryBtn').addEventListener('click', () => location.reload());
  window.addEventListener('beforeunload', () => { if (synth) synth.cancel(); });
})();
