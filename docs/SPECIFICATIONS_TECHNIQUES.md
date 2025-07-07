# Spécifications techniques – Plateforme de jeux IA

## 1. Objectif

Mettre en place une architecture technique simple, modulaire et collaborative pour héberger une plateforme web de jeux, développés chacun par un stagiaire, en utilisant des outils d’intelligence artificielle (ex. GitHub Copilot).

---

## 2. Technologies retenues

| Domaine              | Choix                                  | Justification                                      |
|----------------------|-----------------------------------------|---------------------------------------------------|
| Stack principal       | React avec Vite                        | Moderne, rapide à démarrer, compatible avec GitHub Pages |
| CSS                  | Tailwind CSS v4                        | Rapidité de prototypage, cohérence possible       |
| Hébergement          | GitHub Pages                            | Gratuit, facile à déployer                        |
| Contrôle de version  | Git + GitHub                            | Travail collaboratif, pull requests, versioning   |
| IA de support        | GitHub Copilot (optionnel)              | Assistance au codage, sans obligation             |

---

## 3. Structure du projet

```
/ (racine du dépôt)
├── public/              # Assets globaux (favicon, images)
├── src/
│   ├── App.tsx          # Root React component
│   ├── main.tsx         # Entrée Vite/React
│   ├── pages/           # Contiendra la page d'accueil et les routes
│   │   ├── Home.tsx
│   │   ├── jeux/
│   │   │   ├── snake/
│   │   │   │   ├── SnakeGame.tsx
│   │   │   │   ├── style.css
│   │   │   ├── pong/
│   │   │   │   ├── PongGame.tsx
│   │   │   │   ├── style.css
├── tailwind.config.js   # Config Tailwind CSS
├── vite.config.ts       # Config Vite
├── README.md            # Documentation du projet
├── .gitignore
└── package.json
```

---

## 4. Git et collaboration

- Livraison via **pull request** sur GitHub
- Une **branche par stagiaire** (nommage libre)
- Revue de code collaborative
- README clair et à jour

---

## 5. Navigation et interface

- Page d’accueil sous forme de **grille de cartes** menant à chaque jeu
- Utilisation de **React Router** pour le routing
- Chaque jeu dans un dossier séparé sous `src/pages/jeux/`
- Pas de style visuel imposé : **liberté graphique totale**
- Responsive design recommandé

---

## 6. Développement des jeux

- Chaque jeu doit :
  - Être fonctionnel (aucune contrainte de structure formelle)
  - Être accessible via une URL propre
  - Contenir un `README.md` décrivant son fonctionnement
- Technologies : React, JS, CSS (libre choix des libs)

---

## 7. Usage de l’IA

- GitHub Copilot **encouragé mais non imposé**
- Aucune contrainte sur les prompts ou leur documentation
- Les stagiaires peuvent coder avec ou sans aide IA

---

## 8. Déploiement

- Déploiement via GitHub Pages
- Optionnellement : Vercel, Netlify ou autre hébergement statique
- Déploiement automatisé via GitHub Actions

---

## 9. Évolutions possibles

- Ajouter un système de score global (localStorage)
- Statistiques d’usage
- Retours utilisateurs ou votes
- Ajout de nouveaux jeux ou de versions alternatives

---

## 10. Synthèse des choix issus du QCM

- Hébergement : GitHub Pages
- Tech front : React + Vite
- Routing : par React Router, chaque jeu dans un dossier
- Navigation : grille de cartes sur la page d’accueil
- Livraison : Pull Request avec branche dédiée
- Style visuel : libre pour chaque stagiaire
- Contraintes jeu : aucun minimum imposé
- Copilot : usage libre, encouragé
- Retours utilisateurs : possibles plus tard