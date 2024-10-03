import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';  // Certifique-se que o caminho do CSS está correto

import { Button } from '@mui/material';

function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Chamada à API para buscar os detalhes do Pokémon
  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => {
        setPokemon(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Ocorreu um erro ao carregar os detalhes do Pokémon');
        setLoading(false);
      });
  }, [name]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!pokemon) {
    return <div>Pokémon não encontrado</div>;
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <div className="pokemon-card">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-img" />
        <h2 className="pokemon-name">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <p>Tipo: {pokemon.types.map(type => type.type.name).join(', ')}</p>
        <p>Altura: {pokemon.height / 10} m</p>
        <p>Peso: {pokemon.weight / 10} kg</p>
        <Link to="/">
          <Button variant="contained" color="primary">
            VOLTAR PARA A POKÉDEX
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default PokemonDetail;
