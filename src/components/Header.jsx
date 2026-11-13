// Site header - markup ported exactly from the old index.html
// (<header class="site-header">), links converted to <Link> and pointed at
// the canonical routes (/markets/forex, not the /markets-forex alias).
//
// Behaviour - ported from the old script.js (lines ~14-72), as React state:
//  - Desktop (>1020px): menus open on :hover/:focus-within (CSS). Clicking a
//    parent item toggles: hover opens the menu before the first click, so
//    the first click only "claims" it, the second closes it (via
//    body.menus-suppressed, which beats the :hover rule), the third reopens
//    it. mousedown records whether the menu was suppressed BEFORE focusin
//    fires, so the click handler knows which way to toggle.
//  - Escape closes any open mega-menu (and the mobile nav).
//  - Clicking anywhere outside the nav closes open menus (desktop).
//  - Mobile (<=1020px): the ☰ button toggles .main-nav.open; tapping a
//    parent item toggles that item's .open class (accordion, one at a time).
//  - Navigating closes everything (the old site reloaded, so menus always
//    closed on navigation).
//
// Header actions: logged out, they are the index.html original (Login /
// Get Started). Logged in, they are the dashboard.html original
// ("Hi, <name>" + Log Out) - the old dashboard was the only page with that
// variant; in the SPA it follows the login state on every page.
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { asset } from "../lib/asset";
import { getUser, logout } from "../lib/auth";
import { MIcon } from "./icons";
import LanguageSelect from "./LanguageSelect";

const MENUS = [
  {
    id: "trading",
    label: "Trading",
    icon: "trading",
    columns: [
      {
        title: "Accounts",
        links: [
          {
            to: "/accounts",
            icon: "accounts",
            title: "Account Types",
            desc: "Standard, ECN, PRO, VIP, Islamic",
          },
          {
            to: "/demo-account",
            icon: "demo",
            title: "Demo Account",
            desc: "Practice with $10,000 virtual funds",
          },
          {
            to: "/islamic-accounts",
            icon: "islamic",
            title: "Islamic Accounts",
            desc: "Swap-free trading, no interest",
          },
        ],
      },
      {
        title: "Markets",
        links: [
          {
            to: "/markets/forex",
            icon: "forex",
            title: "Forex",
            desc: "60+ currency pairs",
          },
          {
            to: "/markets/metals",
            icon: "metals",
            title: "Metals",
            desc: "Gold, silver and more",
          },
          {
            to: "/markets/indices",
            icon: "indices",
            title: "Indices",
            desc: "US30, US500, NAS100",
          },
          {
            to: "/markets/crypto",
            icon: "crypto",
            title: "Crypto",
            desc: "Bitcoin, Ethereum and more",
          },
          {
            to: "/markets/energies",
            icon: "energies",
            title: "Energies",
            desc: "Oil and natural gas",
          },
        ],
      },
      {
        title: "Platforms",
        links: [
          {
            to: "/platforms/mt5",
            icon: "mt5",
            title: "MT5 Platform",
            desc: "MetaTrader 5 on every device",
          },
          {
            to: "/platforms",
            icon: "platforms",
            title: "All Platforms",
            desc: "Desktop, web and mobile",
          },
        ],
      },
      {
        title: "Support",
        links: [
          {
            to: "/deposits-withdrawals",
            icon: "deposits",
            title: "Deposits & Withdrawals",
            desc: "Fast, simple funding",
          },
          {
            to: "/help-centre",
            icon: "help",
            title: "Help Centre",
            desc: "Answers, 24/7",
          },
        ],
      },
    ],
  },
  {
    id: "discover",
    label: "Discover",
    icon: "discover",
    columns: [
      {
        title: "Education",
        links: [
          {
            to: "/education",
            icon: "education",
            title: "Learning Centre",
            desc: "Courses for every level",
          },
          {
            to: "/education#live",
            icon: "live",
            title: "Live Education",
            desc: "Live sessions and webinars",
          },
          {
            to: "/news-analysis",
            icon: "blog",
            title: "Blog",
            desc: "Market notes and guides",
          },
        ],
      },
      {
        title: "Tools",
        links: [
          {
            to: "/economic-calendar",
            icon: "calendar",
            title: "Economic Calendar",
            desc: "Events that move markets",
          },
          {
            to: "/calculators",
            icon: "calculators",
            title: "Calculators",
            desc: "Pip value and margin",
          },
          {
            to: "/news-analysis",
            icon: "blog",
            title: "News and Analysis",
            desc: "Daily market analysis",
          },
        ],
      },
    ],
  },
  {
    id: "promotions",
    label: "Promotions",
    icon: "promotions",
    to: "/promotions",
  },
  {
    id: "company",
    label: "Company",
    icon: "company",
    columns: [
      {
        title: "Company",
        links: [
          {
            to: "/about",
            icon: "about",
            title: "About NexTrade Prime",
            desc: "Who we are",
          },
          {
            to: "/regulation",
            icon: "regulation",
            title: "Regulation",
            desc: "How we protect your funds",
          },
          {
            to: "/contact",
            icon: "contact",
            title: "Contact Us",
            desc: "Talk to a real person",
          },
        ],
      },
      {
        title: "Support",
        links: [
          {
            to: "/help-centre",
            icon: "help",
            title: "Help Centre",
            desc: "Answers, 24/7",
          },
          { to: "/faq", icon: "faq", title: "FAQ", desc: "Common questions" },
        ],
      },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // mobile accordion (li.open)
  const clickOpenRef = useRef({});
  const wasSuppressedRef = useRef({});
  const navRef = useRef(null);
  const firstRenderRef = useRef(true);
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUser();

  const suppressMenus = useCallback(() => {
    document.body.classList.add("menus-suppressed");
    setOpenMenu(null);
    setMobileOpen(false);
    if (document.activeElement) document.activeElement.blur();
    clickOpenRef.current = {};
  }, []);

  const unsuppressMenus = useCallback(() => {
    document.body.classList.remove("menus-suppressed");
  }, []);

  // Close menus on navigation (skip the first render - nothing is open yet).
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    suppressMenus();
  }, [location.pathname, suppressMenus]);

  // Escape closes menus; clicking outside the nav closes them (desktop).
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") suppressMenus();
    };
    const onClick = (e) => {
      if (
        window.innerWidth > 1020 &&
        navRef.current &&
        !e.target.closest(".main-nav")
      ) {
        suppressMenus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [suppressMenus]);

  // Off-canvas drawer: lock page scroll while it is open.
  useEffect(() => {
    document.body.classList.toggle("drawer-open", mobileOpen);
    return () => document.body.classList.remove("drawer-open");
  }, [mobileOpen]);

  const onBtnMouseDown = (id) => {
    wasSuppressedRef.current[id] =
      document.body.classList.contains("menus-suppressed");
  };

  const onBtnClick = (id, e) => {
    if (window.innerWidth <= 1020) {
      e.preventDefault();
      unsuppressMenus();
      setOpenMenu((prev) => (prev === id ? null : id));
      return;
    }
    if (wasSuppressedRef.current[id]) {
      unsuppressMenus();
      return;
    }
    if (clickOpenRef.current[id]) {
      suppressMenus();
      return;
    }
    clickOpenRef.current = { [id]: true };
  };

  const onToggle = () => {
    setMobileOpen((prev) => !prev);
    unsuppressMenus();
  };

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Link className="brand" to="/" aria-label="NexTrade Prime - home">
            <img src={asset("logo-dark.png")} alt="NexTrade Prime" />
          </Link>
          <ul
            className="main-nav"
            ref={navRef}
            onMouseEnter={unsuppressMenus}
            onMouseLeave={() => {
              clickOpenRef.current = {};
            }}
            onFocusCapture={unsuppressMenus}
          >
            {MENUS.map((m) =>
              m.to ? (
                <li key={m.id}>
                  <Link to={m.to}>
                    <MIcon name={m.icon} />
                    {m.label}
                  </Link>
                </li>
              ) : (
                <li
                  key={m.id}
                  className={openMenu === m.id ? "open" : undefined}
                >
                  <button
                    type="button"
                    onMouseDown={() => onBtnMouseDown(m.id)}
                    onClick={(e) => onBtnClick(m.id, e)}
                  >
                    <MIcon name={m.icon} />
                    {m.label} <span className="caret">▼</span>
                  </button>
                  <div className="mega">
                    {m.columns.map((col) => (
                      <div key={col.title}>
                        <div className="mega-col-title">{col.title}</div>
                        {col.links.map((l) => (
                          <Link key={l.to + l.title} to={l.to}>
                            <MIcon name={l.icon} />
                            <span className="m-txt">
                              <b>{l.title}</b>
                              <span>{l.desc}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </li>
              ),
            )}
          </ul>
          <div className="header-actions">
            {user ? (
              <>
                <span style={{ fontWeight: 700, color: "var(--ink)" }}>
                  Hi, <span>{user.name || user.email}</span>
                </span>
                <button
                  className="btn btn-dark"
                  type="button"
                  onClick={onLogout}
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link className="login-link" to="/login">
                  <MIcon name="login" />
                  Login
                </Link>
                <Link className="btn btn-dark" to="/signup">
                  <MIcon name="arrow" />
                  Get Started
                </Link>
              </>
            )}
          </div>
          <button
            className={"menu-toggle" + (mobileOpen ? " is-open" : "")}
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
            onClick={onToggle}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile off-canvas drawer (<=1020px). Rendered outside <header>:
          the header's backdrop-filter would otherwise trap position:fixed. */}
      <div
        className={"drawer-backdrop" + (mobileOpen ? " show" : "")}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
      <aside
        id="mobile-drawer"
        className={"drawer" + (mobileOpen ? " open" : "")}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
      >
        <div className="drawer-head">
          <Link className="brand" to="/" aria-label="NexTrade Prime - home">
            <img src={asset("logo-dark.png")} alt="NexTrade Prime" />
          </Link>
          <button
            className="drawer-close"
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="drawer-motto">Payout speed above all</div>

        <nav className="drawer-body" aria-label="Mobile">
          {MENUS.map((m) =>
            m.to ? (
              <Link key={m.id} className="drawer-item" to={m.to}>
                <span className="drawer-ico">
                  <MIcon name={m.icon} />
                </span>
                <span className="drawer-label">{m.label}</span>
                <span className="drawer-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ) : (
              <div
                key={m.id}
                className={"drawer-group" + (openMenu === m.id ? " open" : "")}
              >
                <button
                  type="button"
                  className="drawer-item"
                  aria-expanded={openMenu === m.id}
                  onClick={() =>
                    setOpenMenu((prev) => (prev === m.id ? null : m.id))
                  }
                >
                  <span className="drawer-ico">
                    <MIcon name={m.icon} />
                  </span>
                  <span className="drawer-label">{m.label}</span>
                  <span className="drawer-chev" aria-hidden="true" />
                </button>
                <div className="drawer-panel">
                  <div className="drawer-panel-inner">
                    {m.columns.map((col) => (
                      <div key={col.title} className="drawer-col">
                        <div className="drawer-col-title">{col.title}</div>
                        {col.links.map((l) => (
                          <Link
                            key={l.to + l.title}
                            className="drawer-link"
                            to={l.to}
                          >
                            <MIcon name={l.icon} />
                            <span>
                              <b>{l.title}</b>
                              <small>{l.desc}</small>
                            </span>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
          )}
        </nav>

        <div className="drawer-foot">
          <LanguageSelect variant="drawer" />
          {user ? (
            <div className="drawer-ctas">
              <span className="drawer-hi">Hi, {user.name || user.email}</span>
              <button className="btn btn-dark" type="button" onClick={onLogout}>
                Log Out
              </button>
            </div>
          ) : (
            <div className="drawer-ctas">
              <Link className="btn drawer-login" to="/login">
                Login
              </Link>
              <Link className="btn btn-gold" to="/signup">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
