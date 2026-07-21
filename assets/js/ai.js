/* =========================================================
   Gemini AI client — shared across the site.
   The user supplies their OWN Google Gemini API key, which is
   stored only in their browser (localStorage) and sent directly
   to Google's API. It is never sent to our servers.
   ========================================================= */
(function () {
  'use strict';

  const KEY_STORE = 'ielts-gemini-key';
  const MODEL_STORE = 'ielts-gemini-model';
  const DEFAULT_MODEL = 'gemini-2.5-flash';

  const AI = {
    getKey() { return localStorage.getItem(KEY_STORE) || ''; },
    setKey(k) { localStorage.setItem(KEY_STORE, (k || '').trim()); },
    clearKey() { localStorage.removeItem(KEY_STORE); },
    hasKey() { return !!this.getKey(); },
    getModel() { return localStorage.getItem(MODEL_STORE) || DEFAULT_MODEL; },
    setModel(m) { localStorage.setItem(MODEL_STORE, m || DEFAULT_MODEL); },

    /**
     * Send a prompt to Gemini and return the text reply.
     * @param {string} prompt       user prompt / content
     * @param {object} opts         { system, history:[{role,text}], temperature }
     */
    async generate(prompt, opts = {}) {
      const key = this.getKey();
      if (!key) throw new Error('NO_KEY');
      const model = opts.model || this.getModel();
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;

      const contents = [];
      (opts.history || []).forEach(m => {
        contents.push({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.text }] });
      });
      contents.push({ role: 'user', parts: [{ text: prompt }] });

      const body = {
        contents,
        generationConfig: { temperature: opts.temperature ?? 0.7, maxOutputTokens: 1200 },
      };
      if (opts.system) {
        body.systemInstruction = { parts: [{ text: opts.system }] };
      }

      let res;
      try {
        res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      } catch (e) {
        throw new Error('NETWORK');
      }

      if (!res.ok) {
        let detail = '';
        try { const j = await res.json(); detail = j.error && j.error.message ? j.error.message : ''; } catch (e) {}
        if (res.status === 400 || res.status === 403) throw new Error('BAD_KEY:' + detail);
        if (res.status === 404) throw new Error('BAD_MODEL:' + detail);
        if (res.status === 429) throw new Error('RATE_LIMIT');
        throw new Error('HTTP_' + res.status + ':' + detail);
      }
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text).join('') || '';
      if (!text) throw new Error('EMPTY');
      return text.trim();
    },

    friendlyError(err) {
      const m = (err && err.message) || '';
      if (m === 'NO_KEY') return 'Please add your Gemini API key first.';
      if (m.startsWith('BAD_KEY')) return 'That API key looks invalid or lacks access. Double-check it in Google AI Studio.';
      if (m.startsWith('BAD_MODEL')) return 'That model is not available for your key. Try a different model in settings.';
      if (m === 'RATE_LIMIT') return 'Rate limit reached — wait a moment and try again.';
      if (m === 'NETWORK') return 'Network error — check your connection and try again.';
      if (m === 'EMPTY') return 'The model returned an empty response. Please try again.';
      return 'Something went wrong: ' + m;
    },
  };

  /* ---- Reusable API-key panel injector ----
     Call AI.mountKeyPanel(el) to render a key input into `el`. */
  AI.mountKeyPanel = function (el, onReady) {
    if (!el) return;
    function paint() {
      const has = AI.hasKey();
      el.innerHTML = `
        <div class="flex between items-center wrap gap">
          <div>
            <b>${has ? '🔑 Gemini connected' : '🔑 Connect your Gemini API key'}</b>
            <p class="small muted mb-0">${has
              ? 'Your key is stored only in this browser. AI features are ready.'
              : 'Free keys at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener" style="color:var(--brand-600);font-weight:700;">Google AI Studio</a>. Stored only in your browser.'}</p>
          </div>
          <div class="flex gap-sm items-center wrap">
            ${has ? '' : `<input class="field" id="__gkey" type="password" placeholder="Paste API key (AIza…)" style="min-width:230px;" autocomplete="off">`}
            <select class="field" id="__gmodel" style="max-width:170px;">
              <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
              <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
              <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
              <option value="gemini-flash-latest">Gemini Flash (latest)</option>
            </select>
            ${has
              ? '<button class="btn btn-ghost" id="__gclear">Disconnect</button>'
              : '<button class="btn btn-primary" id="__gsave">Save key</button>'}
          </div>
        </div>`;
      const modelSel = el.querySelector('#__gmodel');
      if (modelSel) {
        modelSel.value = AI.getModel();
        modelSel.addEventListener('change', () => AI.setModel(modelSel.value));
      }
      const save = el.querySelector('#__gsave');
      if (save) save.addEventListener('click', () => {
        const v = el.querySelector('#__gkey').value.trim();
        if (!v) { el.querySelector('#__gkey').focus(); return; }
        AI.setKey(v); paint(); onReady && onReady();
      });
      const clear = el.querySelector('#__gclear');
      if (clear) clear.addEventListener('click', () => {
        if (confirm('Disconnect and remove your saved API key from this browser?')) { AI.clearKey(); paint(); }
      });
    }
    paint();
  };

  window.AI = AI;
})();
