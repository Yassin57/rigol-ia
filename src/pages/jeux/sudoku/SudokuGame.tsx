import React, { useState } from "react";

const initialBoard: number[][] = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

function isValid(board: number[][], row: number, col: number, val: number) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === val || board[i][col] === val) return false;
  }
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxRow + i][boxCol + j] === val) return false;
    }
  }
  return true;
}

export default function SudokuGame() {
  const [board, setBoard] = useState(initialBoard.map((row) => [...row]));
  const [selected, setSelected] = useState<{ row: number; col: number } | null>(
    null
  );
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);

  function handleInput(row: number, col: number, val: string) {
    if (initialBoard[row][col] !== 0) return;
    const num = parseInt(val);
    if (isNaN(num) || num < 1 || num > 9) return;
    if (!isValid(board, row, col, num)) {
      setError("Mouvement invalide");
      return;
    }
    setError("");
    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = num;
    setBoard(newBoard);
    if (newBoard.flat().every((n) => n !== 0)) setCompleted(true);
  }

  function handleReset() {
    setBoard(initialBoard.map((row) => [...row]));
    setCompleted(false);
    setError("");
  }

  return (
    <div className="flex flex-col items-center mt-4">
      <h2 className="text-2xl font-bold mb-2">Sudoku</h2>
      <div className="grid grid-cols-9 border-2 border-gray-700 bg-white">
        {board.map((row, i) =>
          row.map((cell, j) => (
            <input
              key={`${i}-${j}`}
              className={`w-10 h-10 text-center border border-gray-400 focus:outline-none focus:border-blue-500 text-lg ${
                (i % 3 === 2 && i !== 8 ? "border-b-4 " : "") +
                (j % 3 === 2 && j !== 8 ? "border-r-4 " : "") +
                (initialBoard[i][j] !== 0
                  ? "bg-gray-200 font-bold"
                  : "bg-white")
              }`}
              value={cell === 0 ? "" : cell}
              disabled={initialBoard[i][j] !== 0 || completed}
              onFocus={() => setSelected({ row: i, col: j })}
              onChange={(e) => handleInput(i, j, e.target.value)}
              maxLength={1}
            />
          ))
        )}
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {completed && (
        <div className="text-green-600 mt-2 font-bold">
          Bravo, Sudoku complété !
        </div>
      )}
      <button
        onClick={handleReset}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Réinitialiser
      </button>
    </div>
  );
}
