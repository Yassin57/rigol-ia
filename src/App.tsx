// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SnakeGame from "./pages/jeux/snake/SnakeGame";
import PongGame from "./pages/jeux/pong/PongGame";
import SokobanGame from "./pages/jeux/sokoban/SokobanGame";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/snake" element={<SnakeGame />} />
        <Route path="/pong" element={<PongGame />} />
        <Route path="/sokoban" element={<SokobanGame />} />
        {/* Tu ajouteras d'autres jeux ici */}
      </Routes>
    </BrowserRouter>
  );
}
