import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Served from the domain root on cPanel (https://nextradeprime.com/), so the
// base is '/' in dev and in the build. Client-side routes are handled by
// public/.htaccess, which Vite copies into dist/.
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 5173,
    strictPort: false, // if 5173 is busy, use the next free port
  },
});
