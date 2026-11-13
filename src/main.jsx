import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './style.css';
import { initTranslate } from './lib/translate';

// The stylesheet gates scroll-reveal on .js (the old script.js did this
// too): without it, .reveal elements never animate in.
document.documentElement.classList.add('js');

// Google Translate swaps text nodes for <font> wrappers behind React's back.
// When React later removes/inserts one of those nodes it throws
// ("The node to be removed is not a child of this node") and the page
// crashes. Guard the two DOM calls React uses so a stale node is skipped
// instead (well-known fix: facebook/react#11538).
if (typeof Node === 'function' && Node.prototype) {
  const origRemove = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) return child;
    return origRemove.call(this, child);
  };
  const origInsert = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (node, ref) {
    if (ref && ref.parentNode !== this) return node;
    return origInsert.call(this, node, ref);
  };
}

// Re-apply a saved language (Google Website Translator) on every load.
initTranslate();

// BASE_URL is '/' (site lives at the domain root), so the basename is ''.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
