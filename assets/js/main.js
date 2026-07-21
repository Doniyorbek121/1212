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
    ['dashboard.html', 'Dashboard'],
    ['ai-tutor.html', 'AI Tutor'],
    ['plan.html', 'Study Plan'],
    ['vocabulary.html', 'Vocabulary'],
    ['about.html', 'About'],
  ];

  function currentPage() {
    const p = location.pathname.split('/').pop();
    return p === '' ? 'index.html' : p;
  }

  // Brand name (admin can override via localStorage 'ielts-brand').
  function brandHTML() {
    const custom = (localStorage.getItem('ielts-brand') || '').trim();
    if (!custom) return 'IELTS<span class="text-grad">Master</span>';
    const parts = custom.split(/\s+/);
    if (parts.length === 1) return '<span class="text-grad">' + parts[0] + '</span>';
    return parts[0] + '<span class="text-grad">' + parts.slice(1).join(' ') + '</span>';
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
            <span class="brand-mark">iM</span> ${brandHTML()}
          </a>
          <ul class="nav-links" id="navLinks">${links}
            <li class="nav-cta-mobile" style="margin-top:8px;"><a href="practice.html" class="btn btn-primary btn-block">Start practising</a></li>
          </ul>
          <div class="nav-right">
            <button class="btn btn-ghost hide-sm" id="installBtn" style="display:none;">⬇ Install app</button>
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
                <span class="brand-mark">iM</span> ${brandHTML()}
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
              <h4>More</h4>
              <ul>
                <li><a href="plan.html">Study plan generator</a></li>
                <li><a href="resources.html">Tips &amp; resources</a></li>
                <li><a href="dashboard.html">My dashboard</a></li>
                <li><a href="calculator.html">Band calculator</a></li>
                <li><a href="about.html">About us</a></li>
                <li><a href="about.html#contact">Contact</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© ${new Date().getFullYear()} IELTS Master. Built for learners worldwide. · <a href="#" onclick="startTour();return false;" style="color:var(--text-mut);">Take a tour</a></span>
            <span>Not affiliated with the British Council, IDP, or Cambridge Assessment English. · <a href="admin.html" style="color:var(--text-mut);">Admin</a></span>
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
    }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(e => io.observe(e));
    // safety net: never leave content permanently hidden if the observer misfires
    setTimeout(() => els.forEach(e => e.classList.add('in')), 2500);
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

  /* ---- PWA: inject manifest + theme color, register service worker ---- */
  function initPWA() {
    if (!document.querySelector('link[rel="manifest"]')) {
      const link = document.createElement('link');
      link.rel = 'manifest'; link.href = 'manifest.json';
      document.head.appendChild(link);
    }
    if (!document.querySelector('meta[name="theme-color"]')) {
      const meta = document.createElement('meta');
      meta.name = 'theme-color'; meta.content = '#2f6bf6';
      document.head.appendChild(meta);
    }
    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
    // install prompt
    let deferred = null;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault(); deferred = e;
      const btn = document.getElementById('installBtn');
      if (btn) {
        btn.style.display = '';
        btn.addEventListener('click', async () => {
          if (!deferred) return;
          deferred.prompt();
          await deferred.userChoice;
          deferred = null; btn.style.display = 'none';
        });
      }
    });
  }

  /* ---- SEO: Open Graph, Twitter card, canonical, structured data ---- */
  function initSEO() {
    const head = document.head;
    const desc = (document.querySelector('meta[name="description"]') || {}).content || 'Prepare for IELTS with real practice tests, band scores and an AI tutor.';
    const title = document.title;
    function meta(attr, key, val) {
      if (head.querySelector(`meta[${attr}="${key}"]`)) return;
      const m = document.createElement('meta'); m.setAttribute(attr, key); m.content = val; head.appendChild(m);
    }
    meta('property', 'og:title', title);
    meta('property', 'og:description', desc);
    meta('property', 'og:type', 'website');
    meta('property', 'og:site_name', 'IELTS Master');
    meta('name', 'twitter:card', 'summary_large_image');
    meta('name', 'twitter:title', title);
    meta('name', 'twitter:description', desc);
    if (!head.querySelector('link[rel="canonical"]')) {
      const l = document.createElement('link'); l.rel = 'canonical'; l.href = location.href.split('#')[0]; head.appendChild(l);
    }
    if (!document.getElementById('ld-json')) {
      const s = document.createElement('script'); s.type = 'application/ld+json'; s.id = 'ld-json';
      s.textContent = JSON.stringify({
        '@context': 'https://schema.org', '@type': 'EducationalOrganization',
        name: 'IELTS Master',
        description: 'A complete IELTS preparation platform with practice tests, band-score tools and an AI tutor.',
        educationalCredentialAwarded: 'IELTS preparation',
        sameAs: [],
      });
      head.appendChild(s);
    }
  }

  /* ---- Onboarding tour ---- */
  const TOUR = [
    { e: '👋', t: 'Welcome to IELTS Master', p: 'Your all-in-one platform to prepare for IELTS Academic & General Training — completely in your browser.' },
    { e: '📝', t: 'Practise all four skills', p: 'Take full-length Reading & Listening mocks, write essays, and rehearse Speaking — every test is self-marking with instant bands.' },
    { e: '🤖', t: 'Meet your AI tutor', p: 'Chat with a Gemini-powered tutor that speaks your language — pick a personality from gentle to a savage tough-love coach.' },
    { e: '📊', t: 'Track your progress', p: 'Your dashboard charts your band over time, and the Study Plan generator builds a week-by-week roadmap to your target.' },
    { e: '🚀', t: 'Ready to begin?', p: 'Jump into a free practice test now — your target band is closer than you think!' },
  ];

  function buildTour() {
    if (document.getElementById('tourOverlay')) return;
    const ov = document.createElement('div');
    ov.className = 'tour-overlay'; ov.id = 'tourOverlay';
    ov.innerHTML = `<div class="tour-card">
      <div class="tour-emoji" id="tourEmoji"></div>
      <h3 id="tourTitle"></h3><p id="tourText"></p>
      <div class="tour-dots" id="tourDots"></div>
      <div class="tour-actions">
        <button class="tour-skip" id="tourSkip">Skip</button>
        <button class="btn btn-primary" id="tourNext">Next →</button>
      </div></div>`;
    document.body.appendChild(ov);
    let i = 0;
    const paint = () => {
      const s = TOUR[i];
      document.getElementById('tourEmoji').textContent = s.e;
      document.getElementById('tourTitle').textContent = s.t;
      document.getElementById('tourText').textContent = s.p;
      document.getElementById('tourDots').innerHTML = TOUR.map((_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join('');
      document.getElementById('tourNext').textContent = i === TOUR.length - 1 ? 'Start practising →' : 'Next →';
    };
    const close = () => { ov.classList.remove('show'); localStorage.setItem('ielts-onboarded', '1'); };
    document.getElementById('tourSkip').addEventListener('click', close);
    document.getElementById('tourNext').addEventListener('click', () => {
      if (i < TOUR.length - 1) { i++; paint(); }
      else { close(); location.href = 'practice.html'; }
    });
    ov.addEventListener('click', e => { if (e.target === ov) close(); });
    window.startTour = () => { i = 0; paint(); ov.classList.add('show'); };
    paint();
  }

  function maybeTour() {
    buildTour();
    if (!localStorage.getItem('ielts-onboarded') && currentPage() === 'index.html') {
      setTimeout(() => window.startTour(), 700);
    }
  }

  /* ---- Scroll to top ---- */
  function initToTop() {
    const btn = document.createElement('button');
    btn.className = 'to-top'; btn.id = 'toTop'; btn.setAttribute('aria-label', 'Back to top'); btn.textContent = '↑';
    document.body.appendChild(btn);
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > 500), { passive: true });
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildHeader();
    buildFooter();
    initReveal();
    initFaq();
    initCounters();
    initPWA();
    initSEO();
    maybeTour();
    initToTop();
  });
})();
