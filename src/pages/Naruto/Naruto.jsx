import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NarutoCardPage = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const charactersPerPage = 20;

  const fetchCharacters = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const offset = (page - 1) * charactersPerPage;
      const url = `https://narutodb.xyz/api/character?limit=${charactersPerPage}&offset=${offset}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch characters.');
      const data = await response.json();
      
      // Log the response to verify the structure
      console.log('Fetched data:', data);

      // Check if the response contains the results array
      if (data && Array.isArray(data.characters)) {
        setCharacters(data.characters); // Adjust based on actual API response
        setTotalPages(data.total ? Math.ceil(data.total / charactersPerPage) : 1);
      } else {
        console.warn('Expected `characters` to be an array, but received:', data.characters);
        setCharacters([]);
        setTotalPages(1); // Adjust as needed if no characters are found
      }

    } catch (error) {
      setError(error.message);
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

  if (loading) {
    return <div className="text-center text-white text-2xl mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-2xl mt-8">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 via-gray-800 to-black p-8">
      <h1 className="text-4xl text-center text-white font-bold mb-8">Naruto Characters</h1>

      {/* Characters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {characters.length > 0 ? (
          characters.map((character) => (
            <div
              key={character.id} // Ensure `character.id` is unique
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-200 ease-in-out"
            >
              <Link to={`/naruto/${character.id}`}>
                <img
                  src={character.images[0]} // Adjust according to the actual data
                  alt={character.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h2 className="text-xl font-bold capitalize">{character.name}</h2>
                  <p className="text-gray-700">Clan: {character.clan}</p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center text-white text-xl">No characters available.</div>
        )}
      </div>

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

export default NarutoCardPage;
