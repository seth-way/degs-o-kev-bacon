import './App.css';
import { useEffect } from 'react';
import usePuzzleStore from './state/usePuzzleStore';
import useWindowStore from './state/useWindowStore';
import useWindowSize from './lib/hooks/useWindowSize';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home/Home';
import GameBoard from './components/GameBoard/GameBoard';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import Footer from './components/Footer/Footer';
import { getPuzzles } from './lib/apiCalls';

function App() {
  const navigate = useNavigate();
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
      if (puzzles instanceof Error) navigate(`/error/500`);
      setPuzzles(puzzles);
    };

    fetchPuzzles();
  }, []);

  return (
    <main>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='puzzles/:puzzleId' element={<GameBoard />} />
        <Route path='error/:status' element={<ErrorMessage />} />
        <Route path='*' element={<ErrorMessage />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
