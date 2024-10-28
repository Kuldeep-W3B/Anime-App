import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DemonSlayerCharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(10);
  const [error, setError] = useState(null); // Add error state
  const charactersPerPage = 10;

  const fetchCharacters = async (page) => {
    setLoading(true);
    setError(null); // Reset error before each request
    try {
      // Replace with a valid API URL
      const url = `https://www.demonslayer-api.com/api/v1/characters?page=${page}&limit=${charactersPerPage}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch characters: ${response.statusText}`);
      }

      const data = await response.json();
      setCharacters(data.data);
      setTotalPages(data.total_pages || 10);
    } catch (error) {
      setError(error.message); // Catch any fetch-related errors
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 py-8 px-4 lg:px-24">
      <h1 className="text-4xl text-center text-white font-bold mb-8">Demon Slayer Characters</h1>

      {loading ? (
        <p className="text-center text-white text-2xl">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-2xl">{error}</p> // Display error
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {characters.map((character) => (
            <li
              key={character.id}
              className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-200 ease-in-out"
            >
              <Link to={`/demon-slayer/${character.id}`}>
                <img
                  className="w-32 h-32 mx-auto rounded-full"
                  src={character.image}
                  alt={character.name}
                />
                <h2 className="text-xl font-bold capitalize mt-4">{character.name}</h2>
                <p className="text-gray-700">Gender: {character.gender}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-white text-purple-600 font-bold rounded-lg shadow-md hover:bg-purple-100 transition ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Previous
        </button>

        {renderPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-4 py-2 font-bold rounded-lg shadow-md hover:bg-purple-100 transition ${
              currentPage === pageNumber ? 'bg-purple-600 text-white' : 'bg-white text-purple-600'
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-white text-purple-600 font-bold rounded-lg shadow-md hover:bg-purple-100 transition ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DemonSlayerCharactersPage;
