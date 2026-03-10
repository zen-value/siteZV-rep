# Zen Value — Site Web

Site institutionnel de Zen Value, cabinet de conseil et organisme de formation certifié Qualiopi,
spécialisé en performance opérationnelle, Lean, Agile et Théorie des Contraintes.

**Stack :** HTML/CSS/JS statique · GitHub Pages · Admin custom sans backend  
**URL prod :** https://zenvalue.fr  
**Repo actuel (dev) :** https://github.com/llmdev-ops/llmdev-ops.github.io  
**Repo cible (prod) :** https://github.com/zen-value/siteZV-rep

---

## Structure du repo

```
siteZV-rep/
│
├── index.html                        # SPA — toutes les pages en un seul fichier
├── sitemap.xml                       # Sitemap SEO
├── robots.txt                        # Directives crawlers
├── CNAME                             # Domaine personnalisé (à créer : zenvalue.fr)
│
├── admin/
│   └── index.html                    # Interface d'administration complète
│
├── assets/
│   ├── js/
│   │   ├── site-config.js            # ⚙️  Config centrale — SEUL FICHIER à modifier pour la migration
│   │   ├── cms-loader.js             # Chargement JSON → injection DOM + showOffreDetail/showCasDetail
│   │   ├── theme-loader.js           # Application du thème (couleurs, polices)
│   │   ├── router.js                 # Navigation SPA (showPage)
│   │   └── animations.js             # Scroll reveal
│   │
│   ├── css/
│   │   ├── tokens.css                # Variables CSS (couleurs, typo, spacing)
│   │   ├── layout.css                # Grilles et conteneurs
│   │   ├── components.css            # Cards, boutons, badges
│   │   ├── navigation.css            # Header, nav, footer
│   │   └── forms.css                 # Formulaire de contact
│   │
│   └── images/
│       ├── logo/
│       │   ├── logo_zen-value_H.avif # Logo horizontal (fonds clairs)
│       │   ├── logo_zen-value_V.avif # Logo vertical
│       │   └── logo_zen-value_W.avif # Logo blanc (fonds sombres)
│       ├── logos-clients/            # Logos clients (chargés dynamiquement via API GitHub)
│       ├── medias/                   # Bibliothèque médias admin (4 catégories)
│       └── og-image.jpg              # Image Open Graph 1200×630 (à créer)
│
└── content/
    └── pages/
        ├── accueil.json              # Contenu page Accueil
        ├── offres.json               # 4 offres avec page détail complète (problèmes, démarche, livrables…)
        ├── cas-clients.json          # 4 études de cas (contexte, enjeu, approche, résultats, bénéfices)
        ├── qui-sommes-nous.json      # Page Qui sommes-nous
        ├── formation.json            # Page Formation
        ├── recrutement.json          # Page Recrutement
        ├── rse.json                  # Page Engagements RSE
        ├── principes.json            # Nos Principes
        ├── theme.json                # Thème graphique actif
        └── users.json                # Utilisateurs admin (mots de passe hashés SHA-256)
```

---

## Pages du site

| ID page | Titre | Description |
|---|---|---|
| `accueil` | Accueil | Hero, piliers, chiffres clés, cas clients, CTA |
| `offres` | Nos Offres | 4 cartes offres avec lien vers page détail |
| `offre-detail` | Détail offre *(dynamique)* | Cible, résultats, problèmes, démarche, livrables, cas liés |
| `qsn` | Qui sommes-nous | Mission, valeurs, équipe, principes |
| `formation` | Formation | Catalogue formations certifiantes Qualiopi |
| `recrutement` | Recrutement | Engagements, profils, processus |
| `rse` | Engagements RSE | Mesures et engagements RSE |
| `contact` | Contact | Formulaire Web3Forms |
| `cas-detail` | Détail cas client *(dynamique)* | Contexte, enjeu, approche, résultats, bénéfices |

---

## Système de contenu

Tout le contenu est versionné dans des fichiers JSON dans le repo Git.
Le fichier `cms-loader.js` les charge au démarrage et injecte les valeurs dans le DOM via `data-cms="section.clé"`.

**Modifier le contenu :** interface admin `/admin/` — les modifications sont sauvegardées directement sur GitHub via l'API.

**Lier offre ↔ cas client :** champ `cas_ids` dans `offres.json` — tableau des index des cas (ex: `[0, 2]`).

---

## Système de thème

Géré par `theme-loader.js` à partir de `content/pages/theme.json`.

| Preset | Primaire | Structurel | Accent |
|---|---|---|---|
| Zen Value *(défaut)* | `#AAC335` | `#404041` | `#FF467C` |
| Ardoise | `#4A7FA5` | `#2C3E50` | `#E67E22` |
| Minéral | `#6B7B5E` | `#3D3D3D` | `#C0392B` |

---

## Authentification admin

**Accès :** `/admin/` · **Fichier :** `content/pages/users.json`

Flux : invitation UUID (48h, usage unique) → première connexion → choix mot de passe.  
Sécurités : SHA-256, sessions 8h, anti brute-force 5 tentatives / 15 min.

---

---

# 🚀 Mode opératoire — Migration compte GitHub

> Procédure complète pour passer du compte de développement `llmdev-ops`
> vers l'organisation Zen Value `zen-value` et mettre le site en production sur `zenvalue.fr`.

---

## Étape 1 — Créer l'organisation GitHub

1. Connecté sur le compte GitHub personnel de Mael, aller sur https://github.com/organizations/new
2. Nom de l'organisation : **`zen-value`** *(exactement, en minuscules avec tiret)*
3. Plan : **Free** suffit pour GitHub Pages
4. Inviter Loïc (`llmdev-ops`) comme **Owner** dans les paramètres de l'organisation

---

## Étape 2 — Créer le repo de production

1. Dans l'organisation `zen-value`, créer un nouveau repo
2. Nom du repo : **`siteZV-rep`** *(obligatoire pour GitHub Pages sur domaine personnalisé)*
3. Visibilité : **Public** *(requis pour GitHub Pages gratuit)*
4. Ne pas initialiser avec un README (on va pousser le code existant)

---

## Étape 3 — Copier le contenu du repo dev

Depuis un terminal, sur la machine de Loïc :

```bash
# Cloner le repo actuel
git clone https://github.com/llmdev-ops/llmdev-ops.github.io.git zenvalue-site
cd zenvalue-site

# Changer l'origine vers le nouveau repo
git remote set-url origin https://github.com/zen-value/siteZV-rep.git

# Pousser tout le contenu
git push -u origin main
```

---

## Étape 4 — Modifier site-config.js

C'est **le seul fichier à modifier** pour l'ensemble du site.
Ouvrir `assets/js/site-config.js` et remplacer :

```js
// AVANT (dev)
window.ZV_CONFIG = {
  GH_USER : 'llmdev-ops',
  GH_REPO : 'llmdev-ops.github.io',
  SITE_URL : 'https://llmdev-ops.github.io',
  WEB3FORMS_KEY : 'VOTRE_CLE_WEB3FORMS',
};

// APRÈS (prod)
window.ZV_CONFIG = {
  GH_USER : 'zen-value',
  GH_REPO : 'siteZV-rep',
  SITE_URL : 'https://zenvalue.fr',
  WEB3FORMS_KEY : 'COLLER_ICI_LA_CLE_WEB3FORMS',
};
```

Committer et pusher :

```bash
git add assets/js/site-config.js
git commit -m "config: migration vers org zen-value + domaine zenvalue.fr"
git push
```

> ⚠️ Ne pas modifier `cms-loader.js` ni `admin/index.html` — ils lisent `GH_USER`/`GH_REPO` depuis `site-config.js` automatiquement.

---

## Étape 5 — Générer le Personal Access Token pour l'admin

L'admin a besoin d'un token GitHub pour lire/écrire les fichiers JSON de contenu.

1. Aller sur https://github.com/settings/tokens/new *(compte du Owner de l'org)*
2. Note : `Zen Value Admin`
3. Expiration : **No expiration** *(ou 1 an à renouveler)*
4. Scopes à cocher :
   - ✅ `repo` → accès complet aux repos de l'organisation
5. Cliquer **Generate token** — copier le token immédiatement (ne s'affiche qu'une fois)
6. Lors de la première connexion à `/admin/`, coller ce token dans le champ dédié

---

## Étape 6 — Activer GitHub Pages

1. Dans le repo `zen-value/siteZV-rep`, aller dans **Settings → Pages**
2. Source : **Deploy from a branch**
3. Branch : **main** · Folder : **/ (root)**
4. Cliquer **Save**

Le site sera accessible sur `https://zen-value.github.io/siteZV-rep/` en attendant le domaine.

---

## Étape 7 — Configurer le domaine zenvalue.fr

### 7a. Chez votre registrar (OVH, Gandi, etc.)

Ajouter ces enregistrements DNS :

```
Type    Nom     Valeur
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     zen-value.github.io.
```

### 7b. Dans GitHub Pages

1. **Settings → Pages → Custom domain**
2. Saisir : `zenvalue.fr`
3. Cliquer **Save** — GitHub crée automatiquement un fichier `CNAME`
4. Cocher **Enforce HTTPS** (disponible après propagation DNS, ~24h)

---

## Étape 8 — Créer le compte Web3Forms

Le formulaire de contact utilise Web3Forms pour envoyer les emails sans backend.

1. Aller sur https://web3forms.com
2. Saisir l'email : `contact@zenvalue.fr`
3. Valider l'email de confirmation
4. Copier la clé d'accès fournie
5. La coller dans `site-config.js` → champ `WEB3FORMS_KEY`

---

## Étape 9 — Recréer les comptes utilisateurs admin

Les mots de passe existants dans `users.json` resteront valides.
Si un utilisateur a oublié son mot de passe :

1. Se connecter à `/admin/` avec le compte Owner
2. Aller dans **Utilisateurs**
3. Cliquer **Renouveler** sur le compte concerné → nouveau code d'invitation généré
4. Partager le code par email — l'utilisateur choisit un nouveau mot de passe

---

## Étape 10 — Vérifications post-migration

```
✅ https://zenvalue.fr  affiche le site
✅ https://zenvalue.fr/admin/  affiche l'admin
✅ Formulaire contact → email reçu sur contact@zenvalue.fr
✅ Sauvegarde d'un contenu depuis l'admin → commit visible sur GitHub
✅ Déploiement automatique après save (pastille verte dans l'admin)
✅ HTTPS activé (cadenas dans le navigateur)
✅ Logos clients chargés depuis assets/images/logos-clients/
```

---

## Récapitulatif des substitutions

| Où | Avant | Après |
|---|---|---|
| `assets/js/site-config.js` | `llmdev-ops` | `zen-value` |
| `assets/js/site-config.js` | `llmdev-ops.github.io` | `siteZV-rep` |
| `assets/js/site-config.js` | `https://llmdev-ops.github.io` | `https://zenvalue.fr` |
| `assets/js/site-config.js` | `VOTRE_CLE_WEB3FORMS` | *(clé Web3Forms réelle)* |
| GitHub Pages settings | *(aucun domaine)* | `zenvalue.fr` |
| DNS registrar | *(aucun enregistrement)* | 4× A + 1× CNAME |

> Tous les autres fichiers (`cms-loader.js`, `admin/index.html`, `index.html`…) lisent
> dynamiquement `window.ZV_CONFIG` — **aucune modification nécessaire**.

---

## Checklist finale avant lancement

- [ ] Org GitHub `zen-value` créée
- [ ] Repo `siteZV-rep` créé et pushé
- [ ] `site-config.js` mis à jour (GH_USER, GH_REPO, SITE_URL, WEB3FORMS_KEY)
- [ ] Personal Access Token généré et testé dans l'admin
- [ ] GitHub Pages activé sur `main`
- [ ] DNS configuré chez le registrar
- [ ] Domaine `zenvalue.fr` ajouté dans GitHub Pages + HTTPS forcé
- [ ] Formulaire contact testé end-to-end
- [ ] Image Open Graph créée : `assets/images/og-image.jpg` (1200×630 px)
- [ ] Contenu réel renseigné : proposition de valeur, offres, cas clients (Mael)
- [ ] Pages légales : mentions légales, CGV, confidentialité, cookies
- [ ] Audit Lighthouse (performances, accessibilité, SEO ≥ 90)
- [ ] Tests cross-browser : Chrome, Firefox, Safari, iOS, Android

---

## Contacts projet

| Rôle | Personne | Email |
|---|---|---|
| Lead technique | Loïc | lloizel@zenvalue.fr |
| Contenu & stratégie | Mael | — |
| Rédactrice | Angela | aabdelnour@zenvalue.fr |
