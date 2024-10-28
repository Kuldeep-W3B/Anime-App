import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PokemonDetail from './pages/Pokemon/PokemonDetails';
import Pokemon from './pages/Pokemon/Pokemon';
import Navbar from './components/Navbar';
import AnimeCardList from './components/AnimeCards';
import NarutoDetail from './pages/Naruto/Details';
import Naruto from './pages/Naruto/Naruto';
import DragonBallCardPage from './pages/DragonBall/DragonBall';
import DragonBallDetailPage from './pages/DragonBall/Detail';
import DemonSlayerCardPage from './pages/DemonSlayer/DemonSlayer';
import DemonSlayerDetailPage from './pages/DemonSlayer/Detail';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/All" element={<AnimeCardList/>} />
        <Route path="/pokemon" element={<Pokemon />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/naruto" element={<Naruto />} />
        <Route path="/naruto/:id" element={<NarutoDetail />} />
        <Route path="/dragon-ball" element={<DragonBallCardPage />} />
        <Route path="/dragon-ball/:id" element={<DragonBallDetailPage />} />
        <Route path="/demon-slayer" element={<DemonSlayerCardPage />} />
        <Route path="/demon-slayer/:id" element={<DemonSlayerDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
