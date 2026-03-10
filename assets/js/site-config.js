/* ══════════════════════════════════════════════════════
   SITE CONFIG — Zen Value
   ──────────────────────────────────────────────────────
   ⚠️  SEUL FICHIER À MODIFIER pour changer d'environnement.
   ══════════════════════════════════════════════════════ */

window.ZV_CONFIG = {

  /* ── GitHub Pages ── */
  GH_USER : 'zen-value',
  GH_REPO : 'siteZV-rep',

  /* ── Site URL ── */
  SITE_URL : 'https://zen-value.github.io/siteZV-rep',  // → 'https://zenvalue.fr' après migration

  /* ── Sous-chemin GitHub Pages ──
     Renseigner le nom du repo tant que le domaine custom n'est pas actif.
     Laisser vide ('') une fois zenvalue.fr configuré. */
  GH_SUBPATH : '/siteZV-rep/',

  /* ── Web3Forms ── */
  WEB3FORMS_KEY : 'a6c6cb75-f56c-4d4e-a835-1c7e49b6c27c',

};

/* ── Mise à jour du <base href> depuis GH_SUBPATH ──
   Synchronise l'élément <base id="zv-base"> avec la config.
   Sur domaine custom (GH_SUBPATH vide), supprime le <base>. */
(function() {
  var sub  = window.ZV_CONFIG.GH_SUBPATH;
  var base = document.getElementById('zv-base');
  if (!base) return;
  if (sub) {
    base.href = sub;
  } else {
    base.parentNode.removeChild(base);
  }
})();
