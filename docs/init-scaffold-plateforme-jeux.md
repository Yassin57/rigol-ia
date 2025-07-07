# Initialisation du projet – Plateforme de jeux React (Vite + TailwindCSS)

## 🛠️ Prérequis

- Node.js (v18 ou plus recommandé)
- pnpm (`npm install -g pnpm`)

---

## 🚀 Étapes de scaffold

### 1. Création du projet avec Vite

```bash
pnpm create vite plateforme-jeux --template react-ts
cd plateforme-jeux
```

### 2. Installation des dépendances

```bash
pnpm install
```

### 3. Ajout de Tailwind CSS

```bash
pnpm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 4. Configuration de Tailwind

Dans `tailwind.config.js` :

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Dans `src/index.css` (ou `src/styles.css` à créer si besoin) :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Et dans `main.tsx`, importer ce fichier :

```ts
import './index.css';
```

---

## 📂 Arborescence recommandée

```
src/
├── App.tsx
├── main.tsx
├── index.css
├── pages/
│   ├── Home.tsx
│   └── jeux/
│       └── snake/
│           ├── SnakeGame.tsx
│           ├── style.css
│           └── README.md
```

---

## 🐍 Exemple de jeu : Snake

### `src/pages/jeux/snake/SnakeGame.tsx`

```tsx
import { useEffect, useState, useRef } from "react";

type Position = { x: number; y: number };
const gridSize = 20;

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [dir, setDir] = useState<Position>({ x: 0, y: -1 });
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [gameOver, setGameOver] = useState(false);

  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp": setDir({ x: 0, y: -1 }); break;
        case "ArrowDown": setDir({ x: 0, y: 1 }); break;
        case "ArrowLeft": setDir({ x: -1, y: 0 }); break;
        case "ArrowRight": setDir({ x: 1, y: 0 }); break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = { x: prev[0].x + dir.x, y: prev[0].y + dir.y };
        if (head.x < 0 || head.y < 0 || head.x >= gridSize || head.y >= gridSize || prev.some(p => p.x === head.x && p.y === head.y)) {
          setGameOver(true);
          return prev;
        }
        const newSnake = [head, ...prev];
        if (head.x === food.x && head.y === food.y) {
          setFood({ x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) });
          return newSnake;
        }
        return newSnake.slice(0, -1);
      });
    }, 150);
    return () => clearInterval(interval);
  }, [dir, food, gameOver]);

  return (
    <div ref={boardRef} className="grid grid-cols-20 gap-0 w-[400px] h-[400px] border bg-black">
      {[...Array(gridSize * gridSize)].map((_, i) => {
        const x = i % gridSize;
        const y = Math.floor(i / gridSize);
        const isSnake = snake.some(p => p.x === x && p.y === y);
        const isFood = food.x === x && food.y === y;
        return (
          <div key={i} className={`w-5 h-5 ${isSnake ? "bg-green-500" : isFood ? "bg-red-500" : "bg-gray-900"}`} />
        );
      })}
      {gameOver && <div className="absolute text-white text-xl">Game Over</div>}
    </div>
  );
}
```

---

### `src/pages/jeux/snake/README.md`

```markdown
# Snake

Jeu classique du serpent.
- Flèches directionnelles pour jouer.
- Manger la nourriture rouge.
- Éviter de toucher les murs ou soi-même.

Développé avec React.
```

---

Tu es maintenant prêt à coder et à intégrer tes jeux !