# Fens Nail Tech — Site vitrine

Site vitrine statique, responsive et prêt pour GitHub Pages. Stack : Vite + JavaScript + CSS, sans backend.

## Démarrer en local

```bash
npm install
npm run dev
```

## Construire le site

```bash
npm run build
npm run preview
```

Le site compilé est généré dans `dist/`.

## Déploiement sur GitHub Pages

Le site est publié automatiquement par `.github/workflows/deploy.yml` à chaque envoi sur `main` :
https://georgesginfo.github.io/fens-nail-tech-site/

Le chemin de base est réglé dans `vite.config.js` (`base: '/fens-nail-tech-site/'`). Si le dépôt est renommé, mettez ce chemin à jour, ainsi que `GITHUB_REPO` dans `src/gallery.js`.

## Galerie

La galerie suit le dossier `public/gallery/` du dépôt : ajoutez ou supprimez des photos directement sur GitHub (**Add file → Upload files**) et le site se met à jour sans rien recompiler. Les règles de nommage (catégories) sont dans `public/gallery/README.md`.

Tant que le dossier ne contient aucune photo, des images d'inspiration marquées « INSPIRATION » s'affichent.

## Modifier les coordonnées

Les deux numéros, liens WhatsApp et adresse se trouvent dans `index.html`. Remplacez les numéros à tous les endroits correspondants si nécessaire. Les appels utilisent `tel:` et WhatsApp utilise `https://wa.me/` avec l'indicatif pays sans espaces.

## Notes

- Les liens d'itinéraire ouvrent une recherche Google Maps pour Fens Nail Tech, Ruelle Alexandre, Gonaïves.
- Aucun horaire, tarif, avis client ou diplôme n'a été inventé.
- Le site utilise Google Fonts et des photos d'inspiration distantes ; une connexion Internet est requise pour ces ressources.
