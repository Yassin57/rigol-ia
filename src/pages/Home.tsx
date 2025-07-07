// src/pages/Home.tsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 text-center">
      <h1 className="text-3xl font-bold mb-6">Bienvenue sur la plateforme de jeux IA</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Link to="/snake" className="bg-white shadow p-4 rounded hover:shadow-md hover:bg-green-100 transition">
          <h2 className="text-xl font-semibold">🐍 Snake</h2>
          <p className="text-gray-600 text-sm">Le classique du serpent</p>
        </Link>
        {/* Ajoute ici d'autres jeux */}
      </div>
    </div>
  );
}
