import React from "react";
import { Link } from "react-router-dom";

const animeList = [
  { name: "Naruto", img: "https://i.pinimg.com/originals/82/59/2f/82592f7c6d613c43564632ca4fba0f89.jpg", url: "/naruto" },
  { name: "Demon Slayer", img: "https://wallpapers.com/images/featured/demon-slayer-pictures-tsbyd3y88kxirm15.jpg", url: "/demon-slayer" },
  { name: "Pokemon", img: "https://wallpapers.com/images/featured/all-pokemon-pictures-bh730s8zr74xsc2p.jpg", url: "/pokemon" },
  { name: "Jujutsu Kaisen", img: "https://p325k7wa.twic.pics/high/jujutsu-kaisen/jujutsu-kaisen-cursed-clash/00-page-setup/JJK-header-mobile2.jpg?twic=v1/resize=760/step=10/quality=80", url: "/jujutsu-kaisen" },
  { name: "One Piece", img: "https://wallpapers.com/images/hd/one-piece-pictures-bjm9tdff9yzguoup.jpg", url: "/one-piece" },
  { name: "Dragon Ball", img: "https://miro.medium.com/v2/resize:fit:1024/0*x7XdJME9gv5IEA-N.png", url: "/dragon-ball" },
];

const AnimeCardList = () => {
  return (
    <div className="py-12 px-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <h2 className="text-4xl text-center text-white font-bold mb-8">
        Anime Showcase
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {animeList.map((anime, index) => (
          <Link to={anime.url} key={index} className="bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
            <img
              src={anime.img}
              alt={anime.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4 text-center text-white">
              <h3 className="text-xl font-bold">{anime.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AnimeCardList;
