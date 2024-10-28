import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Pokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [totalPages, setTotalPages] = useState(40); // Total pages assuming 800 Pokémon and 20 per page
  const [loading, setLoading] = useState(true);

  const pokemonPerPage = 20; // Number of Pokémon per page

  // Fetch Pokémon data from API based on page
  const fetchPokemon = async (page) => {
    setLoading(true);
    const offset = (page - 1) * pokemonPerPage;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonPerPage}&offset=${offset}`;
    const response = await fetch(url);
    const data = await response.json();

    const promises = data.results.map(async (pokemon) => {
      const result = await fetch(pokemon.url).then((res) => res.json());
      return {
        name: result.name,
        image: result.sprites.front_default,
        type: result.types.map((type) => type.type.name).join(', '),
        id: result.id,
      };
    });

    const pokemonData = await Promise.all(promises);
    setPokemonList(pokemonData);
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemon(currentPage); // Fetch Pokémon for the current page
  }, [currentPage]);

  // Pagination logic
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Generate page numbers for pagination (show at least 3)
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 py-8 px-4 lg:px-24">
      <h1 className="text-4xl text-center text-white font-bold mb-8">Pokémon List</h1>

      {/* Pokémon Grid */}
      {loading ? (
        <p className="text-center text-white text-2xl">Loading...</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {pokemonList.map((pokemon) => (
            <li
              key={pokemon.id}
              className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-200 ease-in-out"
            >
              <Link to={`/pokemon/${pokemon.id}`}>
                <img
                  className="w-32 h-32 mx-auto"
                  src={pokemon.image}
                  alt={pokemon.name}
                />
                <h2 className="text-xl font-bold capitalize mt-4">{pokemon.name}</h2>
                <p className="text-gray-700">Type: {pokemon.type}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-white text-indigo-600 font-bold rounded-lg shadow-md hover:bg-indigo-100 transition ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Previous
        </button>

        {/* Render page numbers */}
        {renderPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-4 py-2 font-bold rounded-lg shadow-md hover:bg-indigo-100 transition ${
              currentPage === pageNumber ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-white text-indigo-600 font-bold rounded-lg shadow-md hover:bg-indigo-100 transition ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pokemon;
