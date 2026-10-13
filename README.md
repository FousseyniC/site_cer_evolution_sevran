# Site CER Evolution Sevran

Site vitrine statique (HTML + Tailwind via CDN), sans étape de build : il suffit d'ouvrir `index.html` ou de déployer le dossier tel quel.

## Structure

| Fichier | Rôle |
|---|---|
| `index.html`, `formations.html`, `tarifs.html`, `planning.html`, `contact.html` | Pages du site |
| `assets/js/tailwind-config.js` | Couleurs, police et largeur max, partagées par toutes les pages |
| `assets/css/site.css` | Bande oblique du logo, focus clavier, lien d'évitement, mouvement réduit |
| `assets/js/site.js` | Menu mobile, statut « ouvert / fermé » en direct, année du pied de page, icônes |
| `logo.png` | Logo CER |

## Charte

- **Couleurs** (reprises du logo) : rouge `brand-600` `#d0363c`, anthracite `ink` `#2d2d2d`, fond `surface` `#faf8f5`.
  Pour du texte rouge sur fond sombre, utiliser `brand-400` ; sur fond rouge clair, `brand-700` (contraste AA).
- **Police** : Plus Jakarta Sans (Google Fonts).
- **Icônes** : Lucide, version figée `1.56.0`.

## Modifier les horaires

Les horaires apparaissent à trois endroits : le tableau de `planning.html`, le pied de page de chaque page, et l'objet `HORAIRES` en haut de `assets/js/site.js` (utilisé pour le badge « Ouvert maintenant »).
