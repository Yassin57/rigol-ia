import { useEffect, useRef, useState } from "react";

type Cell = " " | "#" | "$" | "." | "@" | "*" | "+";
type Position = { x: number; y: number };

const LEVEL = [
  "  #####  ",
  "###   # ",
  "#.$@$ # ",
  "###  .# ",
  "#  #  # ",
  "########"
];

function parseLevel(level: string[]) {
  const grid = level.map(row => row.trimEnd().split("") as Cell[]);
  let player: Position = { x: 0, y: 0 };
  grid.forEach((row, y) =>
    row.forEach((cell, x) => {
      if (cell === "@" || cell === "+") player = { x, y };
    })
  );
  return { grid, player };
}

function cloneGrid(grid: Cell[][]) {
  return grid.map(row => [...row]);
}

export default function SokobanGame() {
  const [{ grid, player }, setState] = useState(() => parseLevel(LEVEL));
  const [won, setWon] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (won) return;
      let dx = 0, dy = 0;
      switch (e.key) {
        case "ArrowUp": dy = -1; break;
        case "ArrowDown": dy = 1; break;
        case "ArrowLeft": dx = -1; break;
        case "ArrowRight": dx = 1; break;
        default: return;
      }
      move(dx, dy);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [grid, player, won]);

  function move(dx: number, dy: number) {
    const { x, y } = player;
    const nx = x + dx, ny = y + dy;
    const nnx = x + 2 * dx, nny = y + 2 * dy;
    const g = cloneGrid(grid);

    const target = g[ny]?.[nx];
    if (!target || target === "#") return;

    // If box or box on goal
    if (target === "$" || target === "*") {
      const beyond = g[nny]?.[nnx];
      if (!beyond || beyond === "#" || beyond === "$" || beyond === "*") return;
      // Move box
      g[ny][nx] = (target === "*") ? "." : " ";
      g[nny][nnx] = (beyond === ".") ? "*" : "$";
    }

    // Move player
    const wasGoal = g[y][x] === "+";
    g[y][x] = wasGoal ? "." : " ";
    g[ny][nx] = (target === ".") ? "+" : "@";

    setState({ grid: g, player: { x: nx, y: ny } });

    // Check win
    if (g.flat().every(cell => cell !== "$")) setWon(true);
  }

  function getSprite(cell: Cell) {
    switch (cell) {
      case "#": return <div className="bg-gray-700 w-8 h-8" />;
      case "$": return <div className="bg-yellow-600 w-8 h-8" />;
      case ".": return <div className="bg-blue-300 w-8 h-8" />;
      case "@": return <div className="bg-green-600 w-8 h-8" />;
      case "+": return <div className="bg-green-600 w-8 h-8 border-2 border-blue-300" />;
      case "*": return <div className="bg-yellow-600 w-8 h-8 border-2 border-blue-300" />;
      default: return <div className="w-8 h-8" />;
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-2">🧱 Sokoban</h2>
      <div
        ref={boardRef}
        className="relative"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${grid[0].length}, 2rem)`,
          gridTemplateRows: `repeat(${grid.length}, 2rem)`,
          gap: 0,
          background: "#222",
          border: "2px solid #444"
        }}
      >
        {grid.map((row, y) =>
          row.map((cell, x) => (
            <div key={x + "," + y} style={{ width: 32, height: 32 }}>
              {getSprite(cell)}
            </div>
          ))
        )}
        {won && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white text-2xl font-bold">
            Gagné !
          </div>
        )}
      </div>
      <div className="mt-4 text-gray-600 text-sm">Utilisez les flèches du clavier pour jouer</div>
    </div>
  );
}