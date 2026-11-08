# Photos de la galerie Fens Nail Tech

Ce dossier **est** la galerie du site. Chaque photo déposée ici y apparaît automatiquement.

## Ajouter une photo depuis GitHub

1. Sur GitHub, ouvrez ce dossier (`public/gallery/`).
2. Cliquez sur **Add file → Upload files**, déposez vos photos, puis **Commit changes**.
3. La photo est visible sur le site dès le rechargement de la page.

Pour retirer une photo : ouvrez-la sur GitHub, puis **⋯ → Delete file**.

## Formats et noms

Formats acceptés : `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`.

Le début du nom du fichier choisit le filtre :
- `gel-` — Pose Gel
- `nailart-` — Nail Art
- `french-` — French
- `pedicure-` — Pédicure
- `creations-` ou aucun préfixe — Créations

Le reste du nom devient la légende : `gel-rose-nude.jpg` → « Rose Nude » dans « Pose Gel ».
Les photos s'affichent dans l'ordre alphabétique des noms.

Conseil : des photos de moins de 1 Mo (environ 1200 px de large) chargent plus vite sur téléphone.

## Fonctionnement

Le site lit le contenu de ce dossier en direct via l'API GitHub. Si l'API ne répond pas
(limite de 60 requêtes par heure et par visiteur), il utilise la liste générée lors du
dernier déploiement automatique. Tant que le dossier ne contient aucune photo, des images
d'inspiration marquées « INSPIRATION » sont affichées à la place.
