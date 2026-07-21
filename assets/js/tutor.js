/* AI Tutor chat — uses the shared AI (Gemini) client */
(function () {
  'use strict';
  const log = document.getElementById('chatLog');
  if (!log || !window.AI) return;

  const SYSTEM =
    "You are an expert, encouraging IELTS tutor with 15 years of experience. " +
    "You help students prepare for IELTS Academic and General Training. " +
    "Give clear, practical, concise advice. When you assess writing or speaking, " +
    "estimate a band score (using the public band descriptors for Task Achievement, " +
    "Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy), then " +
    "give 2-3 specific improvements and a short improved version. Use simple formatting. " +
    "Keep answers focused and never overly long.";

  const history = [];

  AI.mountKeyPanel(document.getElementById('keyPanel'));

  function add(text, who, extraClass) {
    const el = document.createElement('div');
    el.className = 'msg ' + who + (extraClass ? ' ' + extraClass : '');
    el.textContent = text;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }

  // greeting
  add("👋 Hi! I'm your AI IELTS tutor. Paste an essay for feedback, ask for a model answer, or pick a shortcut above to get started.", 'ai');

  const box = document.getElementById('chatBox');
  const sendBtn = document.getElementById('sendBtn');

  async function send(text) {
    text = (text || box.value).trim();
    if (!text) return;
    if (!AI.hasKey()) {
      add('Please connect your Gemini API key above first — it only takes a moment and keys are free from Google AI Studio.', 'ai');
      document.getElementById('keyPanel').scrollIntoView({ behavior: 'smooth' });
      return;
    }
    add(text, 'user');
    box.value = '';
    sendBtn.disabled = true;
    const thinking = add('Thinking…', 'ai', 'think');

    try {
      const reply = await AI.generate(text, { system: SYSTEM, history, temperature: 0.7 });
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
  box.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });
  document.getElementById('chips').addEventListener('click', (e) => {
    const chip = e.target.closest('.chip'); if (!chip) return;
    send(chip.dataset.p);
  });
})();
