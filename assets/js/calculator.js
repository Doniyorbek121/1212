/* Band score calculator — overall averaging + raw-score conversion */
(function () {
  'use strict';
  const overallEl = document.getElementById('overall');
  if (!overallEl) return;

  // Official IELTS overall rounding: average of four, rounded to nearest half band.
  // .25 rounds UP to .5, .75 rounds UP to next whole; .125/.375 etc round to nearest 0.5.
  function roundOverall(avg) {
    const whole = Math.floor(avg);
    const frac = avg - whole;
    if (frac < 0.25) return whole;
    if (frac < 0.75) return whole + 0.5;
    return whole + 1;
  }

  function calcOverall() {
    const vals = ['l', 'r', 'w', 's'].map(id => parseFloat(document.getElementById('in-' + id).value));
    if (vals.some(v => isNaN(v))) { overallEl.textContent = '—'; return; }
    const avg = vals.reduce((a, b) => a + b, 0) / 4;
    const band = roundOverall(avg);
    overallEl.textContent = band.toFixed(1);
    const msg = document.getElementById('overallMsg');
    msg.textContent = band >= 7 ? 'Great — that meets most university & visa requirements 🎓'
      : band >= 6 ? 'Solid — enough for many programmes. Push one skill up for band 7.'
      : 'Keep practising — small gains in each skill add up fast.';
  }
  ['in-l', 'in-r', 'in-w', 'in-s'].forEach(id => document.getElementById(id).addEventListener('input', calcOverall));

  /* Raw-score conversion tables (indicative, standard IELTS curves) */
  const TABLES = {
    listening: [[39,9],[37,8.5],[35,8],[32,7.5],[30,7],[26,6.5],[23,6],[18,5.5],[16,5],[13,4.5],[10,4]],
    areading:  [[39,9],[37,8.5],[35,8],[33,7.5],[30,7],[27,6.5],[23,6],[19,5.5],[15,5],[13,4.5],[10,4]],
    greading:  [[40,9],[39,8.5],[37,8],[36,7.5],[34,7],[32,6.5],[30,6],[27,5.5],[23,5],[19,4.5],[15,4]],
  };
  const LABELS = { listening: 'Listening band', areading: 'Academic Reading band', greading: 'General Reading band' };
  let rawType = 'listening';

  function rawToBand(correct) {
    const table = TABLES[rawType];
    for (const [min, band] of table) { if (correct >= min) return band; }
    return 3.5;
  }
  function calcRaw() {
    let c = parseInt(document.getElementById('raw').value, 10);
    if (isNaN(c)) c = 0;
    c = Math.max(0, Math.min(40, c));
    document.getElementById('rawBand').textContent = rawToBand(c).toFixed(1);
    document.getElementById('rawLabel').textContent = LABELS[rawType];
  }
  document.getElementById('raw').addEventListener('input', calcRaw);
  document.getElementById('rawTabs').addEventListener('click', (e) => {
    const b = e.target.closest('.tab'); if (!b) return;
    document.querySelectorAll('#rawTabs .tab').forEach(t => t.classList.remove('active'));
    b.classList.add('active'); rawType = b.dataset.t; calcRaw();
  });

  calcOverall();
  calcRaw();
})();
