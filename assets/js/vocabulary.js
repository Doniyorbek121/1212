/* Vocabulary flashcards */
(function () {
  'use strict';
  const flash = document.getElementById('flash');
  if (!flash) return;

  const DECKS = {
    'Environment': [
      { w: 'sustainable', p: 'adjective', d: 'able to continue over time without damaging the environment', e: 'Governments are promoting sustainable sources of energy such as wind and solar.' },
      { w: 'deforestation', p: 'noun', d: 'the cutting down of forests over a large area', e: 'Deforestation is a major cause of the loss of wildlife habitats.' },
      { w: 'carbon footprint', p: 'noun phrase', d: 'the amount of carbon dioxide a person or activity produces', e: 'Cycling to work is a simple way to reduce your carbon footprint.' },
      { w: 'biodiversity', p: 'noun', d: 'the variety of plant and animal life in a habitat', e: 'Tropical rainforests contain the greatest biodiversity on Earth.' },
      { w: 'renewable', p: 'adjective', d: 'a source of energy that is naturally replaced and will not run out', e: 'Solar power is a clean, renewable form of energy.' },
    ],
    'Education': [
      { w: 'curriculum', p: 'noun', d: 'the subjects that make up a course of study', e: 'Critical thinking should be part of every school curriculum.' },
      { w: 'literacy', p: 'noun', d: 'the ability to read and write', e: 'Improving adult literacy can transform a community.' },
      { w: 'vocational', p: 'adjective', d: 'relating to skills for a particular job or trade', e: 'Vocational training prepares students for practical careers.' },
      { w: 'rote learning', p: 'noun phrase', d: 'memorising information through repetition rather than understanding', e: 'Rote learning is less effective than active problem solving.' },
      { w: 'scholarship', p: 'noun', d: 'money given to a student to help pay for education', e: 'She won a full scholarship to study abroad.' },
    ],
    'Technology': [
      { w: 'innovation', p: 'noun', d: 'a new idea, method or device', e: 'Constant innovation keeps the technology industry moving forward.' },
      { w: 'automation', p: 'noun', d: 'the use of machines to do work previously done by people', e: 'Automation has increased efficiency but reduced some jobs.' },
      { w: 'cutting-edge', p: 'adjective', d: 'the most advanced and modern', e: 'The laboratory uses cutting-edge equipment for its research.' },
      { w: 'digital divide', p: 'noun phrase', d: 'the gap between those with and without access to technology', e: 'The pandemic highlighted the digital divide in education.' },
      { w: 'obsolete', p: 'adjective', d: 'no longer used because something newer exists', e: 'Smartphones have made many older devices obsolete.' },
    ],
    'Health': [
      { w: 'sedentary', p: 'adjective', d: 'involving a lot of sitting and little exercise', e: 'A sedentary lifestyle can lead to serious health problems.' },
      { w: 'well-being', p: 'noun', d: 'the state of being healthy and comfortable', e: 'Regular exercise improves both physical and mental well-being.' },
      { w: 'epidemic', p: 'noun', d: 'a widespread occurrence of a disease in a community', e: 'Obesity has been described as a modern epidemic.' },
      { w: 'preventive', p: 'adjective', d: 'designed to stop something bad from happening', e: 'Preventive healthcare reduces long-term medical costs.' },
      { w: 'nutritious', p: 'adjective', d: 'containing substances that keep you healthy', e: 'A balanced, nutritious diet is essential for children.' },
    ],
    'Work': [
      { w: 'remuneration', p: 'noun', d: 'money paid for work or services', e: 'The job offers generous remuneration and benefits.' },
      { w: 'burnout', p: 'noun', d: 'extreme tiredness caused by too much work', e: 'Long hours without rest can lead to burnout.' },
      { w: 'entrepreneur', p: 'noun', d: 'a person who sets up a business, taking financial risks', e: 'Young entrepreneurs are driving the tech economy.' },
      { w: 'redundancy', p: 'noun', d: 'the situation of losing a job because it is no longer needed', e: 'Automation has led to redundancies in some factories.' },
      { w: 'work-life balance', p: 'noun phrase', d: 'the division of time between work and personal life', e: 'Flexible hours help employees achieve a better work-life balance.' },
    ],
  };

  const topics = Object.keys(DECKS);
  let topic = topics[0], idx = 0, deck = DECKS[topic].slice();

  const tabs = document.getElementById('topicTabs');
  tabs.innerHTML = topics.map((t, i) => `<button class="tab ${i === 0 ? 'active' : ''}" data-topic="${t}">${t}</button>`).join('');

  function render() {
    const c = deck[idx];
    flash.classList.remove('flip');
    document.getElementById('fWord').textContent = c.w;
    document.getElementById('fPos').textContent = c.p;
    document.getElementById('fDef').textContent = c.d;
    document.getElementById('fEx').textContent = '“' + c.e + '”';
    document.getElementById('counter').textContent = (idx + 1) + ' / ' + deck.length;
  }

  tabs.addEventListener('click', (e) => {
    const b = e.target.closest('.tab'); if (!b) return;
    tabs.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    b.classList.add('active');
    topic = b.dataset.topic; deck = DECKS[topic].slice(); idx = 0; render();
  });

  flash.querySelector('.flash-inner').addEventListener('click', () => flash.classList.toggle('flip'));
  document.getElementById('nextCard').addEventListener('click', () => { idx = (idx + 1) % deck.length; render(); });
  document.getElementById('prevCard').addEventListener('click', () => { idx = (idx - 1 + deck.length) % deck.length; render(); });
  document.getElementById('shuffleBtn').addEventListener('click', () => {
    for (let i = deck.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [deck[i], deck[j]] = [deck[j], deck[i]]; }
    idx = 0; render();
  });
  document.getElementById('speakCard').addEventListener('click', () => {
    if (!window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(deck[idx].w + '. ' + deck[idx].e);
    u.rate = 0.9; speechSynthesis.cancel(); speechSynthesis.speak(u);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') document.getElementById('nextCard').click();
    if (e.key === 'ArrowLeft') document.getElementById('prevCard').click();
    if (e.key === ' ') { e.preventDefault(); flash.classList.toggle('flip'); }
  });

  render();
})();
