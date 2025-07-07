import React, { useRef, useEffect, useState } from "react";

const WIDTH = 600;
const HEIGHT = 400;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 80;
const BALL_SIZE = 12;
const PADDLE_SPEED = 6;
const BALL_SPEED = 5;

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

const PongGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playerY, setPlayerY] = useState(HEIGHT / 2 - PADDLE_HEIGHT / 2);
  const [aiY, setAiY] = useState(HEIGHT / 2 - PADDLE_HEIGHT / 2);
  const [ball, setBall] = useState({
    x: WIDTH / 2 - BALL_SIZE / 2,
    y: HEIGHT / 2 - BALL_SIZE / 2,
    vx: BALL_SPEED * (Math.random() > 0.5 ? 1 : -1),
    vy: BALL_SPEED * (Math.random() * 2 - 1),
  });
  const [score, setScore] = useState({ player: 0, ai: 0 });
  const [running, setRunning] = useState(true);

  // Handle keyboard
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!running) return;
      if (e.key === "ArrowUp") {
        setPlayerY((y) => clamp(y - PADDLE_SPEED, 0, HEIGHT - PADDLE_HEIGHT));
      } else if (e.key === "ArrowDown") {
        setPlayerY((y) => clamp(y + PADDLE_SPEED, 0, HEIGHT - PADDLE_HEIGHT));
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [running]);

  // Game loop
  useEffect(() => {
    if (!running) return;
    let animationId: number;
    function gameLoop() {
      setBall((prev) => {
        let { x, y, vx, vy } = prev;
        x += vx;
        y += vy;
        // Collisions haut/bas
        if (y <= 0 || y + BALL_SIZE >= HEIGHT) vy = -vy;
        // Collisions avec le joueur
        if (
          x <= PADDLE_WIDTH &&
          y + BALL_SIZE > playerY &&
          y < playerY + PADDLE_HEIGHT
        ) {
          vx = -vx;
          x = PADDLE_WIDTH;
        }
        // Collisions avec l'IA
        if (
          x + BALL_SIZE >= WIDTH - PADDLE_WIDTH &&
          y + BALL_SIZE > aiY &&
          y < aiY + PADDLE_HEIGHT
        ) {
          vx = -vx;
          x = WIDTH - PADDLE_WIDTH - BALL_SIZE;
        }
        // Point marqué
        if (x < 0) {
          setScore((s) => ({ ...s, ai: s.ai + 1 }));
          return {
            x: WIDTH / 2 - BALL_SIZE / 2,
            y: HEIGHT / 2 - BALL_SIZE / 2,
            vx: BALL_SPEED,
            vy: BALL_SPEED * (Math.random() * 2 - 1),
          };
        }
        if (x > WIDTH) {
          setScore((s) => ({ ...s, player: s.player + 1 }));
          return {
            x: WIDTH / 2 - BALL_SIZE / 2,
            y: HEIGHT / 2 - BALL_SIZE / 2,
            vx: -BALL_SPEED,
            vy: BALL_SPEED * (Math.random() * 2 - 1),
          };
        }
        return { x, y, vx, vy };
      });
      // IA simple
      setAiY((aiY) => {
        const target = ball.y + BALL_SIZE / 2 - PADDLE_HEIGHT / 2;
        if (aiY < target) return clamp(aiY + PADDLE_SPEED * 0.7, 0, HEIGHT - PADDLE_HEIGHT);
        if (aiY > target) return clamp(aiY - PADDLE_SPEED * 0.7, 0, HEIGHT - PADDLE_HEIGHT);
        return aiY;
      });
      animationId = requestAnimationFrame(gameLoop);
    }
    animationId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationId);
    // eslint-disable-next-line
  }, [playerY, aiY, running]);

  // Draw
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    // Fond
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    // Filet
    ctx.strokeStyle = "#fff";
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(WIDTH / 2, 0);
    ctx.lineTo(WIDTH / 2, HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);
    // Paddles
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, playerY, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillRect(WIDTH - PADDLE_WIDTH, aiY, PADDLE_WIDTH, PADDLE_HEIGHT);
    // Ball
    ctx.fillRect(ball.x, ball.y, BALL_SIZE, BALL_SIZE);
    // Score
    ctx.font = "32px monospace";
    ctx.fillText(score.player.toString(), WIDTH / 2 - 60, 40);
    ctx.fillText(score.ai.toString(), WIDTH / 2 + 40, 40);
  }, [playerY, aiY, ball, score]);

  function handleRestart() {
    setScore({ player: 0, ai: 0 });
    setBall({
      x: WIDTH / 2 - BALL_SIZE / 2,
      y: HEIGHT / 2 - BALL_SIZE / 2,
      vx: BALL_SPEED * (Math.random() > 0.5 ? 1 : -1),
      vy: BALL_SPEED * (Math.random() * 2 - 1),
    });
    setPlayerY(HEIGHT / 2 - PADDLE_HEIGHT / 2);
    setAiY(HEIGHT / 2 - PADDLE_HEIGHT / 2);
    setRunning(true);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">🏓 Pong Arcade</h2>
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        className="border-4 border-white rounded bg-black mb-4"
        tabIndex={0}
      />
      <div className="mb-2">Score: Joueur {score.player} - IA {score.ai}</div>
      <div className="mb-4 text-sm text-gray-300">Utilise les flèches ↑ et ↓ pour déplacer ta raquette</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleRestart}
      >
        Recommencer
      </button>
    </div>
  );
};

export default PongGame;
