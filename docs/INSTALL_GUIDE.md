# Guide d'installation pour les développeurs

Ce guide explique comment installer et lancer le projet Snake en local.

## Prérequis

- [Node.js](https://nodejs.org/) (version 16 ou supérieure recommandée)
- [npm](https://www.npmjs.com/) (généralement installé avec Node.js)
- [pnpm](https://pnpm.io/) npm i -g pnpm
- [Git](https://git-scm.com/) (optionnel, pour cloner le dépôt)

## Étapes d'installation

1. **Cloner le dépôt (optionnel)**
   ```bash
   git clone <url-du-depot>
   cd rigol-ia
   ```

2. **Installer les dépendances**
   ```bash
   pnpm install
   ```

3. **Lancer l'application en mode développement**
   ```bash
   pnpm dev
   ```
   L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

4. **Construire l'application pour la production (optionnel)**
   ```bash
   pnpm build
   ```

## Conseils

- Utilisez un éditeur de code comme [Visual Studio Code](https://code.visualstudio.com/).
- Consultez le fichier `README.md` pour les instructions de jeu.

---

Pour toute question, contactez l'équipe de développement.