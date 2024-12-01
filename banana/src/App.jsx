import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/landing/landing';
import Login from './components/login/login';
import Register from './components/login/register';
import Dashboard from './components/dashboard/dashboard'
import Game from './components/game/game'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
};

export default App;




