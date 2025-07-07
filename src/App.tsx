// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SnakeGame from './pages/jeux/snake/SnakeGame';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/snake" element={<SnakeGame />} />
        {/* Tu ajouteras d'autres jeux ici */}
      </Routes>
    </BrowserRouter>
  );
}
