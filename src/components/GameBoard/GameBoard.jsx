import './GameBoard.css';
import { useState, useEffect } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { useParams } from 'react-router-dom';
import useWindowSize from '../../lib/hooks/useWindowSize';
import PlayArea from '../PlayArea/PlayArea';
import Pieces from '../Pieces/Pieces';
import Overlay from '../Overlay/Overlay';
import Puzzle from '../../lib/Puzzle';
import { getPuzzle } from '../../lib/apiCalls';

const GameBoard = () => {
  const { puzzleId } = useParams();
  const [puzzle, setPuzzle] = useState(null);
  const [width, height] = useWindowSize();
  const [isLandscape, setIsLandscape] = useState(true);

  useEffect(() => {
    if (height > width) setIsLandscape(false);
    else {
      setIsLandscape(true);
    }
  }, [width, height]);

  useEffect(() => {}, []);

  useEffect(() => {
    const fetchPuzzle = async id => {
      try {
        const puzzleInfo = await getPuzzle(id);
        if (puzzleInfo instanceof Error) throw puzzleInfo;
        setPuzzle(new Puzzle(puzzleInfo));
      } catch (err) {
        console.error('<><> ERROR <><>', err);
      }
    };
    fetchPuzzle(puzzleId);
  }, []);

  const orientation = isLandscape ? 'landscape' : 'portrait';
  return (
    <DndContext id={'dnd-context'}>
      <section id='gameboard' className={orientation}>
        <Pieces
          type='movie'
          orientation={orientation}
          data={puzzle?.movies || {}}
        />
        <PlayArea puzzle={puzzle} />
        <Pieces
          type='star'
          orientation={orientation}
          data={puzzle?.stars || {}}
        />
      </section>
      {/* <DragOverlay>{active ? <Overlay data={active} /> : null}</DragOverlay> */}
    </DndContext>
  );
};

export default GameBoard;
