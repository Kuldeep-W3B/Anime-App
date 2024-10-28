import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setPokemon({
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default,
        type: data.types.map((type) => type.type.name).join(', '),
        height: data.height,
        weight: data.weight,
        abilities: data.abilities.map((ability) => ability.ability.name).join(', '),
        stats: data.stats.map((stat) => ({
          name: stat.stat.name,
          value: stat.base_stat,
        })),
      });
    };

    fetchPokemonDetail();
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-600 via-purple-600 to-blue-400 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-block px-4 py-2 mt-4 ml-4 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-colors"
        >
          ← Back to List
        </Link>

        {/* Pokémon Image */}
        <div className="p-6 text-center">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="w-56 h-56 mx-auto object-cover drop-shadow-lg animate-fade-in"
          />
          <h1 className="text-4xl capitalize font-bold text-gray-800 mt-4">{pokemon.name}</h1>
          <p className="text-gray-600 text-lg">Type: {pokemon.type}</p>
        </div>

        {/* Pokémon Details */}
        <div className="px-6 pb-6">
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
              <h3 className="text-sm uppercase font-semibold text-gray-600">Height</h3>
              <p className="text-xl font-bold">{pokemon.height / 10} m</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
              <h3 className="text-sm uppercase font-semibold text-gray-600">Weight</h3>
              <p className="text-xl font-bold">{pokemon.weight / 10} kg</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 shadow-sm col-span-2">
              <h3 className="text-sm uppercase font-semibold text-gray-600">Abilities</h3>
              <p className="text-lg">{pokemon.abilities}</p>
            </div>
          </div>

          {/* Pokémon Stats */}
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Base Stats</h2>
            <ul className="space-y-2">
              {pokemon.stats.map((stat) => (
                <li key={stat.name} className="flex justify-between items-center">
                  <span className="capitalize text-gray-600">{stat.name}</span>
                  <div className="bg-gray-200 w-4/5 h-4 rounded-full overflow-hidden ml-4">
                    <div
                      className="bg-indigo-500 h-full"
                      style={{ width: `${stat.value}%` }}
                    ></div>
                  </div>
                  <span className="ml-4 font-semibold text-gray-800">{stat.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
