import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokedexList from './components/PokedexList';
import PokemonDetail from './components/PokemonDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokedexList />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
