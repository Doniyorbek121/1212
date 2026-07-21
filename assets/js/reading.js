/* Reading test — grading, timer, band conversion, progress save */
(function () {
  'use strict';
  const form = document.getElementById('readForm');
  if (!form) return;

  // Reading raw-score (out of 13 for this single passage, scaled to /40 logic simplified)
  // We map correct count directly to an indicative band using an official-style curve.
  function toBand(correct, total) {
    const pct = correct / total;
    if (pct >= 0.95) return 9.0;
    if (pct >= 0.87) return 8.5;
    if (pct >= 0.80) return 8.0;
    if (pct >= 0.72) return 7.5;
    if (pct >= 0.64) return 7.0;
    if (pct >= 0.54) return 6.5;
    if (pct >= 0.46) return 6.0;
    if (pct >= 0.36) return 5.5;
    if (pct >= 0.28) return 5.0;
    if (pct >= 0.20) return 4.5;
    return 4.0;
  }

  const norm = s => (s || '').trim().toLowerCase().replace(/[.,!?;:]/g, '');

  function check() {
    const questions = form.querySelectorAll('.q');
    let correct = 0;
    questions.forEach(q => {
      const answer = q.dataset.answer;
      const radios = q.querySelectorAll('input[type="radio"]');
      const input = q.querySelector('.gap-input');
      const select = q.querySelector('select');
      let ok = false;

      if (radios.length) {
        const chosen = [...radios].find(r => r.checked);
        radios.forEach(r => r.closest('.opt').classList.remove('correct', 'wrong'));
        if (chosen) {
          const label = chosen.closest('.opt');
          if (chosen.value === answer) { label.classList.add('correct'); ok = true; }
          else { label.classList.add('wrong'); }
        }
        // always highlight the correct option
        [...radios].find(r => r.value === answer)?.closest('.opt').classList.add('correct');
      } else if (input) {
        input.classList.remove('correct', 'wrong');
        if (norm(input.value) === norm(answer)) { input.classList.add('correct'); ok = true; }
        else { input.classList.add('wrong'); input.placeholder = 'Answer: ' + answer; }
      } else if (select) {
        select.classList.remove('correct', 'wrong');
        if (select.value === answer) { select.classList.add('correct'); ok = true; }
        else { select.classList.add('wrong'); }
      }
      if (ok) correct++;
    });

    const total = questions.length;
    const band = toBand(correct, total);
    document.getElementById('scoreText').textContent = correct + ' / ' + total;
    document.getElementById('bandPill').textContent = 'Band ' + band.toFixed(1);
    const msg = band >= 7 ? 'Excellent — that\'s a strong band. Keep it up! 🎉'
      : band >= 6 ? 'Good work. Review the ones you missed to push past band 7.'
      : 'Keep practising — check the highlighted answers to learn from each mistake.';
    document.getElementById('resultMsg').textContent = msg;
    const box = document.getElementById('result');
    box.classList.add('show');
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // save progress
    try {
      const p = JSON.parse(localStorage.getItem('ielts-progress') || '{}');
      p.reading = { correct, total, band, date: Date.now() };
      localStorage.setItem('ielts-progress', JSON.stringify(p));
    } catch (e) {}
  }

  function reset() {
    form.reset();
    form.querySelectorAll('.opt').forEach(o => o.classList.remove('correct', 'wrong'));
    form.querySelectorAll('.gap-input, select').forEach(i => { i.classList.remove('correct', 'wrong'); });
    form.querySelectorAll('.gap-input').forEach(i => i.placeholder = 'one word');
    document.getElementById('result').classList.remove('show');
  }

  document.getElementById('checkBtn').addEventListener('click', check);
  document.getElementById('resetBtn').addEventListener('click', reset);

  /* Timer */
  let secs = 20 * 60, iv = null;
  const tEl = document.getElementById('timer');
  function render() {
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    tEl.textContent = m + ':' + s;
    tEl.classList.toggle('low', secs <= 120);
  }
  document.getElementById('startTimer').addEventListener('click', function () {
    if (iv) { clearInterval(iv); iv = null; this.textContent = 'Start timer'; return; }
    this.textContent = 'Pause';
    iv = setInterval(() => {
      if (secs <= 0) { clearInterval(iv); iv = null; this.textContent = 'Time!'; check(); return; }
      secs--; render();
    }, 1000);
  });
})();
