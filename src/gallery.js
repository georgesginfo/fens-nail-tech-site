// La galerie suit le dossier public/gallery/ du dépôt GitHub.
// - Site publié : lecture en temps réel du dossier via l'API GitHub (une photo
//   ajoutée sur GitHub apparaît immédiatement), avec gallery.json en secours.
// - En local (npm run dev) : lecture directe du dossier.
// Préfixe du nom de fichier = catégorie : gel-, nailart-, french-, pedicure-, creations-.

const GITHUB_REPO = 'georgesginfo/fens-nail-tech-site';
const GITHUB_BRANCH = 'main';
const GALLERY_PATH = 'public/gallery';
const IMAGE_RE = /\.(jpe?g|png|webp|avif)$/i;
const BASE = import.meta.env.BASE_URL;

const categoryFromName = (name) => {
  const n = name.toLowerCase();
  if (n.startsWith('gel-')) return 'gel';
  if (n.startsWith('french-')) return 'french';
  if (n.startsWith('pedicure-')) return 'pedicure';
  if (n.startsWith('nailart-')) return 'nailart';
  return 'creations';
};
const titleFromName = (name) => name.replace(/\.[^.]+$/, '').replace(/^(gel|french|pedicure|nailart|creations)-/i, '').replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).trim() || 'Création Fens';
const toItem = (filename, src) => ({ src, title: titleFromName(filename), category: categoryFromName(filename), local: true });

async function fromGitHub() {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${GALLERY_PATH}?ref=${GITHUB_BRANCH}`;
  const res = await fetch(url, { headers: { Accept: 'application/vnd.github+json' }, cache: 'no-store' });
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  const files = await res.json();
  return files
    .filter((f) => f.type === 'file' && IMAGE_RE.test(f.name))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((f) => toItem(f.name, `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/${GALLERY_PATH}/${encodeURIComponent(f.name)}`));
}

async function fromManifest() {
  const res = await fetch(`${BASE}gallery.json`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`gallery.json ${res.status}`);
  const names = await res.json();
  return names.map((name) => toItem(name, `${BASE}gallery/${encodeURIComponent(name)}`));
}

// Images d'inspiration affichées uniquement tant que le dossier ne contient aucune photo.
const inspiration = [
  ['https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=85','Rose nude lumineux','gel'],
  ['https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=900&q=85','Élégance minimaliste','french'],
  ['https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=900&q=85','Détails délicats','nailart'],
  ['https://images.unsplash.com/photo-1604902396830-aca29e19b067?auto=format&fit=crop&w=900&q=85','Rose & douceur','creations'],
  ['https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=900&q=85&sat=10','French intemporelle','french'],
  ['https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=85&sat=-20','Finition brillante','gel'],
  ['https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=900&q=85&sat=15','Art & finesse','nailart'],
  ['https://images.unsplash.com/photo-1604902396830-aca29e19b067?auto=format&fit=crop&w=900&q=85&sat=-15','Style personnalisé','creations'],
].map(([src, title, category]) => ({ src, title, category, local: false }));

export async function loadGallery() {
  const sources = import.meta.env.DEV ? [fromManifest] : [fromGitHub, fromManifest];
  for (const source of sources) {
    try {
      const items = await source();
      return items.length ? items : inspiration;
    } catch (err) {
      console.warn('Galerie :', err.message);
    }
  }
  return inspiration;
}
