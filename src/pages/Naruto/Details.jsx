import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const NarutoDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://narutodb.xyz/api/character/${id}`);
        if (!response.ok) throw new Error('Failed to fetch character details.');
        const data = await response.json();

        // Log the data to verify its structure
        console.log(data);

        setCharacter({
          name: data.name || 'Unknown',
          image: data.image || 'https://via.placeholder.com/150', // Default image URL
          clan: data.clan || 'Unknown',
          abilities: Array.isArray(data.abilities) ? data.abilities.join(', ') : 'No abilities listed',
          rank: typeof data.rank === 'string' ? data.rank : 'Unknown',
          affiliations: Array.isArray(data.affiliations) ? data.affiliations.join(', ') : 'No affiliations listed',
          background: typeof data.background === 'string' ? data.background : 'No background available',
        });
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
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-block px-4 py-2 mt-4 ml-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          aria-label="Back to List"
        >
          ← Back to List
        </Link>

        {/* Character Image */}
        <div className="p-6 text-center">
          <img
            src={character.image}
            alt={character.name}
            className="w-56 h-56 mx-auto object-cover rounded-full border-4 border-gray-300 shadow-lg"
            style={{ maxWidth: '100%', height: 'auto' }}
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = 'https://via.placeholder.com/150'; // Placeholder image
            }}
          />
          <h1 className="text-4xl capitalize font-bold text-gray-800 mt-4">{character.name}</h1>
          <p className="text-gray-600 text-lg">Clan: {character.clan}</p>
        </div>

        {/* Character Details */}
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
              <h3 className="text-sm uppercase font-semibold text-gray-600">Rank</h3>
              <p className="text-xl font-bold">{character.rank}</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
              <h3 className="text-sm uppercase font-semibold text-gray-600">Affiliations</h3>
              <p className="text-lg">{character.affiliations}</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 shadow-sm col-span-2">
              <h3 className="text-sm uppercase font-semibold text-gray-600">Abilities</h3>
              <p className="text-lg">{character.abilities}</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 shadow-sm col-span-2">
              <h3 className="text-sm uppercase font-semibold text-gray-600">Background</h3>
              <p className="text-lg">{character.background}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NarutoDetail;
