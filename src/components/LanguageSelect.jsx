// Language selector (top strip, every page, desktop + mobile).
// translate="no" keeps Google from translating the language names themselves.
import { useState } from 'react';
import { LANGS, getLang, setLang } from '../lib/translate';

export default function LanguageSelect() {
  const [lang, setLocal] = useState(getLang);
  return (
    <label className="lang-select notranslate" translate="no">
      <svg
        viewBox="0 0 24 24"
        width="15"
        height="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
      </svg>
      <span className="sr-only">Language</span>
      <select
        value={lang}
        aria-label="Choose language"
        onChange={(e) => {
          setLocal(e.target.value);
          setLang(e.target.value);
        }}
      >
        {LANGS.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}
