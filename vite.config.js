import { defineConfig } from 'vite';
import { readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const GALLERY_DIR = resolve(__dirname, 'public/gallery');
const IMAGE_RE = /\.(jpe?g|png|webp|avif)$/i;

// Liste les photos de public/gallery/ (triées par nom).
const listGallery = () =>
  existsSync(GALLERY_DIR) ? readdirSync(GALLERY_DIR).filter((f) => IMAGE_RE.test(f)).sort() : [];

// Produit gallery.json : servi en direct pendant `npm run dev`, écrit dans dist/ au build.
// Sur le site publié, il sert de secours si l'API GitHub ne répond pas.
const galleryManifest = () => ({
  name: 'gallery-manifest',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (!req.url.split('?')[0].endsWith('/gallery.json')) return next();
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'no-store');
      res.end(JSON.stringify(listGallery()));
    });
  },
  generateBundle() {
    this.emitFile({ type: 'asset', fileName: 'gallery.json', source: JSON.stringify(listGallery()) });
  },
});

export default defineConfig({
  base: '/fens-nail-tech-site/',
  build: { outDir: 'dist' },
  plugins: [galleryManifest()],
});
