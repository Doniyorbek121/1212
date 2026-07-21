/* =========================================================
   Store — progress, test history & analytics (localStorage)
   Shared across every page. Keeps a full attempt history so
   the dashboard can show trends, streaks and per-skill stats.
   ========================================================= */
(function () {
  'use strict';

  const HISTORY = 'ielts-history';
  const LATEST = 'ielts-progress';   // kept for backward compatibility
  const GOAL = 'ielts-goal';
  const STREAK = 'ielts-streak';

  function read(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch (e) { return fallback; }
  }
  function write(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

  const Store = {
    /** Record a completed attempt. */
    record(skill, data) {
      const entry = Object.assign({ skill, date: Date.now() }, data);
      const hist = read(HISTORY, []);
      hist.push(entry);
      // cap history to last 200 entries
      if (hist.length > 200) hist.splice(0, hist.length - 200);
      write(HISTORY, hist);

      // latest-per-skill (back-compat with practice hub)
      const latest = read(LATEST, {});
      latest[skill] = { band: data.band, correct: data.correct, total: data.total, date: entry.date };
      write(LATEST, latest);

      this.touchStreak();
      return entry;
    },

    getHistory() { return read(HISTORY, []); },
    getLatestMap() { return read(LATEST, {}); },
    getLatest(skill) {
      const h = this.getHistory().filter(e => e.skill === skill);
      return h.length ? h[h.length - 1] : null;
    },
    getSkillSeries(skill) {
      return this.getHistory().filter(e => e.skill === skill && typeof e.band === 'number');
    },

    getStats() {
      const h = this.getHistory().filter(e => typeof e.band === 'number');
      const bands = h.map(e => e.band);
      const skills = [...new Set(h.map(e => e.skill))];
      const avg = bands.length ? bands.reduce((a, b) => a + b, 0) / bands.length : 0;
      const best = bands.length ? Math.max(...bands) : 0;
      // estimated overall = average of each skill's latest band
      const latestBands = skills.map(s => this.getLatest(s).band);
      const overall = latestBands.length
        ? this.roundBand(latestBands.reduce((a, b) => a + b, 0) / latestBands.length) : 0;
      return {
        totalTests: h.length,
        avgBand: avg,
        bestBand: best,
        overall,
        skillsPractised: skills.length,
        streak: this.getStreak(),
      };
    },

    roundBand(avg) {
      const whole = Math.floor(avg), frac = avg - whole;
      if (frac < 0.25) return whole;
      if (frac < 0.75) return whole + 0.5;
      return whole + 1;
    },

    /* ---- streak (consecutive days with activity) ---- */
    touchStreak() {
      const today = new Date().toDateString();
      const s = read(STREAK, { last: null, count: 0, best: 0 });
      if (s.last === today) return;
      const yesterday = new Date(Date.now() - 864e5).toDateString();
      s.count = (s.last === yesterday) ? s.count + 1 : 1;
      s.last = today;
      s.best = Math.max(s.best || 0, s.count);
      write(STREAK, s);
    },
    getStreak() {
      const s = read(STREAK, { last: null, count: 0, best: 0 });
      if (!s.last) return 0;
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 864e5).toDateString();
      return (s.last === today || s.last === yesterday) ? s.count : 0;
    },

    /* ---- study goal ---- */
    getGoal() { return read(GOAL, 7); },
    setGoal(g) { write(GOAL, g); },

    clearAll() {
      localStorage.removeItem(HISTORY);
      localStorage.removeItem(LATEST);
      localStorage.removeItem(STREAK);
    },

    /* ---- custom content (managed from the admin panel) ---- */
    getCustomVocab() { return read('ielts-custom-vocab', {}); },
    setCustomVocab(obj) { write('ielts-custom-vocab', obj); },
    getCustomPrompts() { return read('ielts-custom-prompts', []); },
    setCustomPrompts(arr) { write('ielts-custom-prompts', arr); },

    /* ---- branding / settings ---- */
    getBrand() { return localStorage.getItem('ielts-brand') || ''; },
    setBrand(name) { name ? localStorage.setItem('ielts-brand', name) : localStorage.removeItem('ielts-brand'); },

    /* ---- admin auth (client-side gate) ---- */
    _hash(s) { let h = 0; for (let i = 0; i < s.length; i++) { h = (h << 5) - h + s.charCodeAt(i); h |= 0; } return String(h); },
    hasAdminPass() { return !!localStorage.getItem('ielts-admin-pass'); },
    setAdminPass(p) { localStorage.setItem('ielts-admin-pass', this._hash(p)); },
    checkAdminPass(p) {
      const stored = localStorage.getItem('ielts-admin-pass');
      if (!stored) return false;
      return stored === this._hash(p);
    },

    /* ---- export / import everything ---- */
    exportAll() {
      const keys = ['ielts-history','ielts-progress','ielts-streak','ielts-goal','ielts-custom-vocab','ielts-custom-prompts','ielts-brand'];
      const out = {};
      keys.forEach(k => { const v = localStorage.getItem(k); if (v !== null) out[k] = v; });
      return JSON.stringify(out, null, 2);
    },
    importAll(json) {
      const data = JSON.parse(json);
      Object.keys(data).forEach(k => localStorage.setItem(k, data[k]));
    },
  };

  window.Store = Store;
})();
