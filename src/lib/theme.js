// Site colour theme: "dark" (default) or "light".
// The choice lives on <html data-theme="…"> and in localStorage. index.html
// sets the attribute with an inline script BEFORE first paint, so there is
// never a flash of the wrong theme; this module keeps React in sync and
// lets any component switch it.
import { useEffect, useState } from "react";

const KEY = "ntp-theme";
export const DEFAULT_THEME = "dark";
const listeners = new Set();

export function getTheme() {
  const t = document.documentElement.getAttribute("data-theme");
  return t === "light" || t === "dark" ? t : DEFAULT_THEME;
}

export function setTheme(theme) {
  const t = theme === "light" ? "light" : "dark";
  const root = document.documentElement;
  // Brief cross-fade of colours while switching (see .theme-switching).
  root.classList.add("theme-switching");
  root.setAttribute("data-theme", t);
  root.style.colorScheme = t;
  try {
    localStorage.setItem(KEY, t);
  } catch {
    /* storage blocked - the choice lasts for this page view only */
  }
  window.setTimeout(() => root.classList.remove("theme-switching"), 450);
  listeners.forEach((l) => l(t));
}

export function toggleTheme() {
  setTheme(getTheme() === "dark" ? "light" : "dark");
}

export function useTheme() {
  const [theme, set] = useState(getTheme);
  useEffect(() => {
    listeners.add(set);
    set(getTheme());
    return () => listeners.delete(set);
  }, []);
  return theme;
}
