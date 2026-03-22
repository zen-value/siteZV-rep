# Guide contributeur — Site Zen Value

Bienvenue ! Ce guide explique comment installer les outils, récupérer le projet en local, travailler sur le site et soumettre tes modifications sans impacter la version en ligne.

---

## 1. Prérequis — Installer les outils

### Git

Git est l'outil qui permet de versionner le code et de collaborer.

**Windows :**
1. Télécharge Git sur https://git-scm.com/download/win
2. Installe avec les options par défaut
3. Tu auras accès à **Git Bash** — c'est le terminal à utiliser pour toutes les commandes

**Mac :**
```bash
brew install git
```
Ou télécharge depuis https://git-scm.com/download/mac

### Node.js

Node.js est nécessaire pour lancer le serveur local.

1. Télécharge sur https://nodejs.org (version LTS recommandée)
2. Installe avec les options par défaut
3. Vérifie l'installation dans Git Bash :
```bash
node --version
npm --version
```

### VS Code (éditeur de code)

1. Télécharge sur https://code.visualstudio.com
2. Installe avec les options par défaut

---

## 2. Accès au repository GitHub

Tu dois avoir un compte GitHub et être invité comme collaborateur sur le repository `zen-value/siteZV-rep`.

Demande à Loïc ou Mael de t'inviter via :
```
https://github.com/zen-value/siteZV-rep/settings/collaborators
```

---

## 3. Récupérer le projet en local

Ouvre **Git Bash** et exécute ces commandes :

```bash
# Va dans le dossier où tu veux mettre le projet
cd Documents

# Clone le repository
git clone https://github.com/zen-value/siteZV-rep.git

# Entre dans le dossier
cd siteZV-rep

# Bascule sur la branche de travail
git checkout develop
```

Tu as maintenant le projet en local sur ta machine.

---

## 4. Lancer le site en local

Pour tester tes modifications dans le navigateur avant de les envoyer :

```bash
# Dans le dossier siteZV-rep
npx serve .
```

Le terminal affiche une URL du type `http://localhost:3000` — ouvre-la dans ton navigateur.

Le site tourne en local — tes modifications sont visibles en temps réel après un **F5** dans le navigateur.

Pour arrêter le serveur : **Ctrl+C** dans le terminal.

---

## 5. Les branches — comment ça marche

```
main      → Production (zenvalue.fr) — NE JAMAIS TOUCHER DIRECTEMENT
develop   → Branche de travail quotidien
feature/* → Une branche par nouvelle fonctionnalité
```

**Règle d'or : on ne commit jamais directement sur `main`.**

---

## 6. Workflow quotidien

### Avant de commencer à travailler

Toujours récupérer les dernières modifications de tes collègues :

```bash
git checkout develop
git pull origin develop
```

### Faire ses modifications

Travaille directement sur `develop` pour les petites modifications :

```bash
# Vérifie que tu es bien sur develop
git branch
# Tu dois voir * develop

# Fais tes modifications dans VS Code
# Teste en local avec npx serve .
# Quand c'est bon, envoie sur GitHub :

git add .
git commit -m "description courte de ce que tu as fait"
git push origin develop
```

### Pour une nouvelle fonctionnalité importante

Crée une branche dédiée :

```bash
# Crée et bascule sur une nouvelle branche
git checkout -b feature/nom-de-la-feature

# Fais tes modifications, teste en local
# Puis envoie sur GitHub :
git add .
git commit -m "description de la feature"
git push origin feature/nom-de-la-feature
```

Puis demande à Mael ou Loïc de merger ta branche dans `develop`.

---

## 7. Mettre en production

**Seuls Mael et Loïc font ça.**

Quand `develop` est stable et validé :

```bash
git checkout main
git merge develop
git push origin main
```

Le site se met à jour automatiquement sur `zenvalue.fr` en quelques minutes.

---

## 8. Modifier le contenu (JSON)

Le contenu du site est dans `content/pages/` et `content/settings/`. Ces fichiers JSON peuvent être modifiés directement dans VS Code.

| Fichier | Contenu |
|---------|---------|
| `content/pages/accueil.json` | Textes page d'accueil |
| `content/settings/resultats.json` | Chiffres clés |
| `content/settings/global.json` | Email, adresse, copyright |

Après modification, teste en local puis commit sur `develop`.

---

## 9. Utiliser l'interface admin

L'admin permet de modifier le contenu sans toucher au code.

**URL locale :** `http://localhost:3000/admin/`
**URL en ligne :** `https://zenvalue.fr/admin/`

Pour te connecter la première fois en local, tu as besoin d'un token GitHub :
1. Va sur https://github.com/settings/tokens/new
2. Nom : `Admin ZV local`
3. Coche `repo`
4. Génère et copie le token `ghp_...`
5. Dans la console du navigateur (F12) :
```javascript
localStorage.setItem('zv_token', btoa('ghp_TONTOKEN'))
```
6. Recharge la page et connecte-toi avec ton email et mot de passe

---

## 10. Résolution des problèmes courants

### "Your branch is behind origin/develop"
```bash
git pull --rebase origin develop
git push origin develop
```

### Conflit lors du pull
Ouvre le fichier en conflit dans VS Code, supprime les marqueurs `<<<<<<<`, `=======`, `>>>>>>>` en gardant la bonne version, puis :
```bash
git add .
git rebase --continue
```

### "Updates were rejected (fetch first)"
```bash
git pull --rebase origin develop
git push origin develop
```

### Le site ne s'affiche pas en local
Vérifie que `npx serve .` tourne bien dans le terminal. Si le port est occupé, essaie :
```bash
npx serve . -p 3001
```

---

## 11. Contacts

**Problème technique sur le site :** Mael Dodin — mdodin@zenvalue.fr
**Accès GitHub :** Loïc Le Molgat — llemolgat@zenvalue.fr
