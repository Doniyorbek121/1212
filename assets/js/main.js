/* =========================================================
   IELTS Master — shared site JS
   Navbar, theme toggle, mobile menu, scroll reveal, FAQ,
   and injected header/footer so every page stays in sync.
   ========================================================= */
(function () {
  'use strict';

  /* ---- Theme (persisted) ---- */
  const root = document.documentElement;
  const saved = localStorage.getItem('ielts-theme');
  if (saved) root.setAttribute('data-theme', saved);
  else if (window.matchMedia('(prefers-color-scheme: dark)').matches) root.setAttribute('data-theme', 'dark');

  window.toggleTheme = function () {
    const now = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', now);
    localStorage.setItem('ielts-theme', now);
    updateThemeIcon();
  };
  function updateThemeIcon() {
    const btns = document.querySelectorAll('[data-theme-icon]');
    const dark = root.getAttribute('data-theme') === 'dark';
    btns.forEach(b => b.textContent = dark ? '☀️' : '🌙');
  }

  /* ---- Shared header ---- */
  const NAV = [
    ['index.html', 'Home'],
    ['courses.html', 'Courses'],
    ['practice.html', 'Practice'],
    ['ai-tutor.html', 'AI Tutor'],
    ['vocabulary.html', 'Vocabulary'],
    ['calculator.html', 'Band Score'],
    ['about.html', 'About'],
  ];

  function currentPage() {
    const p = location.pathname.split('/').pop();
    return p === '' ? 'index.html' : p;
  }

  function buildHeader() {
    const mount = document.getElementById('site-header');
    if (!mount) return;
    const cur = currentPage();
    const links = NAV.map(([href, label]) =>
      `<li><a href="${href}" class="${href === cur ? 'active' : ''}">${label}</a></li>`).join('');
    mount.innerHTML = `
      <nav class="nav">
        <div class="container nav-inner">
          <a class="brand" href="index.html">
            <span class="brand-mark">iM</span> IELTS<span class="text-grad">Master</span>
          </a>
          <ul class="nav-links" id="navLinks">${links}
            <li class="nav-cta-mobile" style="margin-top:8px;"><a href="practice.html" class="btn btn-primary btn-block">Start practising</a></li>
          </ul>
          <div class="nav-right">
            <button class="icon-btn" data-theme-icon onclick="toggleTheme()" aria-label="Toggle theme">🌙</button>
            <a href="practice.html" class="btn btn-primary hide-sm">Start free</a>
            <button class="icon-btn nav-toggle" id="navToggle" aria-label="Menu">☰</button>
          </div>
        </div>
      </nav>`;
    const toggle = document.getElementById('navToggle');
    const nl = document.getElementById('navLinks');
    toggle && toggle.addEventListener('click', () => nl.classList.toggle('open'));
    nl && nl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nl.classList.remove('open')));
    updateThemeIcon();
    // hide the desktop CTA on small screens via inline media handled by class
  }

  function buildFooter() {
    const mount = document.getElementById('site-footer');
    if (!mount) return;
    mount.innerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <a class="brand" href="index.html" style="margin-bottom:14px;">
                <span class="brand-mark">iM</span> IELTS<span class="text-grad">Master</span>
              </a>
              <p style="max-width:320px;">The complete platform to prepare for IELTS Academic & General Training — practice all four skills, track your band, and study smarter.</p>
              <div class="flex gap-sm" style="margin-top:6px;">
                <a class="icon-btn" href="#" aria-label="Telegram">✈️</a>
                <a class="icon-btn" href="#" aria-label="Instagram">📸</a>
                <a class="icon-btn" href="#" aria-label="YouTube">▶️</a>
              </div>
            </div>
            <div>
              <h4>Learn</h4>
              <ul>
                <li><a href="courses.html">Reading</a></li>
                <li><a href="courses.html">Listening</a></li>
                <li><a href="courses.html">Writing</a></li>
                <li><a href="courses.html">Speaking</a></li>
              </ul>
            </div>
            <div>
              <h4>Practice</h4>
              <ul>
                <li><a href="reading.html">Reading test</a></li>
                <li><a href="listening.html">Listening test</a></li>
                <li><a href="writing.html">Writing task</a></li>
                <li><a href="speaking.html">Speaking cue cards</a></li>
                <li><a href="ai-tutor.html">AI Tutor (Gemini)</a></li>
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                <li><a href="about.html">About us</a></li>
                <li><a href="about.html#contact">Contact</a></li>
                <li><a href="calculator.html">Band calculator</a></li>
                <li><a href="vocabulary.html">Vocabulary</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© ${new Date().getFullYear()} IELTS Master. Built for learners worldwide.</span>
            <span>Not affiliated with the British Council, IDP, or Cambridge Assessment English.</span>
          </div>
        </div>
      </footer>`;
  }

  /* ---- Scroll reveal ---- */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !els.length) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver((ents) => {
      ents.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .12 });
    els.forEach(e => io.observe(e));
  }

  /* ---- FAQ accordion (event delegation) ---- */
  function initFaq() {
    document.addEventListener('click', (e) => {
      const q = e.target.closest('.faq-q');
      if (!q) return;
      const item = q.closest('.faq-item');
      const a = item.querySelector('.faq-a');
      const open = item.classList.toggle('open');
      a.style.maxHeight = open ? a.scrollHeight + 'px' : 0;
    });
  }

  /* ---- Animated counters ---- */
  function initCounters() {
    const nums = document.querySelectorAll('[data-count]');
    if (!nums.length) return;
    const io = new IntersectionObserver((ents) => {
      ents.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target, target = parseFloat(el.dataset.count), suf = el.dataset.suffix || '';
        const dec = (target % 1 !== 0) ? 1 : 0;
        let cur = 0; const step = target / 60;
        const t = setInterval(() => {
          cur += step;
          if (cur >= target) { cur = target; clearInterval(t); }
          el.textContent = cur.toFixed(dec) + suf;
        }, 18);
        io.unobserve(el);
      });
    }, { threshold: .6 });
    nums.forEach(n => io.observe(n));
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildHeader();
    buildFooter();
    initReveal();
    initFaq();
    initCounters();
  });
})();
