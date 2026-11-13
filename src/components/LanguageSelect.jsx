// GTranslate-style "dropdown with flags" language selector.
// Used in the top strip (dark) and the mobile drawer footer (light, opens
// upward). Translation itself runs through src/lib/translate.js (the Google
// Website Translator — the same engine GTranslate's free widget uses).
// translate="no" keeps Google from translating the language names.
import { useEffect, useRef, useState } from 'react';
import { LANGS, getLang, setLang } from '../lib/translate';

const flagSrc = (cc) => `https://flagcdn.com/w40/${cc}.png`;

export default function LanguageSelect({ variant = '' }) {
  const [lang, setLocal] = useState(getLang);
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const current = LANGS.find((l) => l.code === lang) || LANGS[0];

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const choose = (code) => {
    setOpen(false);
    if (code === lang) return;
    setLocal(code);
    setLang(code);
  };

  return (
    <div
      ref={rootRef}
      className={
        'gt-dd notranslate' + (variant ? ' gt-' + variant : '') + (open ? ' is-open' : '')
      }
      translate="no"
    >
      <button
        type="button"
        className="gt-current"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={'Language: ' + current.label}
        onClick={() => setOpen((v) => !v)}
      >
        <img src={flagSrc(current.flag)} alt="" width="20" height="15" />
        <span className="gt-name">{current.label}</span>
        <span className="gt-caret" aria-hidden="true" />
      </button>
      {open && (
        <ul className="gt-list" role="listbox" aria-label="Choose language">
          {LANGS.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={l.code === lang}
                className={l.code === lang ? 'active' : undefined}
                onClick={() => choose(l.code)}
              >
                <img src={flagSrc(l.flag)} alt="" width="20" height="15" loading="lazy" />
                <span>{l.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
