import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import { defineConfig } from 'vite';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: path.join(projectRoot, 'github-pages'),
  base: '/english-8-exams/',
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [react()],
  resolve: { alias: { '@': projectRoot } },
  publicDir: path.join(projectRoot, 'public'),
  build: {
    outDir: path.join(projectRoot, 'dist-pages'),
    emptyOutDir: true,
  },
});
