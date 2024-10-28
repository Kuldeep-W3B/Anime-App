import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const DemonSlayerDetailPage = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://www.demonslayer-api.com/api/v1/characters/${id}`);
        if (!response.ok) throw new Error('Failed to fetch character details.');
        const data = await response.json();
        setCharacter(data);
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
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <Link to="/demon-slayer">
          <button className="inline-block px-4 py-2 mt-4 ml-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors">
            ← Back to List
          </button>
        </Link>

        {/* Character Image and Name */}
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-96 object-cover rounded-t-lg"
        />
        <div className="p-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{character.name}</h1>

          {/* Character Details */}
          <p className="text-lg text-gray-700 mt-2"><strong>Race:</strong> {character.race || 'Unknown'}</p>
          <p className="text-lg text-gray-700 mt-2"><strong>Gender:</strong> {character.gender || 'Unknown'}</p>
          <p className="text-lg text-gray-700 mt-2"><strong>Description:</strong> {character.description || 'No description available'}</p>
        </div>
      </div>
    </div>
  );
};

export default DemonSlayerDetailPage;
