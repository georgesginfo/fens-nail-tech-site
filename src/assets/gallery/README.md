# Ajouter vos photos à la galerie Fens Nail Tech

Déposez vos photos de réalisations dans ce dossier : `src/assets/gallery/`.

Formats acceptés : `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`.

Pour que les filtres les classent automatiquement, commencez le nom du fichier par l'une de ces catégories :
- `gel-` — Pose Gel
- `nailart-` — Nail Art
- `french-` — French
- `pedicure-` — Pédicure
- `creations-` — Créations (catégorie par défaut)

Exemples : `gel-rose-nude.webp`, `nailart-fleurs-01.jpg`, `french-v-classique.png`.

Le nom du fichier devient la légende (sans le préfixe de catégorie). Vite intègre automatiquement les images locales au prochain build. Après avoir ajouté des photos, relancez `npm run build` puis déployez à nouveau le dossier `dist` sur GitHub Pages. Un site statique GitHub Pages ne peut pas parcourir le contenu d'un dossier sur le serveur au moment où un visiteur ouvre la page : la découverte se fait donc à la compilation.
