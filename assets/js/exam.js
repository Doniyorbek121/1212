/* Full Mock Exam — runs all four skills in sequence and computes an
   overall band. Reuses the Reading & Listening data libraries. */
(function () {
  'use strict';
  const RT = window.READING_TESTS || [], LT = window.LISTENING_TESTS || [];
  const body = document.getElementById('examBody');
  if (!body) return;

  const STEPS = ['Intro', 'Listening', 'Reading', 'Writing', 'Speaking', 'Results'];
  const state = { step: 0, testIdx: 0, bands: {} };
  const synth = window.speechSynthesis;

  /* ---- band curves ---- */
  const readBand = c => { for (const [m, b] of [[39,9],[37,8.5],[35,8],[33,7.5],[30,7],[27,6.5],[23,6],[19,5.5],[15,5],[13,4.5],[10,4]]) if (c >= m) return b; return 3.5; };
  const listenBand = c => { for (const [m, b] of [[39,9],[37,8.5],[35,8],[32,7.5],[30,7],[26,6.5],[23,6],[18,5.5],[16,5],[13,4.5],[10,4]]) if (c >= m) return b; return 3.5; };
  function roundOverall(avg) { const w = Math.floor(avg), f = avg - w; if (f < 0.25) return w; if (f < 0.75) return w + 0.5; return w + 1; }

  const OPTS = { tfng: ['TRUE', 'FALSE', 'NOT GIVEN'], yynn: ['YES', 'NO', 'NOT GIVEN'] };
  const norm = s => (s || '').trim().toLowerCase().replace(/[£.,!?;:]/g, '');

  function qHtml(g, q) {
    let c;
    if (g.type === 'tfng' || g.type === 'yynn') c = '<div class="opts">' + OPTS[g.type].map(o => `<label class="opt"><input type="radio" name="q${q.n}" value="${o}"> ${o}</label>`).join('') + '</div>';
    else if (g.type === 'mcq') c = '<div class="opts">' + q.options.map(o => `<label class="opt"><input type="radio" name="q${q.n}" value="${o.trim().charAt(0)}"> ${o}</label>`).join('') + '</div>';
    else if (g.type === 'match') c = `<select class="field" name="q${q.n}"><option value="">Choose…</option>` + g.options.map(o => `<option value="${o.trim().charAt(0)}">${o}</option>`).join('') + '</select>';
    else c = `<input class="gap-input" name="q${q.n}" autocomplete="off" placeholder="answer">`;
    return `<div class="q" data-answer="${q.a}"><div class="q-text"><span class="q-num">${q.n}</span>${q.text}</div>${c}</div>`;
  }
  function groupsHtml(groups) {
    return groups.map(g => `<div style="margin-bottom:8px;"><b>${g.instr.split('—')[0].split(' - ')[0].trim()}</b><p class="small muted">${g.instr.replace(/^[^—-]*[—-]/, '').trim()}</p>${g.qs.map(q => qHtml(g, q)).join('')}</div>`).join('');
  }
  function gradeRoot(root) {
    let correct = 0, total = 0;
    root.querySelectorAll('.q').forEach(q => {
      total++; const a = q.dataset.answer, r = q.querySelectorAll('input[type=radio]'), inp = q.querySelector('.gap-input'), sel = q.querySelector('select'); let ok = false;
      if (r.length) { const ch = [...r].find(x => x.checked); r.forEach(x => x.closest('.opt').classList.remove('correct', 'wrong')); if (ch && ch.value === a) { ch.closest('.opt').classList.add('correct'); ok = true; } else if (ch) ch.closest('.opt').classList.add('wrong'); [...r].find(x => x.value === a)?.closest('.opt').classList.add('correct'); }
      else if (inp) { inp.classList.remove('correct', 'wrong'); if (norm(inp.value) === norm(a)) { inp.classList.add('correct'); ok = true; } else { inp.classList.add('wrong'); inp.placeholder = 'Answer: ' + a; } }
      else if (sel) { if (sel.value === a) ok = true; }
      if (ok) correct++;
    });
    return { correct, total };
  }

  /* ---- stepper ---- */
  function paintSteps() {
    document.getElementById('stepDots').innerHTML = STEPS.map((s, i) => {
      const done = i < state.step, cur = i === state.step;
      const col = done ? 'var(--accent-500)' : cur ? 'var(--brand-500)' : 'var(--border)';
      const txt = done ? '#fff' : cur ? '#fff' : 'var(--text-mut)';
      return `<div style="flex:1;text-align:center;position:relative;">
        <div style="width:30px;height:30px;border-radius:50%;background:${col};color:${txt};display:inline-grid;place-items:center;font-weight:800;font-size:.85rem;">${done ? '✓' : i + 1}</div>
        <div class="small ${cur ? '' : 'muted'}" style="margin-top:4px;font-weight:${cur ? 700 : 500};">${s}</div></div>`;
    }).join('');
  }

  function go(step) { if (synth) synth.cancel(); state.step = step; paintSteps(); render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }

  /* ---- steps ---- */
  function render() {
    const S = STEPS[state.step];
    if (S === 'Intro') return renderIntro();
    if (S === 'Listening') return renderListening();
    if (S === 'Reading') return renderReading();
    if (S === 'Writing') return renderWriting();
    if (S === 'Speaking') return renderSpeaking();
    if (S === 'Results') return renderResults();
  }

  function renderIntro() {
    const n = Math.max(RT.length, LT.length);
    body.innerHTML = `<div class="panel panel-pad">
      <h2>Before you begin</h2>
      <p>This is a full mock exam. You'll complete four sections in order. Listening and Reading are marked automatically; for Writing and Speaking you'll self-assess against the band descriptors (or use AI feedback). Set aside about 2–3 hours for the full experience.</p>
      <ul class="check-list">
        <li>Section 1 — Listening (40 questions, audio)</li>
        <li>Section 2 — Reading (40 questions, 3 passages)</li>
        <li>Section 3 — Writing (Task 2 essay)</li>
        <li>Section 4 — Speaking (cue card)</li>
      </ul>
      <div class="calc-field mt-3" style="max-width:260px;"><label>Choose a test set</label>
        <select class="field" id="examSet">${Array.from({ length: n }, (_, i) => `<option value="${i}">Test ${i + 1}</option>`).join('')}</select></div>
      <button class="btn btn-primary btn-lg mt-3" id="startExam">Start the exam →</button>
    </div>`;
    document.getElementById('startExam').addEventListener('click', () => { state.testIdx = +document.getElementById('examSet').value; go(1); });
  }

  function audioBlockHtml(sec, i) {
    return `<div class="panel panel-pad" style="margin-bottom:14px;">
      <div class="flex between items-center wrap gap"><div><b>🔊 ${sec.title}</b><p class="small muted mb-0">${sec.blurb || ''}</p></div>
        <div class="flex gap-sm items-center"><button class="btn btn-primary play" data-i="${i}">▶ Play</button><button class="btn btn-ghost stopA">■ Stop</button><span class="muted small status">Ready</span></div></div>
      <details class="mt-2"><summary class="small muted" style="cursor:pointer;">Transcript</summary><p class="small mt-2" style="line-height:1.7;">${sec.script}</p></details></div>`;
  }

  function renderListening() {
    const test = (LT[state.testIdx] || LT[0]).sections;
    body.innerHTML = `<div class="panel panel-pad" style="margin-bottom:16px;"><h2 class="mb-0">🎧 Listening</h2><p class="small muted mb-0">Play each recording, answer all 40 questions, then submit.</p></div>
      <div id="lWrap">${test.map((sec, i) => audioBlockHtml(sec, i) + `<div class="panel panel-pad" style="margin-bottom:16px;">${groupsHtml(sec.groups)}</div>`).join('')}</div>
      <button class="btn btn-primary btn-lg" id="lSubmit">Submit Listening →</button>`;
    wireAudio(test);
    document.getElementById('lSubmit').addEventListener('click', () => {
      const { correct } = gradeRoot(document.getElementById('lWrap'));
      state.bands.listening = listenBand(correct);
      state._lc = correct;
      go(2);
    });
  }

  function renderReading() {
    const test = (RT[state.testIdx] || RT[0]).passages;
    body.innerHTML = `<div class="panel panel-pad" style="margin-bottom:16px;"><h2 class="mb-0">📖 Reading</h2><p class="small muted mb-0">Read the three passages and answer all 40 questions.</p></div>
      <div id="rWrap">${test.map(p => `<div class="panel panel-pad" style="margin-bottom:16px;"><span class="tag">${p.title}</span>${p.paras.map(([t, x]) => `<p><b>${t}.</b> ${x}</p>`).join('')}<hr style="border:none;border-top:1px solid var(--border);margin:14px 0;">${groupsHtml(p.groups)}</div>`).join('')}</div>
      <button class="btn btn-primary btn-lg" id="rSubmit">Submit Reading →</button>`;
    document.getElementById('rSubmit').addEventListener('click', () => {
      const { correct } = gradeRoot(document.getElementById('rWrap'));
      state.bands.reading = readBand(correct);
      state._rc = correct;
      go(3);
    });
  }

  function selfRate(id, label) {
    return `<div class="calc-field mt-3"><label>${label}: <b id="${id}Val">6.5</b></label>
      <input type="range" id="${id}" min="4" max="9" step="0.5" value="6.5" style="width:100%;max-width:360px;"></div>`;
  }

  function renderWriting() {
    const prompt = 'Some people believe that international tourism does more harm than good to the countries visited. To what extent do you agree or disagree? Give reasons and examples.';
    body.innerHTML = `<div class="panel panel-pad">
      <h2>✍️ Writing — Task 2</h2>
      <p style="font-weight:600;color:var(--text);">${prompt}</p>
      <p class="small muted">Write at least 250 words in about 40 minutes.</p>
      <textarea class="field writing-area" id="wEditor" placeholder="Write your essay here…"></textarea>
      <div class="wc-bar"><span>Words: <b id="wc">0</b></span><span>Minimum: <b>250</b></span></div>
      <div id="wKey" class="mt-3"></div>
      <div class="flex gap-sm wrap mt-2"><button class="btn btn-accent" id="wAi">🤖 Get AI band</button><span class="muted small" id="wAiMsg"></span></div>
      ${selfRate('wBand', 'Your Writing band (self-assess or use AI)')}
      <p class="small muted">Not sure? Band 6 = clear but with errors; Band 7 = well-organised, good range; Band 8 = fluent and accurate.</p>
      <button class="btn btn-primary btn-lg mt-2" id="wSubmit">Submit Writing →</button>
    </div>`;
    const ed = document.getElementById('wEditor');
    const wc = document.getElementById('wc');
    ed.addEventListener('input', () => { const t = ed.value.trim(); const n = t ? t.split(/\s+/).length : 0; wc.textContent = n; wc.className = n >= 250 ? 'wc-ok' : (n ? 'wc-warn' : ''); });
    bindRate('wBand');
    if (window.AI) {
      AI.mountKeyPanel(document.getElementById('wKey'));
      document.getElementById('wAi').addEventListener('click', async () => {
        const essay = ed.value.trim(); const msg = document.getElementById('wAiMsg');
        if (essay.split(/\s+/).filter(Boolean).length < 40) { msg.textContent = 'Write more first.'; return; }
        if (!AI.hasKey()) { msg.textContent = 'Add your Gemini key above.'; return; }
        msg.textContent = '🤖 Assessing…';
        try {
          const r = await AI.generate('QUESTION: ' + prompt + '\n\nESSAY:\n' + essay, { system: 'You are an IELTS examiner. Reply with ONLY the estimated overall band as a number from 4 to 9 in 0.5 steps (e.g. "6.5"), nothing else.', temperature: 0 });
          const m = r.match(/[4-9](\.5)?/); if (m) { document.getElementById('wBand').value = m[0]; document.getElementById('wBandVal').textContent = (+m[0]).toFixed(1); msg.textContent = '✓ AI band applied: ' + m[0]; }
          else msg.textContent = 'Could not read band — rate yourself.';
        } catch (e) { msg.textContent = AI.friendlyError(e); }
      });
    }
    document.getElementById('wSubmit').addEventListener('click', () => { state.bands.writing = +document.getElementById('wBand').value; go(4); });
  }

  function renderSpeaking() {
    body.innerHTML = `<div class="panel panel-pad">
      <h2>🗣️ Speaking — Part 2</h2>
      <div class="cue-card"><div class="tag">Long turn</div><h3 style="margin:10px 0 6px;">Describe a place you enjoy visiting.</h3>
        <p class="small muted mb-0">You should say:</p><ul><li>where it is</li><li>how often you go there</li><li>what you do there</li><li>and explain why you enjoy it</li></ul></div>
      <div class="flex gap-sm wrap mt-3 items-center"><button class="btn btn-primary" id="prep">Start 1-min prep</button><button class="btn btn-accent" id="talk">Start 2-min talk</button><span class="timer" id="spkTimer" style="font-size:1.6rem;">1:00</span></div>
      ${selfRate('sBand', 'Your Speaking band (self-assess)')}
      <p class="small muted">Band 6 = keeps going with some hesitation; Band 7 = fluent with good vocabulary; Band 8 = natural, precise, effortless.</p>
      <button class="btn btn-primary btn-lg mt-2" id="sSubmit">Finish & see results →</button>
    </div>`;
    bindRate('sBand');
    let iv = null; const tEl = document.getElementById('spkTimer');
    function run(sec, onEnd) { clearInterval(iv); let s = sec; tEl.textContent = Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); iv = setInterval(() => { s--; tEl.textContent = Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); tEl.classList.toggle('low', s <= 10); if (s <= 0) { clearInterval(iv); onEnd && onEnd(); } }, 1000); }
    function say(t) { if (synth) { synth.cancel(); synth.speak(new SpeechSynthesisUtterance(t)); } }
    document.getElementById('prep').addEventListener('click', () => { say('You have one minute to prepare.'); run(60, () => say('Please begin speaking now.')); });
    document.getElementById('talk').addEventListener('click', () => run(120, () => say('Thank you, that is the end of the long turn.')));
    document.getElementById('sSubmit').addEventListener('click', () => { clearInterval(iv); if (synth) synth.cancel(); state.bands.speaking = +document.getElementById('sBand').value; go(5); });
  }

  function renderResults() {
    const b = state.bands;
    const overall = roundOverall((b.listening + b.reading + b.writing + b.speaking) / 4);
    body.innerHTML = `<div class="panel panel-pad center">
      <span class="eyebrow">Exam complete 🎉</span>
      <div class="overall-band mt-2" style="max-width:280px;margin:0 auto;"><div class="small" style="opacity:.85;">Overall band</div><div class="big">${overall.toFixed(1)}</div></div>
      <div class="grid grid-4 mt-3">
        ${[['Listening', b.listening, state._lc], ['Reading', b.reading, state._rc], ['Writing', b.writing], ['Speaking', b.speaking]].map(([n, v, c]) =>
          `<div class="card" style="padding:16px;"><b>${n}</b><div class="big text-grad" style="font-size:1.7rem;">${v.toFixed(1)}</div>${c != null ? `<div class="small muted">${c}/40</div>` : '<div class="small muted">self-rated</div>'}</div>`).join('')}
      </div>
      <p class="mt-3">${overall >= 7 ? 'Outstanding — a band-7+ overall! 🎓' : overall >= 6 ? 'Solid work. Target your lowest skill to push higher.' : 'Good effort — keep practising each skill and retake the exam.'}</p>
      <div class="flex gap-sm center mt-2" style="justify-content:center;flex-wrap:wrap;">
        <a href="dashboard.html" class="btn btn-primary">View dashboard →</a>
        <button class="btn btn-ghost" id="againBtn">Take another exam</button>
      </div></div>`;
    document.getElementById('againBtn').addEventListener('click', () => { state.bands = {}; go(0); });
    if (window.Store) {
      Store.record('listening', { band: b.listening, correct: state._lc, total: 40, mode: 'exam' });
      Store.record('reading', { band: b.reading, correct: state._rc, total: 40, mode: 'exam' });
      Store.record('writing', { band: b.writing, mode: 'exam' });
      Store.record('speaking', { band: b.speaking, mode: 'exam' });
      Store.record('exam', { band: overall, mode: 'overall' });
    }
  }

  /* ---- helpers ---- */
  function bindRate(id) { const el = document.getElementById(id), out = document.getElementById(id + 'Val'); el.addEventListener('input', () => out.textContent = (+el.value).toFixed(1)); out.textContent = (+el.value).toFixed(1); }

  let progT = null, voice = null;
  function pickVoice() { if (synth) { const v = synth.getVoices(); voice = v.find(x => /en-GB/i.test(x.lang)) || v.find(x => /en/i.test(x.lang)); } }
  if (synth) { pickVoice(); synth.onvoiceschanged = pickVoice; }
  function wireAudio(test) {
    body.querySelectorAll('.play').forEach(btn => btn.addEventListener('click', () => {
      const block = btn.closest('.panel'); const status = block.querySelector('.status'); const script = test[+btn.dataset.i].script;
      if (!synth) { status.textContent = 'Read the transcript.'; return; }
      synth.cancel(); const u = new SpeechSynthesisUtterance(script); u.rate = 0.98; if (voice) u.voice = voice;
      status.textContent = 'Playing…'; u.onend = () => status.textContent = 'Finished'; synth.speak(u);
    }));
    body.querySelectorAll('.stopA').forEach(btn => btn.addEventListener('click', () => { if (synth) synth.cancel(); }));
  }

  window.addEventListener('beforeunload', () => { if (synth) synth.cancel(); });
  paintSteps();
  render();
})();
