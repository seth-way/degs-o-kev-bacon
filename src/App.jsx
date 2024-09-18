import './App.css';
import { useEffect } from 'react';
import usePuzzleStore from './state/usePuzzleStore';
import useWindowStore from './state/useWindowStore';
import useWindowSize from './lib/hooks/useWindowSize';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import GameBoard from './components/GameBoard/GameBoard';
import Error from './components/Error/Error';
import { getPuzzles } from './lib/apiCalls';

function App() {
  const setPuzzles = usePuzzleStore(state => state.setPuzzles);
  const setSize = useWindowStore(state => state.setSize);
  const isSolved = usePuzzleStore(state => state.isSolved);
  useWindowSize();
  useEffect(() => {
    if (window) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setSize({ height, width });
    }
  }, [setSize]);

  useEffect(() => {
    if (isSolved) document.body.style.pointerEvents = 'none';
    else document.body.style.pointerEvents = 'auto';
  }, [isSolved]);

  useEffect(() => {
    const fetchPuzzles = async () => {
      const puzzles = await getPuzzles();
      setPuzzles(puzzles);
    };

    fetchPuzzles();
  }, []);

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
