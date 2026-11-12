import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './style.css';

// The stylesheet gates scroll-reveal on .js (the old script.js did this
// too): without it, .reveal elements never animate in.
document.documentElement.classList.add('js');

// BASE_URL is '/' in dev and '/nextrade-prime-broker/' in the production
// build, so the basename is '' locally and '/nextrade-prime-broker' live.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
