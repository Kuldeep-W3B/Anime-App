import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const DragonBallDetailPage = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://dragonball-api.com/api/characters/${id}`);
        if (!response.ok) throw new Error('Failed to fetch character details.');
        const data = await response.json();

        console.log('Fetched character data:', data);

        setCharacter(data.character || data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetail();
  }, [id]);

  if (loading) {
    return <div className="text-center text-white text-2xl mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-2xl mt-8">Error: {error}</div>;
  }

  if (!character) {
    return <div className="text-center text-white text-2xl mt-8">Character not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 via-gray-800 to-black p-8">
      <h1 className="text-4xl text-center text-white font-bold mb-8">{character.name}</h1>

      {/* Character Details */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <Link to="/dragon-ball">
          <button className="inline-block px-4 py-2 mt-4 ml-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors">
            ← Back to List
          </button>
        </Link>
        <div className="w-full h-[600px] bg-black flex items-center justify-center overflow-hidden">
          <img
            src={character.image || 'https://via.placeholder.com/400'}
            alt={character.name}
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold">Details</h2>
          <p className="text-lg mt-4">Race: {character.race || 'Unknown'}</p>
          <p className="text-lg mt-2">Ki: {character.ki || 'Unknown'}</p>
          <p className="text-lg mt-2">Max Ki: {character.maxKi || 'Unknown'}</p>
          <p className="text-lg mt-2">Affiliation: {character.affiliation || 'Unknown'}</p>
          <p className="text-lg mt-2">Description: {character.description || 'No description available'}</p>
        </div>
      </div>
    </div>
  );
};

export default DragonBallDetailPage;
