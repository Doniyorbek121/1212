/* Speaking practice — question banks, cue cards, prep/talk timer, TTS */
(function () {
  'use strict';
  const partTabs = document.getElementById('partTabs');
  if (!partTabs) return;

  const P1 = [
    { q: "Let's talk about your hometown. Where is it, and what is it like?", tip: "Give 2–3 sentences — don't answer in one word." },
    { q: 'Do you work or are you a student? What do you enjoy about it?', tip: 'Add a reason and an example.' },
    { q: 'What do you usually do in your free time?', tip: 'Mention frequency: usually, from time to time, whenever I can.' },
    { q: 'Do you prefer mornings or evenings? Why?', tip: 'Justify your preference clearly.' },
    { q: 'How often do you use public transport?', tip: 'Use frequency phrases and give a small example.' },
    { q: 'What kind of music do you like listening to?', tip: 'Name a genre and say when you listen to it.' },
    { q: 'Do you enjoy cooking? Why or why not?', tip: 'Give an honest opinion with a reason.' },
  ];
  const P3 = [
    { q: 'Do you think people today have enough free time compared with the past? Why?', tip: 'Compare past and present; give balanced reasons.' },
    { q: 'How has technology changed the way people spend their leisure time?', tip: 'Discuss both positive and negative effects.' },
    { q: 'Should governments invest more in public parks and sports facilities?', tip: 'State a position and support it with examples.' },
    { q: 'Why do some people find it hard to balance work and personal life?', tip: 'Explore causes and possible solutions.' },
    { q: 'Do you think hobbies should be useful, or is enjoyment enough?', tip: 'Weigh both sides before concluding.' },
  ];
  const CUES = [
    { t: 'Describe a skill you would like to learn.', pts: ['what the skill is', 'how you would learn it', 'why you want to learn it', 'and explain how it would change your life'] },
    { t: 'Describe a memorable journey you have taken.', pts: ['where you went', 'who you went with', 'what you did there', 'and explain why it was memorable'] },
    { t: 'Describe a person who has influenced you.', pts: ['who the person is', 'how you know them', 'what they are like', 'and explain how they influenced you'] },
    { t: 'Describe a book or film that made an impression on you.', pts: ['what it was about', 'when you read or watched it', 'why you chose it', 'and explain how it made you feel'] },
    { t: 'Describe a place you would like to visit in the future.', pts: ['where it is', 'how you found out about it', 'what you would do there', 'and explain why you want to go'] },
  ];

  let part = 'p1', qIndex = 0, cueIndex = 0;
  const synth = window.speechSynthesis;

  function speak(text) {
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    const v = synth.getVoices().find(x => /en-GB/i.test(x.lang)) || synth.getVoices().find(x => /en/i.test(x.lang));
    if (v) u.voice = v;
    synth.speak(u);
  }

  function renderQ() {
    const bank = part === 'p1' ? P1 : P3;
    const item = bank[qIndex % bank.length];
    document.getElementById('partTitle').textContent = part === 'p1' ? 'Part 1 — Everyday questions' : 'Part 3 — Discussion';
    document.getElementById('qText').textContent = item.q;
    document.getElementById('qTip').textContent = '💡 ' + item.tip;
  }
  function renderCue() {
    const c = CUES[cueIndex % CUES.length];
    document.getElementById('cueTitle').textContent = c.t;
    document.getElementById('cuePoints').innerHTML = c.pts.map(p => '<li>' + p + '</li>').join('');
    resetTimer();
  }

  partTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab'); if (!btn) return;
    partTabs.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    part = btn.dataset.part;
    const showCue = part === 'p2';
    document.getElementById('qPanel').style.display = showCue ? 'none' : 'block';
    document.getElementById('cuePanel').style.display = showCue ? 'block' : 'none';
    if (showCue) renderCue(); else renderQ();
    if (synth) synth.cancel();
  });

  document.getElementById('newQ').addEventListener('click', () => { qIndex++; renderQ(); });
  document.getElementById('speakQ').addEventListener('click', () => {
    const bank = part === 'p1' ? P1 : P3;
    speak(bank[qIndex % bank.length].q);
  });
  document.getElementById('newCue').addEventListener('click', () => { cueIndex++; renderCue(); });

  /* Timer for cue card */
  let iv = null, secs = 60, mode = 'idle';
  const tEl = document.getElementById('cueTimer');
  const bar = document.getElementById('cueBar');
  const phase = document.getElementById('phaseTag');

  function fmt() {
    tEl.textContent = Math.floor(secs / 60) + ':' + String(secs % 60).padStart(2, '0');
    tEl.classList.toggle('low', secs <= 10);
  }
  function resetTimer() {
    clearInterval(iv); iv = null; mode = 'idle'; secs = 60;
    phase.textContent = 'Ready'; bar.style.width = '0%'; fmt();
  }
  function run(total, label, onEnd) {
    clearInterval(iv);
    secs = total; mode = label; phase.textContent = label; fmt();
    const start = total;
    iv = setInterval(() => {
      secs--; fmt();
      bar.style.width = ((start - secs) / start * 100) + '%';
      if (secs <= 0) { clearInterval(iv); iv = null; phase.textContent = 'Done'; if (onEnd) onEnd(); }
    }, 1000);
  }
  document.getElementById('prepBtn').addEventListener('click', () => {
    speak('You have one minute to prepare. You can make notes if you wish.');
    run(60, 'Preparing…', () => speak('Please begin speaking now.'));
  });
  document.getElementById('talkBtn').addEventListener('click', () => run(120, 'Speaking…', () => speak('Thank you. That is the end of part two.')));
  document.getElementById('cueReset').addEventListener('click', resetTimer);

  renderQ();

  /* ---- Audio recorder ---- */
  const recBtn = document.getElementById('recBtn');
  if (recBtn && navigator.mediaDevices && window.MediaRecorder) {
    const stopBtn = document.getElementById('recStop');
    const status = document.getElementById('recStatus');
    const player = document.getElementById('player');
    let rec = null, chunks = [], stream = null, tick = null, t0 = 0;

    recBtn.addEventListener('click', async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (e) { status.textContent = '⚠️ Microphone access denied.'; return; }
      chunks = [];
      rec = new MediaRecorder(stream);
      rec.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
      rec.onstop = () => {
        const blob = new Blob(chunks, { type: chunks[0]?.type || 'audio/webm' });
        player.src = URL.createObjectURL(blob);
        player.style.display = 'block';
        stream.getTracks().forEach(t => t.stop());
        if (window.Store) Store.record('speaking', { practised: true, mode: 'recording' });
      };
      rec.start();
      recBtn.disabled = true; stopBtn.disabled = false;
      t0 = Date.now();
      tick = setInterval(() => {
        const s = Math.floor((Date.now() - t0) / 1000);
        status.textContent = '● Recording ' + Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
      }, 500);
    });
    stopBtn.addEventListener('click', () => {
      if (rec && rec.state !== 'inactive') rec.stop();
      clearInterval(tick);
      recBtn.disabled = false; stopBtn.disabled = true;
      status.textContent = 'Recorded ✓ — listen back below';
    });
  } else if (recBtn) {
    recBtn.disabled = true;
    document.getElementById('recStatus').textContent = 'Recording not supported in this browser.';
  }

  /* ---- AI feedback ---- */
  const aiBtn = document.getElementById('speakAiBtn');
  if (aiBtn && window.AI) {
    AI.mountKeyPanel(document.getElementById('aiKeyPanel'));
    aiBtn.addEventListener('click', async () => {
      const out = document.getElementById('speakFeedback');
      const text = document.getElementById('speakText').value.trim();
      if (text.split(/\s+/).filter(Boolean).length < 15) { out.textContent = 'Please type at least a couple of sentences of your answer first.'; return; }
      if (!AI.hasKey()) { out.textContent = 'Connect your Gemini API key above to get AI feedback.'; return; }
      let question = '';
      if (part === 'p2') question = document.getElementById('cueTitle').textContent;
      else question = document.getElementById('qText').textContent;
      out.textContent = '🤖 Assessing your answer against the speaking band descriptors…';
      aiBtn.disabled = true;
      const system = 'You are a certified IELTS Speaking examiner. Assess the candidate answer using the four criteria: ' +
        'Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, and Pronunciation (judge from word choice/structure). ' +
        'Give an estimated band, one strength and two specific improvements, plus a short model upgrade of one sentence. Be concise and encouraging.';
      try {
        const reply = await AI.generate('QUESTION: ' + question + '\n\nCANDIDATE ANSWER:\n' + text, { system, temperature: 0.4 });
        out.textContent = reply;
        if (window.Store) Store.record('speaking', { practised: true, mode: 'ai-feedback' });
      } catch (err) { out.textContent = '⚠️ ' + AI.friendlyError(err); }
      finally { aiBtn.disabled = false; }
    });
  }

  window.addEventListener('beforeunload', () => { if (synth) synth.cancel(); });
})();
