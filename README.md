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

1. Créez un dépôt GitHub et ajoutez tous les fichiers de ce projet.
2. Si le dépôt porte un nom autre que `username.github.io`, ouvrez `vite.config.js` et remplacez `base: '/'` par `base: '/NOM-DU-DEPOT/'`.
3. Dans GitHub, ouvrez **Settings → Pages**.
4. Choisissez **GitHub Actions** comme source de déploiement.
5. Ajoutez un workflow `.github/workflows/deploy.yml` (exemple ci-dessous), puis poussez vos changements sur `main`.

```yaml
name: Deploy Vite site to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Mettre vos photos dans la galerie

Ajoutez les images dans `src/assets/gallery/`. Formats : JPG, JPEG, PNG, WEBP, AVIF. Préfixez le nom avec `gel-`, `nailart-`, `french-`, `pedicure-` ou `creations-` pour leur attribuer une catégorie. Le site les détecte automatiquement à la compilation via `import.meta.glob`. Après ajout : `npm run build`, puis redéployez. Consultez `src/assets/gallery/README.md`.

La galerie contient aussi des images d'inspiration externes signalées « INSPIRATION » ; elles ne sont pas présentées comme des réalisations vérifiées du salon. Vous pouvez les retirer de `src/gallery.js` quand vos propres photos sont prêtes.

## Modifier les coordonnées

Les deux numéros, liens WhatsApp et adresse se trouvent dans `index.html`. Remplacez les numéros à tous les endroits correspondants si nécessaire. Les appels utilisent `tel:` et WhatsApp utilise `https://wa.me/` avec l'indicatif pays sans espaces.

## Notes

- Les liens d'itinéraire ouvrent une recherche Google Maps pour Fens Nail Tech, Ruelle Alexandre, Gonaïves.
- Aucun horaire, tarif, avis client ou diplôme n'a été inventé.
- Le site utilise Google Fonts et des photos d'inspiration distantes ; une connexion Internet est requise pour ces ressources.
