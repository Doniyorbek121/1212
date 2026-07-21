/* AI Tutor chat — Gemini client + switchable tutor personalities */
(function () {
  'use strict';
  const log = document.getElementById('chatLog');
  if (!log || !window.AI) return;

  const BASE =
    "You are an expert IELTS tutor with 15 years of experience preparing students for the real IELTS Academic and General Training exams. " +
    "You know the four skills, the band descriptors, and every question type in depth. " +
    "You may chat in the student's language (they often write in Uzbek), but you always teach and correct IELTS ENGLISH. " +
    "When you assess writing or speaking, estimate a band using the four official criteria, then give 2-3 concrete improvements and a short improved version. " +
    "Keep answers practical and focused. Always stay accurate about IELTS — never invent rules.";

  // Each persona is a TONE overlay on top of BASE. Content stays high quality; only the delivery changes.
  const PERSONAS = {
    teacher: {
      label: '👩‍🏫 O\'qituvchi', hint: 'Professional, clear, structured',
      tone: "PERSONA: Speak like a calm, professional teacher. Be clear, organised and encouraging. Use structured points and headings. Polite and supportive, never harsh.",
      greet: "👩‍🏫 Assalomu alaykum! Men sizning IELTS o'qituvchingizman. Qaysi ko'nikma ustida ishlaymiz — Reading, Listening, Writing yoki Speaking? Yoki esseyingizni yuboring, band bahosini beraman.",
    },
    gentle: {
      label: '🌸 Muloyim', hint: 'Soft, patient, reassuring',
      tone: "PERSONA: Speak very softly, patiently and kindly, like a gentle mentor. Reassure the student, remove their fear of mistakes, and celebrate small progress. Use warm, calm words.",
      greet: "🌸 Salom, aziz o'quvchim. Xavotir olmang — biz bu yo'lni birga, shoshilmasdan bosib o'tamiz. Har bir xatolik — o'sish. Bugun nimadan boshlaymiz?",
    },
    buddy: {
      label: '😎 Do\'st (ko\'cha tili)', hint: 'Casual, slangy, fun',
      tone: "PERSONA: Talk like a cool, friendly buddy using relaxed, everyday street-style language and light humour. Be casual and fun, use emojis, but STILL give correct, useful IELTS advice. Keep it real and motivating, never rude.",
      greet: "😎 Hey, qalaysan bro! Kel, IELTSni birga yorib tashlaymiz 🔥 Qaysi qismda qiynalyapsan — yozuvmi, gapirishmi? Otvet ber, boshladik!",
    },
    caring: {
      label: '💙 G\'amxo\'r', hint: 'Warm, deeply supportive, motivating',
      tone: "PERSONA: Speak in a warm, deeply caring and affectionate way, like someone who genuinely believes in the student and wants the very best for them. Be tender, motivating and proud of their effort. Keep it wholesome and respectful — caring, never romantic or inappropriate.",
      greet: "💙 Salom, jonim o'quvchim! Men senga chin dildan ishonaman — sen albatta o'z bandingga erishasan. Charchasang ham men yoningdaman. Qani, bugun kichik bir qadam qo'yaylik. Nima qilamiz?",
    },
    strict: {
      label: '🔥 Qattiqo\'l', hint: 'Tough, no-excuses coach',
      tone: "PERSONA: Speak like a strict, no-nonsense drill coach. Be direct and demanding, push the student hard, and don't accept excuses. Point out mistakes firmly and set clear tasks. Tough but fair — your goal is results, and underneath you respect the student.",
      greet: "🔥 Bahona yo'q. Sen bu yerga band ko'tarish uchun kelding. Ishga kirishamiz — hoziroq menga bitta esse yoki javob yoz. Yozganingni tekshiraman va nima yomonligini to'g'ridan-to'g'ri aytaman. Boshla!",
    },
  };

  let persona = localStorage.getItem('ielts-tutor-persona') || 'teacher';
  const history = [];

  AI.mountKeyPanel(document.getElementById('keyPanel'));

  /* persona chips */
  const chipsEl = document.getElementById('personaChips');
  function paintChips() {
    chipsEl.innerHTML = Object.keys(PERSONAS).map(k =>
      `<span class="chip ${k === persona ? 'active-chip' : ''}" data-k="${k}" title="${PERSONAS[k].hint}"
        style="${k === persona ? 'border-color:var(--brand-500);color:var(--brand-600);background:var(--brand-50);' : ''}">${PERSONAS[k].label}</span>`).join('');
  }
  paintChips();
  chipsEl.addEventListener('click', (e) => {
    const c = e.target.closest('.chip'); if (!c) return;
    persona = c.dataset.k;
    localStorage.setItem('ielts-tutor-persona', persona);
    paintChips();
    history.length = 0;
    log.innerHTML = '';
    add(PERSONAS[persona].greet, 'ai');
  });

  function add(text, who, extraClass) {
    const el = document.createElement('div');
    el.className = 'msg ' + who + (extraClass ? ' ' + extraClass : '');
    el.textContent = text;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }

  add(PERSONAS[persona].greet, 'ai');

  const box = document.getElementById('chatBox');
  const sendBtn = document.getElementById('sendBtn');

  async function send(text) {
    text = (text || box.value).trim();
    if (!text) return;
    if (!AI.hasKey()) {
      add('Iltimos, yuqorida Gemini API kalitingizni ulang — Google AI Studio\'dan bepul olinadi.', 'ai');
      document.getElementById('keyPanel').scrollIntoView({ behavior: 'smooth' });
      return;
    }
    add(text, 'user');
    box.value = '';
    sendBtn.disabled = true;
    const thinking = add('…', 'ai', 'think');
    const system = BASE + '\n\n' + PERSONAS[persona].tone;
    try {
      const reply = await AI.generate(text, { system, history, temperature: 0.8 });
      thinking.remove();
      add(reply, 'ai');
      history.push({ role: 'user', text });
      history.push({ role: 'assistant', text: reply });
      if (history.length > 16) history.splice(0, history.length - 16);
    } catch (err) {
      thinking.remove();
      add('⚠️ ' + AI.friendlyError(err), 'ai');
    } finally {
      sendBtn.disabled = false;
      box.focus();
    }
  }

  sendBtn.addEventListener('click', () => send());
  box.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } });
  document.getElementById('chips').addEventListener('click', (e) => {
    const chip = e.target.closest('.chip'); if (!chip) return;
    send(chip.dataset.p);
  });
})();
