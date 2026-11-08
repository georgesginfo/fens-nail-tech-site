// Place JPG, JPEG, PNG, WEBP or AVIF images in src/assets/gallery/.
// Vite discovers them automatically at build time. Rename files with a category
// prefix (gel-, nailart-, french-, pedicure-, creations-) for automatic filters.
const localFiles = import.meta.glob('./assets/gallery/*.{jpg,jpeg,png,webp,avif}', { eager: true, query: '?url', import: 'default' });
const categoryFromName = (name) => {
  const n = name.toLowerCase();
  if (n.startsWith('gel-')) return 'gel';
  if (n.startsWith('french-')) return 'french';
  if (n.startsWith('pedicure-')) return 'pedicure';
  if (n.startsWith('nailart-')) return 'nailart';
  return 'creations';
};
const titleFromName = (name) => name.replace(/\.[^.]+$/, '').replace(/^(gel|french|pedicure|nailart|creations)-/i, '').replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Création Fens';
const localGallery = Object.entries(localFiles).map(([path, url]) => {
  const filename = path.split('/').pop();
  return { src: url, title: titleFromName(filename), category: categoryFromName(filename), local: true };
});

// Starter inspiration images. Replace/add your own work in src/assets/gallery/.
// These are clearly presented as inspiration examples, not verified client work.
const inspiration = [
  ['https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=85','Rose nude lumineux','gel'],
  ['https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=900&q=85','Élégance minimaliste','french'],
  ['https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=900&q=85','Détails délicats','nailart'],
  ['https://images.unsplash.com/photo-1604902396830-aca29e19b067?auto=format&fit=crop&w=900&q=85','Rose & douceur','creations'],
  ['https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=900&q=85&sat=10','French intemporelle','french'],
  ['https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=85&sat=-20','Finition brillante','gel'],
  ['https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=900&q=85&sat=15','Art & finesse','nailart'],
  ['https://images.unsplash.com/photo-1604902396830-aca29e19b067?auto=format&fit=crop&w=900&q=85&sat=-15','Style personnalisé','creations'],
  ['https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=900&q=85&blur=0','Nuances naturelles','gel'],
  ['https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=900&q=85&crop=entropy','Création florale','nailart'],
  ['https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=85&fit=crop','Pose raffinée','french'],
  ['https://images.unsplash.com/photo-1604902396830-aca29e19b067?auto=format&fit=crop&w=900&q=85&fit=crop','Douceur rosée','creations'],
];
export const galleryItems = [...localGallery, ...inspiration.map(([src,title,category]) => ({src,title,category,local:false}))];
