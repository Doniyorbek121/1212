/* Listening test — speech-synthesis audio + grading */
(function () {
  'use strict';
  const form = document.getElementById('listenForm');
  if (!form) return;

  const SCRIPT =
    "Hello, Sunnydale Student Housing, how can I help you? " +
    "Hi, yes, I'm looking for a room to rent near the university. " +
    "Of course. Can I take your surname please? " +
    "It's Thompson. T-H-O-M-P-S-O-N. " +
    "Thank you, Miss Thompson. And which area are you interested in? " +
    "Ideally somewhere near Maple Street — that's close to my department. " +
    "Right, near Maple Street. And what's your maximum monthly budget? " +
    "I can't really go above four hundred and fifty pounds a month. " +
    "Four hundred and fifty, noted. When would you like to move in? " +
    "The start of September, before term begins. " +
    "September, perfect. Is there any feature that's essential for you? " +
    "Yes, I have a car, so parking is essential. " +
    "We do have properties with parking. Let me arrange a viewing. " +
    "Are you free on Friday afternoon? " +
    "Friday works well, thank you. " +
    "Great. Now, a few details about the apartment. " +
    "The deposit is equal to one month's rent, payable before you move in. " +
    "The rent includes water and internet, though electricity is billed separately. " +
    "Unfortunately, pets are not allowed in any of our student properties. " +
    "And finally, the nearest bus stop is a five-minute walk away, just down the road. " +
    "Wonderful, I'll see you on Friday. Goodbye!";

  document.getElementById('transcriptText').textContent = SCRIPT;

  const synth = window.speechSynthesis;
  const playBtn = document.getElementById('playBtn');
  const stopBtn = document.getElementById('stopBtn');
  const status = document.getElementById('audioStatus');
  const bar = document.getElementById('audioBar');
  let utter = null, played = false, progTimer = null;

  function play() {
    if (!synth) { status.textContent = 'Speech not supported — read the transcript below.'; return; }
    synth.cancel();
    utter = new SpeechSynthesisUtterance(SCRIPT);
    utter.rate = 0.95; utter.pitch = 1;
    const voices = synth.getVoices();
    const en = voices.find(v => /en-GB/i.test(v.lang)) || voices.find(v => /en/i.test(v.lang));
    if (en) utter.voice = en;
    status.textContent = played ? 'Replaying…' : 'Playing…';
    played = true;
    // rough progress bar based on estimated duration
    const words = SCRIPT.split(' ').length;
    const est = (words / 2.4) * 1000; // ~2.4 words/sec
    let start = Date.now();
    clearInterval(progTimer);
    progTimer = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - start) / est) * 100);
      bar.style.width = pct + '%';
    }, 120);
    utter.onend = () => { clearInterval(progTimer); bar.style.width = '100%'; status.textContent = 'Finished'; };
    synth.speak(utter);
  }
  function stop() { if (synth) synth.cancel(); clearInterval(progTimer); status.textContent = 'Stopped'; }

  playBtn.addEventListener('click', play);
  stopBtn.addEventListener('click', stop);
  // voices may load async
  if (synth) synth.onvoiceschanged = () => {};

  /* ---- grading ---- */
  const norm = s => (s || '').trim().toLowerCase().replace(/[£.,!?;:]/g, '');
  function toBand(c, t) {
    const pct = c / t;
    if (pct >= 0.9) return 8.5; if (pct >= 0.8) return 8.0; if (pct >= 0.7) return 7.0;
    if (pct >= 0.6) return 6.5; if (pct >= 0.5) return 6.0; if (pct >= 0.4) return 5.5;
    if (pct >= 0.3) return 5.0; return 4.5;
  }

  function check() {
    let correct = 0;
    const qs = form.querySelectorAll('.q');
    qs.forEach(q => {
      const ans = q.dataset.answer;
      const input = q.querySelector('.gap-input');
      const radios = q.querySelectorAll('input[type="radio"]');
      let ok = false;
      if (input) {
        input.classList.remove('correct', 'wrong');
        if (norm(input.value) === norm(ans)) { input.classList.add('correct'); ok = true; }
        else { input.classList.add('wrong'); input.placeholder = 'Answer: ' + ans; }
      } else if (radios.length) {
        const chosen = [...radios].find(r => r.checked);
        radios.forEach(r => r.closest('.opt').classList.remove('correct', 'wrong'));
        if (chosen && chosen.value === ans) { chosen.closest('.opt').classList.add('correct'); ok = true; }
        else if (chosen) chosen.closest('.opt').classList.add('wrong');
        [...radios].find(r => r.value === ans)?.closest('.opt').classList.add('correct');
      }
      if (ok) correct++;
    });
    const total = qs.length, band = toBand(correct, total);
    document.getElementById('scoreText').textContent = correct + ' / ' + total;
    document.getElementById('bandPill').textContent = 'Band ' + band.toFixed(1);
    document.getElementById('resultMsg').textContent =
      band >= 7 ? 'Sharp ears! That\'s a strong listening band. 🎧'
      : band >= 6 ? 'Nicely done — replay the audio and catch the ones you missed.'
      : 'Listen again with the transcript to train the details.';
    const box = document.getElementById('result');
    box.classList.add('show');
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    try {
      const p = JSON.parse(localStorage.getItem('ielts-progress') || '{}');
      p.listening = { correct, total, band, date: Date.now() };
      localStorage.setItem('ielts-progress', JSON.stringify(p));
    } catch (e) {}
  }
  function reset() {
    form.reset();
    form.querySelectorAll('.opt').forEach(o => o.classList.remove('correct', 'wrong'));
    form.querySelectorAll('.gap-input').forEach(i => { i.classList.remove('correct', 'wrong'); i.placeholder = i.placeholder.replace('Answer: ', ''); });
    document.getElementById('result').classList.remove('show');
  }
  document.getElementById('checkBtn').addEventListener('click', check);
  document.getElementById('resetBtn').addEventListener('click', reset);
  window.addEventListener('beforeunload', () => { if (synth) synth.cancel(); });
})();
