/* Writing lab — prompts, live counters, model answers, draft save */
(function () {
  'use strict';
  const editor = document.getElementById('editor');
  if (!editor) return;

  const TASKS = {
    t2: {
      type: 'Task 2 · Opinion essay',
      prompt: 'Some people believe that unpaid community service should be a compulsory part of high school programmes (for example, working for a charity, improving the neighbourhood or teaching sports to younger children). To what extent do you agree or disagree?',
      meta: 'Write at least 250 words · Suggested time: 40 minutes',
      min: 250, time: '40 min',
      checklist: [
        'Clear position stated in the introduction',
        'Two or three well-developed body paragraphs',
        'Each paragraph has one main idea + support',
        'A range of linking words (however, moreover, consequently)',
        'A conclusion that restates your opinion',
      ],
      model: 'It is sometimes argued that secondary school students should be required to carry out unpaid community work as part of their studies. I strongly agree with this view, as such programmes benefit both young people and the wider society. To begin with, compulsory community service equips students with practical skills that classroom learning rarely provides. When teenagers help at a charity or coach younger children, they develop teamwork, communication and a sense of responsibility. These qualities are highly valued by universities and employers alike, giving students a clear advantage later in life. Furthermore, community involvement broadens young people\'s understanding of the world beyond their own experience, fostering empathy for those less fortunate. On a social level, the benefits are equally significant. Local charities and neighbourhood projects frequently lack funding and rely heavily on volunteers, so a steady flow of student helpers can make a genuine difference. In addition, when young people contribute to their communities from an early age, they are far more likely to remain active citizens as adults, strengthening society as a whole. Admittedly, some may argue that forcing students to volunteer contradicts the very spirit of volunteering. However, I would contend that the experience itself, rather than the initial motivation, is what shapes lasting habits. In conclusion, making community service a required part of high school offers valuable personal development for students while providing much-needed support to society. For these reasons, I firmly believe schools should adopt such programmes.',
    },
    t1a: {
      type: 'Task 1 · Academic (bar chart)',
      prompt: 'The bar chart below shows the percentage of households in a European country that owned a car, a computer and a smartphone in 2000, 2010 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      meta: 'Write at least 150 words · Suggested time: 20 minutes',
      min: 150, time: '20 min',
      chart: {
        kind: 'bar', title: 'Household ownership of devices (%)', yLabel: '%', yMax: 100,
        categories: ['2000', '2010', '2020'],
        series: [
          { name: 'Car', color: '#2f6bf6', values: [60, 68, 72] },
          { name: 'Computer', color: '#12b886', values: [30, 65, 80] },
          { name: 'Smartphone', color: '#f59f00', values: [5, 40, 95] },
        ],
      },
      checklist: [
        'A paraphrased overview sentence (no opinion)',
        'A clear overview of the main trends',
        'Key figures selected — not every number',
        'Comparisons and contrasts between categories',
        'Accurate data-description language (rose, plateaued, doubled)',
      ],
      model: 'The bar chart illustrates the proportion of households in a European nation that possessed a car, a computer and a smartphone at three points in time: 2000, 2010 and 2020. Overall, ownership of all three items increased across the period, with smartphones showing by far the most dramatic growth, while car ownership rose only modestly. In 2000, cars were the most commonly owned item, held by around 60% of households, compared with roughly 30% for computers and a negligible share for smartphones, which were still a new technology. By 2010, computer ownership had climbed sharply to about 65%, overtaking cars, which had edged up to approximately 68%. Smartphone ownership, meanwhile, had reached around 40%. The most striking change occurred by 2020, when smartphones became almost universal, owned by close to 95% of households. Computer ownership also rose to nearly 80%, whereas car ownership remained comparatively stable at just over 70%. In summary, while all three items became more widespread, smartphones transformed from a rarity into the most owned item within only two decades.',
    },
    t1line: {
      type: 'Task 1 · Academic (line graph)',
      prompt: 'The line graph below shows the number of visitors (in thousands) to a city museum over the first six months of two consecutive years, 2019 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      meta: 'Write at least 150 words · Suggested time: 20 minutes',
      min: 150, time: '20 min',
      chart: {
        kind: 'line', title: 'Monthly museum visitors (thousands)', yLabel: '000s', yMax: 70,
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        series: [
          { name: '2019', color: '#2f6bf6', values: [20, 22, 30, 45, 55, 60] },
          { name: '2020', color: '#f59f00', values: [18, 15, 8, 5, 12, 25] },
        ],
      },
      checklist: [
        'A paraphrased overview sentence (no opinion)',
        'An overview of the main trend for each year',
        'Key data points and turning points selected',
        'Comparisons between the two years',
        'Accurate trend language (peaked, plunged, recovered)',
      ],
      model: 'The line graph compares the number of visitors, in thousands, to a city museum during the first half of 2019 and 2020. Overall, while visitor numbers rose steadily throughout the period in 2019, the figures for 2020 fell sharply before beginning a modest recovery, reflecting a very different pattern between the two years. In January, the two years started at a similar level, with around 20,000 visitors in 2019 and 18,000 in 2020. From that point, however, the trends diverged markedly. In 2019, numbers climbed consistently, reaching 30,000 in March and rising to a peak of 60,000 by June. In contrast, 2020 saw a steep decline, with visitors plunging to a low of just 5,000 in April. The final two months of 2020 brought a partial recovery, as figures rose to 12,000 in May and then more than doubled to 25,000 in June. In summary, 2019 was a period of steady growth, whereas 2020 experienced a dramatic fall followed by early signs of recovery.',
    },
    t1g: {
      type: 'Task 1 · General (letter)',
      prompt: 'You recently stayed at a hotel and were unhappy with the service you received. Write a letter to the hotel manager. In your letter: explain why you were staying at the hotel, describe the problems you experienced, and say what you would like the manager to do.',
      meta: 'Write at least 150 words · Suggested time: 20 minutes',
      min: 150, time: '20 min',
      checklist: [
        'Appropriate greeting (Dear Sir/Madam or Dear Mr…)',
        'All three bullet points fully covered',
        'A consistent tone (formal for a complaint)',
        'Clear paragraphs for each point',
        'A suitable sign-off (Yours faithfully/sincerely)',
      ],
      model: 'Dear Sir or Madam, I am writing to express my dissatisfaction with the service I received during my recent stay at your hotel from 3rd to 6th June. I was in the city to attend a business conference and had specifically chosen your hotel for its convenient location and its reputation for quality. Unfortunately, my experience fell well below the standard I had expected. Firstly, although I had reserved a quiet room, I was placed next to a lift that operated noisily throughout the night, leaving me unable to sleep properly before important meetings. Secondly, the air conditioning in my room did not function, and despite reporting the fault twice at reception, no one came to repair it during my entire stay. To make matters worse, the breakfast service, which was included in my booking, finished far earlier than the advertised time. Given these problems, I would appreciate a partial refund of my room charge and a written assurance that these issues will be addressed. I look forward to your prompt reply. Yours faithfully, J. Morgan',
    },
  };

  // merge in custom prompts created from the admin panel
  try {
    const custom = JSON.parse(localStorage.getItem('ielts-custom-prompts') || '[]');
    const tabsEl = document.getElementById('taskTabs');
    custom.forEach((p, i) => {
      const key = 'custom' + i;
      TASKS[key] = {
        type: 'Task 2 · Custom', prompt: p, meta: 'Write at least 250 words · Suggested time: 40 minutes',
        min: 250, time: '40 min',
        checklist: ['Clear position in the introduction', 'Well-developed body paragraphs', 'A range of linking words', 'A conclusion that restates your view'],
        model: 'This is a custom prompt added from the admin panel — write your own response and use the AI feedback button for a band estimate and improvements.',
      };
      const b = document.createElement('button');
      b.className = 'tab'; b.dataset.task = key; b.textContent = '⭐ Custom ' + (i + 1);
      tabsEl.appendChild(b);
    });
  } catch (e) {}

  let current = 't2';

  /* ---- SVG chart renderer (bar + line), theme-aware via CSS vars ---- */
  function renderChart(c) {
    const W = 500, H = 300, padL = 44, padR = 16, padT = 44, padB = 46;
    const iw = W - padL - padR, ih = H - padT - padB;
    const yMax = c.yMax, ticks = 5;
    const y = v => padT + ih - (v / yMax) * ih;
    let g = '';
    for (let i = 0; i <= ticks; i++) {
      const val = (yMax / ticks) * i, yy = y(val);
      g += `<line x1="${padL}" y1="${yy}" x2="${W - padR}" y2="${yy}" stroke="var(--border)" stroke-width="1"/>
        <text x="${padL - 8}" y="${yy + 4}" text-anchor="end" font-size="10" fill="var(--text-mut)">${Math.round(val)}</text>`;
    }
    const n = c.categories.length, bandW = iw / n;
    c.categories.forEach((cat, i) => {
      const cx = padL + bandW * i + bandW / 2;
      g += `<text x="${cx}" y="${H - padB + 18}" text-anchor="middle" font-size="11" fill="var(--text-soft)">${cat}</text>`;
    });
    if (c.kind === 'bar') {
      const s = c.series.length, gap = bandW * 0.18, barW = (bandW - gap) / s;
      c.categories.forEach((cat, i) => {
        c.series.forEach((ser, j) => {
          const x = padL + bandW * i + gap / 2 + barW * j;
          const h = (ser.values[i] / yMax) * ih;
          g += `<rect x="${x.toFixed(1)}" y="${(padT + ih - h).toFixed(1)}" width="${(barW - 2).toFixed(1)}" height="${h.toFixed(1)}" rx="2" fill="${ser.color}"/>
            <text x="${(x + barW / 2 - 1).toFixed(1)}" y="${(padT + ih - h - 4).toFixed(1)}" text-anchor="middle" font-size="9" fill="var(--text-soft)">${ser.values[i]}</text>`;
        });
      });
    } else {
      c.series.forEach(ser => {
        const pts = ser.values.map((v, i) => [padL + bandW * i + bandW / 2, y(v)]);
        const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
        g += `<path d="${d}" fill="none" stroke="${ser.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
        pts.forEach((p, i) => { g += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.5" fill="${ser.color}"/>
          <text x="${p[0].toFixed(1)}" y="${(p[1] - 9).toFixed(1)}" text-anchor="middle" font-size="9" fill="var(--text-soft)">${ser.values[i]}</text>`; });
      });
    }
    const legend = c.series.map((ser, i) =>
      `<g transform="translate(${padL + i * 120},${H - 6})"><rect width="11" height="11" rx="2" y="-9" fill="${ser.color}"/>
        <text x="16" y="0" font-size="11" fill="var(--text-soft)">${ser.name}</text></g>`).join('');
    return `<div class="panel" style="padding:16px;background:var(--surface-2);border-radius:12px;">
      <div style="font-weight:700;font-size:.92rem;margin-bottom:6px;">${c.title}</div>
      <div style="overflow-x:auto;"><svg viewBox="0 0 ${W} ${H}" width="100%" style="min-width:340px;">${g}${legend}</svg></div>
    </div>`;
  }

  function render() {
    const t = TASKS[current];
    document.getElementById('promptType').textContent = t.type;
    document.getElementById('promptText').textContent = t.prompt;
    const chartBox = document.getElementById('chartBox');
    if (t.chart) { chartBox.style.display = 'block'; chartBox.innerHTML = renderChart(t.chart); }
    else { chartBox.style.display = 'none'; chartBox.innerHTML = ''; }
    document.getElementById('promptMeta').textContent = t.meta;
    document.getElementById('minNote').innerHTML = 'Minimum: <b>' + t.min + '</b>';
    document.getElementById('timeNote').innerHTML = 'Suggested: <b>' + t.time + '</b>';
    document.getElementById('checklist').innerHTML = t.checklist.map(c => '<li>' + c + '</li>').join('');
    document.getElementById('modelText').textContent = t.model;
    document.getElementById('modelPanel').style.display = 'none';
    document.getElementById('modelBtn').textContent = 'Show model answer';
    editor.value = localStorage.getItem('ielts-draft-' + current) || '';
    count();
  }

  function count() {
    const text = editor.value.trim();
    const words = text ? text.split(/\s+/).length : 0;
    const sentences = text ? (text.match(/[.!?]+(\s|$)/g) || []).length || (text ? 1 : 0) : 0;
    const paras = text ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0;
    document.getElementById('wc').textContent = words;
    document.getElementById('sc').textContent = sentences;
    document.getElementById('pc').textContent = paras;
    const wcEl = document.getElementById('wc');
    const min = TASKS[current].min;
    wcEl.className = words >= min ? 'wc-ok' : (words > 0 ? 'wc-warn' : '');
  }

  document.getElementById('taskTabs').addEventListener('click', (e) => {
    const btn = e.target.closest('.tab'); if (!btn) return;
    document.querySelectorAll('#taskTabs .tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    current = btn.dataset.task;
    render();
  });

  editor.addEventListener('input', count);

  document.getElementById('modelBtn').addEventListener('click', function () {
    const p = document.getElementById('modelPanel');
    const show = p.style.display === 'none';
    p.style.display = show ? 'block' : 'none';
    this.textContent = show ? 'Hide model answer' : 'Show model answer';
    if (show) p.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
  document.getElementById('clearBtn').addEventListener('click', () => {
    if (confirm('Clear your writing?')) { editor.value = ''; localStorage.removeItem('ielts-draft-' + current); count(); }
  });
  document.getElementById('saveBtn').addEventListener('click', function () {
    localStorage.setItem('ielts-draft-' + current, editor.value);
    const old = this.textContent; this.textContent = '✓ Saved';
    setTimeout(() => this.textContent = old, 1500);
  });

  /* ---- AI feedback (Gemini) ---- */
  const aiBtn = document.getElementById('aiBtn');
  if (aiBtn && window.AI) {
    const wrap = document.getElementById('aiWrap');
    const out = document.getElementById('aiFeedback');
    AI.mountKeyPanel(document.getElementById('aiKeyPanel'));

    aiBtn.addEventListener('click', async () => {
      const essay = editor.value.trim();
      wrap.style.display = 'block';
      wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      if (essay.split(/\s+/).filter(Boolean).length < 40) {
        out.textContent = 'Please write at least a few sentences before requesting feedback.';
        return;
      }
      if (!AI.hasKey()) {
        out.textContent = 'Connect your Gemini API key above to get AI feedback (free from Google AI Studio).';
        return;
      }
      const t = TASKS[current];
      out.textContent = '🤖 Analysing your response against the IELTS band descriptors…';
      aiBtn.disabled = true;
      const system = 'You are a certified IELTS examiner. Assess the response strictly using the four official criteria. ' +
        'Return: (1) an estimated overall band and a band for each of the four criteria, ' +
        '(2) 3 concrete strengths, (3) 3 specific, actionable improvements with examples, ' +
        '(4) two sentences from the response rewritten to a higher band. Be encouraging but honest.';
      const prompt = 'TASK TYPE: ' + t.type + '\n\nQUESTION:\n' + t.prompt + '\n\nSTUDENT RESPONSE:\n' + essay;
      try {
        const reply = await AI.generate(prompt, { system, temperature: 0.4 });
        out.textContent = reply;
        // try to extract an overall band from the feedback to log progress
        const m = reply.match(/overall[^0-9]*([4-9](?:\.5|\.0)?)/i) || reply.match(/band[^0-9]*([4-9](?:\.5|\.0)?)/i);
        if (window.Store) {
          if (m) Store.record('writing', { band: parseFloat(m[1]), mode: current });
          else Store.record('writing', { practised: true, mode: current });
        }
      } catch (err) {
        out.textContent = '⚠️ ' + AI.friendlyError(err);
      } finally {
        aiBtn.disabled = false;
      }
    });
  }

  render();
})();
