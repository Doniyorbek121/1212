/* Study Plan Generator — builds a personalised week-by-week IELTS plan
   deterministically, with an optional Gemini AI enhancement. */
(function () {
  'use strict';
  const genBtn = document.getElementById('genBtn');
  if (!genBtn) return;

  // live slider labels
  const bind = (id, valId, fmt) => {
    const el = document.getElementById(id), out = document.getElementById(valId);
    const upd = () => out.textContent = fmt ? fmt(el.value) : el.value;
    el.addEventListener('input', upd); upd();
  };
  bind('cur', 'curVal', v => (+v).toFixed(1));
  bind('tgt', 'tgtVal', v => (+v).toFixed(1));
  bind('hrs', 'hrsVal');
  bind('wk', 'wkVal');

  const SKILLS = ['Listening', 'Reading', 'Writing', 'Speaking'];
  const LINKS = { Listening: 'listening.html', Reading: 'reading.html', Writing: 'writing.html', Speaking: 'speaking.html' };

  // task pools per skill and per phase (foundation, build, exam)
  const TASKS = {
    Listening: {
      foundation: ['Learn the 4 section types & question formats', 'Section 1 note-completion drill + review answers', 'Practise spelling numbers, dates & names by ear'],
      build: ['Timed Section 3–4 practice + review mistakes', 'Re-listen with the transcript and note missed clues', 'Multiple-choice & map-labelling drill'],
      exam: ['Full 40-question Listening mock under exam timing', 'Review every wrong answer and why you missed it', 'Redo your weakest section from memory'],
    },
    Reading: {
      foundation: ['Learn every question type (TFNG, matching, headings…)', 'Practise skimming & scanning on one passage', 'True/False/Not Given focused drill'],
      build: ['Timed passage (20 min) + full answer review', 'Matching headings & summary-completion practice', 'Build a synonyms/paraphrase list from a passage'],
      exam: ['Full 3-passage Reading mock in 60 minutes', 'Analyse timing — where did you lose minutes?', 'Redo the hardest passage and beat your score'],
    },
    Writing: {
      foundation: ['Study a band-9 Task 2 model & copy its structure', 'Learn Task 1 chart-description language', 'Practise paraphrasing essay questions'],
      build: ['Write one Task 1 (chart) + get AI feedback', 'Write one Task 2 essay + get AI feedback', 'Rewrite a weak paragraph to a higher band'],
      exam: ['Full Writing test: Task 1 + Task 2 in 60 min', 'Mark your essay against the 4 criteria', 'Fix your two most common grammar errors'],
    },
    Speaking: {
      foundation: ['Answer 5 Part 1 questions aloud (record yourself)', 'Learn how to extend answers with reasons/examples', 'Build topic vocabulary for common themes'],
      build: ['Record a Part 2 cue card (2 min) & listen back', 'Dictate an answer & get AI feedback', 'Practise Part 3 discussion questions aloud'],
      exam: ['Full Parts 1–3 simulation with the timer', 'Record, transcribe & self-assess your fluency', 'Target pronunciation of your tricky sounds'],
    },
  };
  const VOCAB = ['Learn 10 flashcards (Vocabulary page)', 'Review linking words & collocations (Resources)', 'Revise yesterday\'s new words'];

  function phaseOf(week, total) {
    if (total <= 2) return week === 1 ? 'foundation' : 'exam';
    const third = total / 3;
    if (week <= Math.ceil(third)) return 'foundation';
    if (week <= Math.ceil(third * 2)) return 'build';
    return 'exam';
  }
  const PHASE_LABEL = { foundation: 'Foundations — learn the formats', build: 'Skill building — strategy & timed practice', exam: 'Exam mode — full mocks & review' };

  // weights: bigger gap → more Writing/Speaking (hardest to raise); focus skill gets a boost
  function weights(gap, focus) {
    const w = { Listening: 2, Reading: 2, Writing: 2.5, Speaking: 2.5 };
    if (gap >= 1.5) { w.Writing += 0.7; w.Speaking += 0.7; }
    if (focus && w[focus] != null) w[focus] += 1.5;
    return w;
  }

  // pick skills for a day using weighted rotation to hit proportions across the week
  function weekSkillOrder(w) {
    // expand into a pool proportional to weights, 6 study days
    const pool = [];
    SKILLS.forEach(s => { const n = Math.round(w[s] * 2); for (let i = 0; i < n; i++) pool.push(s); });
    // shuffle deterministically-ish
    for (let i = pool.length - 1; i > 0; i--) { const j = (i * 7 + 3) % (i + 1); [pool[i], pool[j]] = [pool[j], pool[i]]; }
    return pool;
  }

  let lastText = '';

  function generate() {
    const cur = +document.getElementById('cur').value;
    const tgt = +document.getElementById('tgt').value;
    const hrs = +document.getElementById('hrs').value;
    const weeks = +document.getElementById('wk').value;
    const focus = document.getElementById('focus').value;
    const ttype = document.getElementById('ttype').value;
    const gap = Math.max(0, tgt - cur);
    const w = weights(gap, focus === 'none' ? null : focus);

    // realism note
    let realism = '';
    const perWeekGain = gap / weeks;
    if (tgt <= cur) realism = '🎯 Your target is at or below your current band — use this plan to consolidate and aim higher!';
    else if (perWeekGain > 0.34) realism = '⚡ Ambitious! Raising this much this fast needs full focus every day. Consider more weeks or hours if you can.';
    else if (perWeekGain > 0.17) realism = '💪 A challenging but realistic goal with consistent daily effort.';
    else realism = '✅ A very achievable goal at this pace — stay consistent and you\'ll get there.';

    const idx = { Listening: 0, Reading: 0, Writing: 0, Speaking: 0, vocab: 0 };
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // summary
    document.getElementById('summary').style.display = 'block';
    document.getElementById('summary').innerHTML =
      `<div class="flex between items-center wrap gap">
        <div><h3 class="mb-0">Your ${weeks}-week plan</h3>
          <p class="small muted mb-0">${ttype} · Band ${cur.toFixed(1)} → ${tgt.toFixed(1)} · ${hrs}h/day · ~${hrs * 6}h/week</p></div>
        <div class="overall-band" style="padding:14px 20px;"><div class="small" style="opacity:.85;">Target</div><div class="big" style="font-size:2rem;">${tgt.toFixed(1)}</div></div>
      </div>
      <p class="mt-2 mb-0">${realism}</p>`;

    let html = '', txt = `IELTS STUDY PLAN\n${ttype} | Band ${cur.toFixed(1)} -> ${tgt.toFixed(1)} | ${hrs}h/day | ${weeks} weeks\n${realism}\n`;

    for (let wk = 1; wk <= weeks; wk++) {
      const phase = phaseOf(wk, weeks);
      const order = weekSkillOrder(w);
      let rows = '';
      txt += `\n=== WEEK ${wk}: ${PHASE_LABEL[phase]} ===\n`;
      for (let d = 0; d < 7; d++) {
        if (d === 6) { // Sunday = review/rest
          rows += `<tr style="border-bottom:1px solid var(--border);"><td style="padding:9px 8px;font-weight:700;">${dayNames[d]}</td><td style="padding:9px 8px;" colspan="2">🌿 Light review & rest — go over the week's notes and new vocabulary.</td></tr>`;
          txt += `${dayNames[d]}: Light review & rest\n`;
          continue;
        }
        const skill = order[d % order.length] || SKILLS[d % 4];
        const pool = TASKS[skill][phase];
        const task = pool[idx[skill] % pool.length]; idx[skill]++;
        const vtask = VOCAB[idx.vocab % VOCAB.length]; idx.vocab++;
        rows += `<tr style="border-bottom:1px solid var(--border);">
          <td style="padding:9px 8px;font-weight:700;">${dayNames[d]}</td>
          <td style="padding:9px 8px;"><a href="${LINKS[skill]}" style="color:var(--brand-600);font-weight:700;">${skill}</a>: ${task}</td>
          <td style="padding:9px 8px;" class="muted small">+ ${vtask}</td></tr>`;
        txt += `${dayNames[d]}: [${skill}] ${task}  (+ ${vtask})\n`;
      }
      html += `<div class="panel panel-pad" style="margin-bottom:16px;">
        <div class="flex between items-center wrap"><h3 class="mb-0">Week ${wk}</h3><span class="tag">${PHASE_LABEL[phase]}</span></div>
        <div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;margin-top:12px;">
          <thead><tr style="text-align:left;border-bottom:2px solid var(--border);"><th style="padding:6px 8px;">Day</th><th style="padding:6px 8px;">Main focus</th><th style="padding:6px 8px;">Add-on</th></tr></thead>
          <tbody>${rows}</tbody></table></div></div>`;
    }

    document.getElementById('planOut').innerHTML = html;
    document.getElementById('placeholder').style.display = 'none';
    document.getElementById('planActions').style.display = 'flex';
    lastText = txt;
    document.getElementById('summary').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  genBtn.addEventListener('click', generate);

  /* actions */
  document.getElementById('copyBtn').addEventListener('click', function () {
    navigator.clipboard.writeText(lastText).then(() => { const o = this.textContent; this.textContent = '✓ Copied'; setTimeout(() => this.textContent = o, 1500); });
  });
  document.getElementById('dlBtn').addEventListener('click', () => {
    const blob = new Blob([lastText], { type: 'text/plain' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'ielts-study-plan.txt'; a.click();
  });
  document.getElementById('printBtn').addEventListener('click', () => window.print());

  /* AI enhancement */
  const aiBtn = document.getElementById('aiBtn');
  if (aiBtn && window.AI) {
    AI.mountKeyPanel(document.getElementById('aiKeyPanel'));
    aiBtn.addEventListener('click', async () => {
      document.getElementById('aiKeyPanel').style.display = 'block';
      const out = document.getElementById('aiPlan');
      out.style.display = 'block';
      if (!AI.hasKey()) { out.textContent = 'Connect your Gemini API key above to enrich this plan with personalised advice.'; return; }
      const cur = document.getElementById('cur').value, tgt = document.getElementById('tgt').value;
      const hrs = document.getElementById('hrs').value, weeks = document.getElementById('wk').value;
      const focus = document.getElementById('focus').value, ttype = document.getElementById('ttype').value;
      out.textContent = '🤖 Personalising your plan…';
      aiBtn.disabled = true;
      const system = 'You are an expert IELTS coach. Given a student profile, write concise, motivating, practical advice to complement their weekly plan: the 3 highest-impact priorities for their gap, common mistakes to avoid at their level, and one weekly habit. Keep it under 200 words, use short bullet points.';
      const prompt = `Test: ${ttype}. Current band ${cur}, target ${tgt}. ${hrs} hours/day for ${weeks} weeks. Weakest skill: ${focus}.`;
      try { out.textContent = await AI.generate(prompt, { system, temperature: 0.6 }); }
      catch (e) { out.textContent = '⚠️ ' + AI.friendlyError(e); }
      finally { aiBtn.disabled = false; }
    });
  }

  // auto-generate a default plan on load so the page isn't empty
  generate();
})();
