import './App.css';
import { useState, useEffect, useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import GameBoard from './components/GameBoard/GameBoard';
import Error from './components/Error/Error';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='puzzles/:puzzleId' element={<GameBoard />} />
        <Route path='error/:errorCode' element={<Error />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
