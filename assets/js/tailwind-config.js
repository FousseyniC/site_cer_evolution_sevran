/* Configuration Tailwind partagée par toutes les pages.
 * Couleurs reprises du logo CER (rouge #d0363c, anthracite #2d2d2d).
 * Contrastes vérifiés (WCAG AA) :
 *   blanc sur brand-600 = 4.9:1 · brand-400 sur ink = 5:1 · brand-700 sur brand-50 = 6:1
 */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf1f1',
          100: '#fbe2e3',
          200: '#f6c3c5',
          400: '#ff6b70', // texte rouge sur fond sombre
          600: '#d0363c', // rouge du logo
          700: '#b0292f', // survol / texte rouge sur fond clair teinté
          800: '#8c2025',
        },
        ink: {
          DEFAULT: '#2d2d2d', // anthracite du logo
          900: '#1f1f1f',
          700: '#3a3a3a',
          500: '#5c5c5c',
        },
        surface: '#faf8f5',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: {
        site: '72rem',
      },
    },
  },
};
