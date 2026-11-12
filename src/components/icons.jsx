// Gold line icons — verbatim paths from the old static site's header and
// footer. Every icon shares the same <svg> attributes (24x24, no fill,
// #c9a227 stroke, width 2, round caps/joins); only the paths differ.
// MIcon renders the .m-ico wrapper (header + mega menus); FIcon renders
// the .f-ico wrapper (footer). Page agents: reuse these for any icon the
// old page already had — do not redraw or restyle them.

const ICON_PATHS = {
  trading: (
    <>
      <path d="M7 3v4M7 17v4M17 3v4M17 17v4" />
      <rect x="5" y="7" width="4" height="10" rx="1" />
      <rect x="15" y="7" width="4" height="10" rx="1" />
    </>
  ),
  discover: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
    </>
  ),
  promotions: (
    <>
      <rect x="3.5" y="8" width="17" height="4" />
      <path d="M12 8v13M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7M12 8s-1.5-4.5-4.5-4.5C5 3.5 5 8 12 8zm0 0s1.5-4.5 4.5-4.5C19 3.5 19 8 12 8z" />
    </>
  ),
  company: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M9 21v-4h6v4M8 7h2M14 7h2M8 11h2M14 11h2" />
    </>
  ),
  accounts: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M2.5 10h19M6 15h4" />
    </>
  ),
  demo: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5l5 3.5-5 3.5z" />
    </>
  ),
  islamic: <path d="M20 13.5A8.5 8.5 0 1 1 10.5 4 6.8 6.8 0 0 0 20 13.5z" />,
  forex: <path d="M4 7h13M17 4l3 3-3 3M20 17H7M7 14l-3 3 3 3" />,
  metals: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v5c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 11v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" />
    </>
  ),
  indices: <path d="M3 21h18M7 21v-7M12 21V8M17 21v-4" />,
  crypto: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 8h3.5a2.5 2.5 0 0 1 0 5H9.5zM9.5 13H13a2.5 2.5 0 0 1 0 5H9.5zM11 6v2M11 16v2M13.5 6v2M13.5 16v2" />
    </>
  ),
  energies: (
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  ),
  mt5: (
    <>
      <rect x="2.5" y="4" width="19" height="12" rx="2" />
      <path d="M8 20h8M12 16v4M7 12l2.5-3 2 2 3-4" />
    </>
  ),
  platforms: (
    <>
      <rect x="2" y="5" width="13" height="10" rx="2" />
      <rect x="16" y="9" width="6" height="11" rx="1.5" />
    </>
  ),
  deposits: <path d="M7 4v13M7 4L3.5 7.5M7 4l3.5 3.5M17 20V7M17 20l3.5-3.5M17 20l-3.5-3.5" />,
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M5.6 5.6l3.2 3.2M15.2 15.2l3.2 3.2M18.4 5.6l-3.2 3.2M8.8 15.2l-3.2 3.2" />
    </>
  ),
  education: (
    <>
      <path d="M2.5 9.5L12 5l9.5 4.5L12 14 2.5 9.5z" />
      <path d="M6.5 11.5V16c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-4.5M21 9.5V15" />
    </>
  ),
  live: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <path d="M10 9.5l5 2.5-5 2.5z" />
    </>
  ),
  blog: (
    <>
      <rect x="3" y="5" width="15" height="14" rx="2" />
      <path d="M18 9h2.5v8a2 2 0 0 1-2 2M7 9.5h6M7 13.5h6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  calculators: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" />
    </>
  ),
  about: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
  regulation: (
    <>
      <path d="M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  contact: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7.5l9 6 9-6" />
    </>
  ),
  faq: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 4 2c-.8.8-1.5 1-1.5 2.2M12 17h.01" />
    </>
  ),
  login: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="10" r="3.2" />
      <path d="M6 19c1-3 3.2-4.5 6-4.5s5 1.5 6 4.5" />
    </>
  ),
  arrow: <path d="M4 12h15M13 6l6 6-6 6" />,
};

function Svg({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#c9a227"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

export function MIcon({ name }) {
  return (
    <span className="m-ico">
      <Svg name={name} />
    </span>
  );
}

export function FIcon({ name }) {
  return (
    <span className="f-ico">
      <Svg name={name} />
    </span>
  );
}
