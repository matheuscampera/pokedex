import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';  // Certifique-se que o caminho do CSS está correto

import { Button } from '@mui/material';

function PokedexList() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Chamada à API para buscar 20 Pokémon
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=500')
      .then(response => {
        setPokemons(response.data.results);
        setLoading(false);
      })
      .catch(error => {
        setError('Ocorreu um erro ao carregar a Pokédex');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
      {pokemons.map((pokemon, index) => (
        <div key={index} className="pokemon-card">
          <div className="pokemon-img">
            <img 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} 
              alt={pokemon.name} 
            />
          </div>
          <h3 className="pokemon-name">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
          <Link to={`/pokemon/${pokemon.name}`}>
            <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
              DETALHES
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default PokedexList;
