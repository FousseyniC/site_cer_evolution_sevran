/* Comportements partagés : menu mobile, horaires du jour, année du pied de page, icônes. */
(function () {
  'use strict';

  /* ---------- Horaires du bureau (source unique pour le JS) ----------
   * 0 = dimanche … 6 = samedi. null = fermé. [ouverture, fermeture] en heures.
   * Si les horaires changent, mettre à jour ici ET dans planning.html / le pied de page.
   */
  var HORAIRES = {
    0: null,
    1: null,
    2: [14, 19],
    3: [14, 19],
    4: [14, 19],
    5: [14, 19],
    6: [10, 14],
  };
  var JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

  /* Heure locale de l'agence (Paris), quel que soit le fuseau du visiteur */
  function maintenantParis() {
    try {
      var parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Paris',
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).formatToParts(new Date());
      var map = {};
      parts.forEach(function (p) { map[p.type] = p.value; });
      var jours = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      return { jour: jours[map.weekday], heure: parseInt(map.hour, 10) % 24 + parseInt(map.minute, 10) / 60 };
    } catch (e) {
      var d = new Date();
      return { jour: d.getDay(), heure: d.getHours() + d.getMinutes() / 60 };
    }
  }

  function prochaineOuverture(jour, heure) {
    for (var i = 0; i < 8; i++) {
      var j = (jour + i) % 7;
      var h = HORAIRES[j];
      if (h && (i > 0 || heure < h[0])) {
        var quand = i === 0 ? "aujourd'hui" : i === 1 ? 'demain' : JOURS[j];
        return quand + ' à ' + h[0] + 'h';
      }
    }
    return '';
  }

  function majStatut() {
    var now = maintenantParis();
    var h = HORAIRES[now.jour];
    var ouvert = !!(h && now.heure >= h[0] && now.heure < h[1]);
    var texte = ouvert
      ? 'Ouvert maintenant · ferme à ' + h[1] + 'h'
      : 'Fermé · ouvre ' + prochaineOuverture(now.jour, now.heure);

    document.querySelectorAll('[data-open-status]').forEach(function (el) {
      el.textContent = texte;
      el.setAttribute('data-state', ouvert ? 'open' : 'closed');
    });
    document.querySelectorAll('[data-open-dot]').forEach(function (el) {
      el.classList.toggle('bg-emerald-500', ouvert);
      el.classList.toggle('bg-neutral-400', !ouvert);
    });

    /* Met en évidence la ligne du jour dans le tableau des horaires */
    document.querySelectorAll('[data-day]').forEach(function (row) {
      if (parseInt(row.getAttribute('data-day'), 10) === now.jour) {
        row.classList.add('bg-brand-50');
        row.setAttribute('aria-current', 'date');
        var badge = row.querySelector('[data-today-badge]');
        if (badge) badge.classList.remove('hidden');
      }
    });
  }

  /* ---------- Menu mobile ---------- */
  function initMenu() {
    var bouton = document.querySelector('[data-menu-toggle]');
    var menu = document.getElementById('menu-mobile');
    if (!bouton || !menu) return;

    function basculer(ouvrir) {
      bouton.setAttribute('aria-expanded', String(ouvrir));
      bouton.querySelector('[data-label]').textContent = ouvrir ? 'Fermer le menu' : 'Ouvrir le menu';
      menu.classList.toggle('hidden', !ouvrir);
      bouton.querySelector('[data-icon-open]').classList.toggle('hidden', ouvrir);
      bouton.querySelector('[data-icon-close]').classList.toggle('hidden', !ouvrir);
    }

    bouton.addEventListener('click', function () {
      basculer(bouton.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && bouton.getAttribute('aria-expanded') === 'true') {
        basculer(false);
        bouton.focus();
      }
    });
    window.matchMedia('(min-width: 768px)').addEventListener('change', function (mq) {
      if (mq.matches) basculer(false);
    });
  }

  function initAnnee() {
    var annee = String(new Date().getFullYear());
    document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = annee; });
  }

  function init() {
    if (window.lucide) window.lucide.createIcons();
    initMenu();
    initAnnee();
    majStatut();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
