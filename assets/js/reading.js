/* Full Reading test engine — renders passages/questions, grades to band /40 */
(function () {
  'use strict';
  const TEST = window.READING_TEST;
  const wrap = document.getElementById('passages');
  if (!TEST || !wrap) return;

  const OPT_SETS = {
    tfng: ['TRUE', 'FALSE', 'NOT GIVEN'],
    yynn: ['YES', 'NO', 'NOT GIVEN'],
  };

  // Official-style Academic Reading raw(/40) -> band
  function toBand(c) {
    const t = [[39,9],[37,8.5],[35,8],[33,7.5],[30,7],[27,6.5],[23,6],[19,5.5],[15,5],[13,4.5],[10,4],[8,3.5]];
    for (const [m, b] of t) if (c >= m) return b;
    return 3.0;
  }

  function qHtml(g, q) {
    let control = '';
    if (g.type === 'tfng' || g.type === 'yynn') {
      control = '<div class="opts">' + OPT_SETS[g.type].map(o =>
        `<label class="opt"><input type="radio" name="q${q.n}" value="${o}"> ${o}</label>`).join('') + '</div>';
    } else if (g.type === 'mcq') {
      control = '<div class="opts">' + q.options.map(o => {
        const letter = o.trim().charAt(0);
        return `<label class="opt"><input type="radio" name="q${q.n}" value="${letter}"> ${o}</label>`;
      }).join('') + '</div>';
    } else if (g.type === 'match') {
      control = `<select class="field" name="q${q.n}"><option value="">Choose…</option>` +
        g.options.map(o => `<option>${o}</option>`).join('') + '</select>';
    } else { // gap
      control = `<input class="gap-input" name="q${q.n}" autocomplete="off" placeholder="type answer">`;
    }
    return `<div class="q" data-n="${q.n}" data-answer="${q.a}">
      <div class="q-text"><span class="q-num">${q.n}</span>${q.text}</div>${control}</div>`;
  }

  function passageHtml(p, i) {
    const paras = p.paras.map(([tag, txt]) => `<p><b>${tag}.</b> ${txt}</p>`).join('');
    const groups = p.groups.map(g =>
      `<div style="margin-bottom:10px;"><b>${g.instr.split('—')[0].trim()}</b>
        <p class="small muted">${g.instr.split('—').slice(1).join('—').trim()}</p>
        ${g.qs.map(q => qHtml(g, q)).join('')}</div>`).join('');
    return `<div class="passage-block" data-p="${i}" style="${i ? 'display:none;' : ''}">
      <div class="reading-layout">
        <div class="panel panel-pad passage">
          <span class="tag">Passage ${i + 1}</span>
          <h3 style="margin-top:10px;">${p.title}</h3>
          <p class="small muted">${p.intro}</p>
          ${paras}
        </div>
        <div class="panel panel-pad"><form class="pform">${groups}</form></div>
      </div></div>`;
  }

  wrap.innerHTML = TEST.map(passageHtml).join('');

  // tabs
  const tabs = document.getElementById('passageTabs');
  tabs.innerHTML = TEST.map((p, i) =>
    `<button class="tab ${i === 0 ? 'active' : ''}" data-p="${i}">Passage ${i + 1}</button>`).join('');
  tabs.addEventListener('click', (e) => {
    const b = e.target.closest('.tab'); if (!b) return;
    tabs.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    b.classList.add('active');
    document.querySelectorAll('.passage-block').forEach(bl =>
      bl.style.display = bl.dataset.p === b.dataset.p ? 'block' : 'none');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // answered counter
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

  const norm = s => (s || '').trim().toLowerCase().replace(/[.,!?;:]/g, '');

  function grade() {
    let correct = 0;
    const per = TEST.map(() => ({ c: 0, t: 0 }));
    document.querySelectorAll('.passage-block').forEach((block, pi) => {
      block.querySelectorAll('.q').forEach(q => {
        per[pi].t++;
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
        if (ok) { correct++; per[pi].c++; }
      });
    });

    const band = toBand(correct);
    document.getElementById('scoreText').textContent = correct + ' / 40';
    document.getElementById('bandPill').textContent = 'Band ' + band.toFixed(1);
    document.getElementById('resultMsg').textContent =
      band >= 7 ? 'Outstanding — that\'s a band-7+ reading performance! 🎉'
      : band >= 6 ? 'Good result. Review the highlighted answers to push toward band 7.'
      : 'Keep going — study the correct answers and try again to improve.';
    document.getElementById('perPassage').innerHTML = per.map((p, i) =>
      `<div class="card" style="padding:16px;"><b>Passage ${i + 1}</b><div class="big text-grad" style="font-size:1.6rem;">${p.c}/${p.t}</div></div>`).join('');
    const box = document.getElementById('result');
    box.classList.add('show');
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (window.Store) Store.record('reading', { band, correct, total: 40, mode: 'full' });
    if (timerIv) { clearInterval(timerIv); timerIv = null; document.getElementById('startTimer').textContent = 'Start'; }
  }

  document.getElementById('submitBtn').addEventListener('click', () => {
    const answered = parseInt(answeredEl.textContent, 10);
    if (answered < 40 && !confirm(`You've answered ${answered}/40. Submit anyway?`)) return;
    grade();
  });
  document.getElementById('retryBtn').addEventListener('click', () => location.reload());

  /* timer */
  let secs = 60 * 60, timerIv = null;
  const tEl = document.getElementById('timer');
  function render() {
    tEl.textContent = String(Math.floor(secs / 60)).padStart(2, '0') + ':' + String(secs % 60).padStart(2, '0');
    tEl.classList.toggle('low', secs <= 300);
  }
  document.getElementById('startTimer').addEventListener('click', function () {
    if (timerIv) { clearInterval(timerIv); timerIv = null; this.textContent = 'Resume'; return; }
    this.textContent = 'Pause';
    timerIv = setInterval(() => {
      if (secs <= 0) { clearInterval(timerIv); timerIv = null; grade(); return; }
      secs--; render();
    }, 1000);
  });
  render();
})();
