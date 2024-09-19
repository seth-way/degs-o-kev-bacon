import './GameBoard.css';
import { useEffect } from 'react';
import usePuzzleStore from '../../state/usePuzzleStore';
import useWindowStore from '../../state/useWindowStore';
import { DndContext } from '@dnd-kit/core';
import { useParams } from 'react-router-dom';
import PlayArea from '../PlayArea/PlayArea';
import Pieces from '../Pieces/Pieces';
import Loading from '../Loading/Loading';
import Puzzle from '../../lib/Puzzle';
import { getPuzzle } from '../../lib/apiCalls';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Link } from 'react-router-dom';
import { House, RotateCcw, CircleHelp } from 'lucide-react';

const dropZones = ['t', 'b'].flatMap(letter =>
  Array(6)
    .fill(null)
    .map((_, idx) => letter + (idx + 1))
);

const GameBoard = () => {
  const { puzzleId } = useParams();
  const puzzle = usePuzzleStore(state => state.puzzle);
  const isLoading = usePuzzleStore(state => state.isLoading);
  const setIsLoading = usePuzzleStore(state => state.setIsLoading);
  const setPuzzle = usePuzzleStore(state => state.setPuzzle);
  const clearPuzzle = usePuzzleStore(state => state.clearPuzzle);
  const resetGame = usePuzzleStore(state => state.resetGame);
  const initializePieces = usePuzzleStore(state => state.initializePieces);
  const isSolved = usePuzzleStore(state => state.isSolved);
  const pieces = usePuzzleStore(state => state.pieces);
  const movePiece = usePuzzleStore(state => state.movePiece);
  const togglePiece = usePuzzleStore(state => state.togglePiece);
  const zones = usePuzzleStore(state => state.zones);
  const updateZone = usePuzzleStore(state => state.updateZone);
  const size = useWindowStore(state => state.size);
  const layout = useWindowStore(state => state.layout);
  const { height, width } = size;

  useEffect(() => {
    const piecesContainer = document.getElementById('pieces-movie');
    const fetchPuzzle = async id => {
      try {
        const puzzleInfo = await getPuzzle(id);
        if (puzzleInfo instanceof Error) throw puzzleInfo;
        setPuzzle(new Puzzle(puzzleInfo));
        const board = piecesContainer.getBoundingClientRect();
        const length = Math.max(board.height, board.width);
        initializePieces(layout, length);
        if (puzzle.hub?.id) setIsLoading(false);
      } catch (err) {
        console.error('<><> ERROR <><>', err);
      }
    };
    if (puzzleId && piecesContainer) fetchPuzzle(puzzleId);
  }, [puzzleId, setPuzzle, initializePieces, layout, puzzle, setIsLoading]);

  useEffect(() => {
    clearPuzzle;
    setIsLoading(true);
    return () => {
      clearPuzzle();
    };
  }, [clearPuzzle, setIsLoading]);

  return (
    <DndContext
      id={'dnd-context'}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <section
        id='gameboard'
        className={`${layout} ${isLoading ? 'loading' : ''}`}
      >
        <Pieces type='movie' />
        <PlayArea />
        <Pieces type='star' />
        <div className='buttons'>
          <Link to='/'>
            <motion.button
              whileHover={{ scale: 1.07, color: 'var(--hub-color)' }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring' }}
            >
              <House />
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.07, color: 'var(--hub-color)' }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring' }}
            onClick={resetGame}
          >
            <RotateCcw />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.07, color: 'var(--hub-color)' }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring' }}
            onClick={handleGetHint}
          >
            <CircleHelp />
          </motion.button>
        </div>
        <div className='animation-wrapper'>
          {isLoading && <Loading />}
          {isSolved && <Confetti width={width} height={height} />}
        </div>
      </section>
    </DndContext>
  );

  function handleDragEnd(e) {
    const [, idxKey] = e.active.id.split('_');
    if (idxKey) {
      const idx = Number(idxKey);
      const dropTarget = e.collisions[0];
      if (
        dropTarget.id.includes('droppable') ||
        (dropTarget.data?.droppableContainer &&
          !dropTarget.data?.droppableContainer?.disabled &&
          dropTarget?.data?.value > 0.2)
      ) {
        const dragType = e.active?.data?.current?.type;
        const validDrop =
          e.collisions[0]?.data?.droppableContainer?.data?.current?.accepts?.includes(
            dragType
          );
        if (validDrop) {
          movePiece(dragType + 's', idx, e.delta.x, e.delta.y);
          if (dropZones.includes(e.over?.id)) {
            const dropId = e.over.id;
            const dragId = pieces[dragType + 's'][idx].id;
            const dragImg = pieces[dragType + 's'][idx].img;
            const dragText = pieces[dragType + 's'][idx].text;
            updateZone(dropId, {
              current: dragId,
              img: dragImg,
              text: dragText,
            });
            togglePiece(dragType + 's', idx, 0);
          }
        }
      }
    }
  }

  function handleDragStart(e) {
    const [, idxKey] = e.active.id.split('_');
    const pieceIdx = Number(idxKey);
    const type = e.active?.data?.current?.type;
    togglePiece(type + 's', pieceIdx, 1);
    const { id } = pieces[type + 's'][pieceIdx];
    const zone = Object.entries(zones).find(entry => entry[1].current === id);
    if (zone) {
      updateZone(zone[0], { img: '', text: '', current: '' });
    }
  }

  function handleGetHint() {
    const hint = puzzle.giveHint(zones);
    console.log('hint <><>', hint);
  }
};

export default GameBoard;
