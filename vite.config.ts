import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

/**
 * GitHub Pages project sites live at https://<user>.github.io/<repo>/.
 * Actions sets GITHUB_REPOSITORY (owner/repo). A `*.github.io` repo is served at `/`.
 * Local `npm run dev` keeps base `/`. Override with VITE_BASE_PATH if needed.
 */
function githubPagesBase(): string {
  const explicit = process.env.VITE_BASE_PATH
  if (explicit) {
    if (explicit === '/') return '/'
    return explicit.endsWith('/') ? explicit : `${explicit}/`
  }
  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
  if (!repo || repo.endsWith('.github.io')) return '/'
  return `/${repo}/`
}

export default defineConfig({
  base: githubPagesBase(),
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    headers: {
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
  build: {
    target: 'es2022',
    sourcemap: false,
    cssCodeSplit: true,
  },
})
