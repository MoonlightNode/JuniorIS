import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import Profile from './components/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
