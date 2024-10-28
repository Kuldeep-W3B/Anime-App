import React from 'react';
import { useNavigate } from 'react-router-dom';


const HomeHeader = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/all');
  };
  return (
    <header className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          className="w-full h-full object-cover opacity-40"
          src="https://wallpaperaccess.com/full/21001.png" // Example anime-themed background image
          alt="Anime background"
        />
      </div>

      {/* Content Section */}
      <div className="relative z-10 text-center text-white p-8">
        <h1 className="text-6xl font-extrabold mb-4">Welcome to Anime World!</h1>
        <p className="text-xl font-semibold mb-8">
          Dive into a universe of your favorite anime characters and explore exciting adventures.
        </p>

        {/* Call to Action Button */}
        <button 
         onClick={handleExploreClick}
        className="bg-white text-purple-600 hover:bg-purple-200 transition duration-300 ease-in-out font-bold py-3 px-8 rounded-full text-lg shadow-lg">
          Explore Now
        </button>
      </div>
    </header>
  );
};

export default HomeHeader;
