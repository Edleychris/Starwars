import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from './components/Homepage';
import Readmore from './components/Readmore';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/movie/:id" element={<Readmore />} />
    </Routes>
  );
}

export default App;
