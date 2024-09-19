import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const initialZones = {
  hub: { img: '', text: '', current: '' },
  t1: { img: '', text: '', current: '' },
  t2: { img: '', text: '', current: '' },
  t3: { img: '', text: '', current: '' },
  t4: { img: '', text: '', current: '' },
  t5: { img: '', text: '', current: '' },
  t6: { img: '', text: '', current: '' },
  b1: { img: '', text: '', current: '' },
  b2: { img: '', text: '', current: '' },
  b3: { img: '', text: '', current: '' },
  b4: { img: '', text: '', current: '' },
  b5: { img: '', text: '', current: '' },
  b6: { img: '', text: '', current: '' },
};
// puzzle has a .hub .movies .stars and .wheel
const usePuzzleStore = create(
  immer(set => ({
    /* PUZZLES */
    puzzles: [],
    setPuzzles: newPuzzles =>
      set(state => {
        state.puzzles = newPuzzles;
      }),
    /* PUZZLE */
    puzzle: {},
    setPuzzle: newPuzzle =>
      set(state => {
        state.puzzle = newPuzzle;
        state.zones.hub = newPuzzle.hub;
      }),
    clearPuzzle: () =>
      set(state => {
        state.puzzle = {};
        state.zones = { ...initialZones };
        state.pieces = { stars: [], movies: [] };
      }),
    isSolved: false,
    setIsSolved: status =>
      set(state => {
        state.isSolved = status;
      }),
    isLoading: true,
    setIsLoading: status =>
      set(state => {
        state.isLoading = status;
      }),
    /* DROP ZONES */
    zones: { ...initialZones },
    updateZone: (zone, info) =>
      set(state => {
        state.zones[zone] = info;
        const isSolved = state.puzzle.checkGame(state.zones);
        state.isSolved = isSolved;
      }),
    /* PIECES */
    pieces: { stars: [], movies: [] },
    initialPieces: { stars: [], movies: [] },
    initializePieces: (layout, length) =>
      set(state => {
        state.pieces.stars = getInitialPlacements(
          state.puzzle.stars,
          layout,
          length
        );
        state.pieces.movies = getInitialPlacements(
          state.puzzle.movies,
          layout,
          length
        );

        state.initialPieces.stars = getInitialPlacements(
          state.puzzle.stars,
          layout,
          length
        );
        state.initialPieces.movies = getInitialPlacements(
          state.puzzle.movies,
          layout,
          length
        );
      }),
    resetGame: () =>
      set(state => {
        state.pieces = { ...state.initialPieces };
        state.zones = { ...initialZones };
        state.zones.hub = state.puzzle.hub;
        state.isSolved = false;
      }),
    movePiece: (type, idx, left, top) =>
      set(state => {
        state.pieces[type][idx].left += left;
        state.pieces[type][idx].top += top;
      }),
    togglePiece: (type, idx, opacity) =>
      set(state => {
        state.pieces[type][idx].opacity = opacity;
      }),
  }))
);

export default usePuzzleStore;

function getPieceInfo(idx, layout, length, info) {
  return layout === 'landscape'
    ? {
        top: (idx / 6) * length * 0.88,
        left: (idx / 6) * length * 0.3,
        color: 'var(--piece-color)',
        ...info,
      }
    : {
        left: (idx / 6) * length * 0.88,
        top: (idx / 6) * length * 0.3,
        color: 'var(--piece-color)',
        ...info,
      };
}

function getInitialPlacements(data, layout, length) {
  const placements = Object.values(data).map((info, idx) =>
    getPieceInfo(idx, layout, length, info)
  );
  return placements;
}
