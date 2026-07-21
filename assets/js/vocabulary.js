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
    'Crime & Law': [
      { w: 'deterrent', p: 'noun', d: 'something that discourages an action, such as crime', e: 'Long prison sentences are intended to act as a deterrent.' },
      { w: 'rehabilitation', p: 'noun', d: 'helping an offender return to normal life in society', e: 'Prisons should focus on rehabilitation, not just punishment.' },
      { w: 'offence', p: 'noun', d: 'an illegal act; a crime', e: 'Driving without a licence is a serious offence.' },
      { w: 'surveillance', p: 'noun', d: 'close watching of a person or place', e: 'CCTV surveillance has increased in most city centres.' },
      { w: 'lenient', p: 'adjective', d: 'not strict; giving mild punishment', e: 'Some argue that courts are too lenient with young offenders.' },
    ],
    'Travel & Tourism': [
      { w: 'itinerary', p: 'noun', d: 'a planned route or schedule for a journey', e: 'Our itinerary included three cities in five days.' },
      { w: 'ecotourism', p: 'noun', d: 'tourism that aims to protect the natural environment', e: 'Ecotourism can fund the conservation of rainforests.' },
      { w: 'off the beaten track', p: 'idiom', d: 'in a place far from where people usually go', e: 'We prefer villages that are off the beaten track.' },
      { w: 'excursion', p: 'noun', d: 'a short trip, usually for pleasure', e: 'The hotel organises daily excursions to nearby ruins.' },
      { w: 'seasonal', p: 'adjective', d: 'happening or popular at a particular time of year', e: 'Many coastal towns rely on seasonal tourism.' },
    ],
    'Money & Economy': [
      { w: 'recession', p: 'noun', d: 'a period when the economy shrinks', e: 'Unemployment usually rises during a recession.' },
      { w: 'disposable income', p: 'noun phrase', d: 'money left after paying taxes and essentials', e: 'Higher wages give families more disposable income.' },
      { w: 'inflation', p: 'noun', d: 'a general rise in prices over time', e: 'Rising inflation reduces the value of savings.' },
      { w: 'subsidy', p: 'noun', d: 'money given by a government to support an industry', e: 'Farming subsidies keep food prices low.' },
      { w: 'frugal', p: 'adjective', d: 'careful about spending money', e: 'Being frugal in your twenties helps you save for the future.' },
    ],
    'Media & Culture': [
      { w: 'censorship', p: 'noun', d: 'the control or banning of information in the media', e: 'Strict censorship limits what journalists can report.' },
      { w: 'stereotype', p: 'noun', d: 'a fixed, oversimplified idea about a group', e: 'Advertising often reinforces gender stereotypes.' },
      { w: 'influential', p: 'adjective', d: 'having a strong effect on people or events', e: 'Social media influencers are increasingly influential.' },
      { w: 'heritage', p: 'noun', d: 'traditions and buildings passed down from the past', e: 'Old towns are protected as part of our cultural heritage.' },
      { w: 'mainstream', p: 'adjective', d: 'accepted by or belonging to the majority', e: 'Streaming has moved from niche to mainstream.' },
    ],
    'Science & Space': [
      { w: 'hypothesis', p: 'noun', d: 'an idea suggested as a starting point for research', e: 'The experiment was designed to test their hypothesis.' },
      { w: 'breakthrough', p: 'noun', d: 'an important discovery or development', e: 'The vaccine was a major medical breakthrough.' },
      { w: 'orbit', p: 'noun/verb', d: 'the curved path of an object around a star or planet', e: 'The satellite completes one orbit every ninety minutes.' },
      { w: 'phenomenon', p: 'noun', d: 'a fact or event observed to happen', e: 'The northern lights are a natural phenomenon.' },
      { w: 'empirical', p: 'adjective', d: 'based on observation or experiment, not theory', e: 'Scientists rely on empirical evidence, not opinion.' },
    ],
  };

  // merge in any custom decks created from the admin panel
  try {
    const custom = JSON.parse(localStorage.getItem('ielts-custom-vocab') || '{}');
    Object.keys(custom).forEach(t => {
      if (Array.isArray(custom[t]) && custom[t].length) DECKS['⭐ ' + t] = custom[t];
    });
  } catch (e) {}

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
