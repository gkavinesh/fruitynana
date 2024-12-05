import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/landing/landing';
import Login from './components/login/login';
import Register from './components/login/register';
import Dashboard from './components/dashboard/dashboard'
import Game from './components/game/game'
import Type from './components/type/type'
import Difficulty from './components/difficulty/difficulty'
import Begin from './components/begin/begin'
import Explore from './components/explore/explore'
import Score from './components/score/score'
import Profile from './components/profile/profile'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/game" element={<Game />} />
      <Route path="/type" element={<Type />} />
      <Route path="/difficulty" element={<Difficulty />} />
      <Route path="/begin" element={<Begin />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/score" element={<Score />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default App;




