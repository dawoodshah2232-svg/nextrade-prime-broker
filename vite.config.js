import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages project site — the site lives at
// https://dawoodshah2232-svg.github.io/nextrade-prime-broker/
export default defineConfig({
  plugins: [react()],
  base: '/nextrade-prime-broker/',
});
