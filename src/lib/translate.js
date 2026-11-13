// Site-wide translation via the Google Website Translator, driven by our own
// language selector (src/components/LanguageSelect.jsx).
//
// - The chosen language is stored in the `googtrans` cookie (what Google reads
//   on start-up) and in localStorage, so it stays active across page
//   navigation and reloads.
// - Google watches the DOM, so content React renders after a route change is
//   translated automatically.
// - Hindi is deliberately NOT offered (client requirement).
// - Switching back to English clears the cookie and reloads - Google's own
//   "restore original" is unreliable inside a React app.

export const LANGS = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "pt", label: "Português" },
  { code: "ru", label: "Русский" },
  { code: "tr", label: "Türkçe" },
  { code: "zh-CN", label: "中文 (简体)" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "th", label: "ไทย" },
  { code: "id", label: "Bahasa Indonesia" },
  { code: "ms", label: "Bahasa Melayu" },
];

const CODES = LANGS.map((l) => l.code);
const STORE_KEY = "nt-lang";
const SCRIPT_ID = "google-translate-script";
const HOST_ID = "google_translate_element";

function readCookieLang() {
  const m = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]*\/([^;]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}

export function getLang() {
  let saved = null;
  try {
    saved = localStorage.getItem(STORE_KEY);
  } catch {
    /* storage blocked - fall back to the cookie */
  }
  const lang = saved || readCookieLang() || "en";
  return CODES.includes(lang) ? lang : "en";
}

function writeCookie(value, expire) {
  const host = window.location.hostname;
  const exp = expire ? "; expires=Thu, 01 Jan 1970 00:00:00 GMT" : "";
  const v = expire ? "" : value;
  document.cookie = `googtrans=${v}; path=/${exp}`;
  // Google may also set the cookie on the bare/dotted domain - cover both.
  if (host.includes(".")) {
    document.cookie = `googtrans=${v}; path=/; domain=${host}${exp}`;
    document.cookie = `googtrans=${v}; path=/; domain=.${host.replace(/^www\./, "")}${exp}`;
  }
}

function loadGoogle() {
  if (document.getElementById(SCRIPT_ID)) return;
  if (!document.getElementById(HOST_ID)) {
    const host = document.createElement("div");
    host.id = HOST_ID;
    host.style.display = "none";
    document.body.appendChild(host);
  }
  window.__ntTranslateInit = () => {
    // eslint-disable-next-line no-undef
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: CODES.join(","),
        autoDisplay: false,
      },
      HOST_ID,
    );
  };
  const s = document.createElement("script");
  s.id = SCRIPT_ID;
  s.src =
    "https://translate.google.com/translate_a/element.js?cb=__ntTranslateInit";
  s.async = true;
  document.body.appendChild(s);
}

// Push the language into Google's hidden <select> once it exists.
function applyToCombo(lang, tries = 0) {
  const combo = document.querySelector(".goog-te-combo");
  if (combo) {
    if (combo.value !== lang) {
      combo.value = lang;
      combo.dispatchEvent(new Event("change"));
    }
    return;
  }
  if (tries < 60) setTimeout(() => applyToCombo(lang, tries + 1), 150);
}

function setDocLang(lang) {
  document.documentElement.lang = lang;
}

// Called once on start-up: re-applies a saved non-English language.
export function initTranslate() {
  const lang = getLang();
  setDocLang(lang);
  if (lang !== "en") {
    writeCookie(`/en/${lang}`);
    loadGoogle();
    applyToCombo(lang);
  }
}

export function setLang(lang) {
  if (!CODES.includes(lang)) return;
  try {
    localStorage.setItem(STORE_KEY, lang);
  } catch {
    /* cookie still carries the choice */
  }
  if (lang === "en") {
    writeCookie("", true);
    window.location.reload();
    return;
  }
  writeCookie(`/en/${lang}`);
  setDocLang(lang);
  loadGoogle();
  applyToCombo(lang);
}
