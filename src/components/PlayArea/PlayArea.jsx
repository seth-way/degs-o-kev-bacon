import { useState, useEffect } from 'react';
import './PlayArea.css';
import { useDndMonitor } from '@dnd-kit/core';
import usePuzzleStore from '../../state/usePuzzleStore';
import useWindowStore from '../../state/useWindowStore';
import TriangleUp from '../Triangles/TriangleUp';
import TriangleDown from '../Triangles/TriangleDown';
import Bubble from '../Bubble/Bubble';
import { motion } from 'framer-motion';

const dropZones = ['t', 'b'].flatMap(letter =>
  Array(6)
    .fill(null)
    .map((_, idx) => letter + (idx + 1))
);

const PlayArea = () => {
  //const game = useGameStore(state => state.game);
  const isSolved = usePuzzleStore(state => state.isSolved);
  const puzzle = usePuzzleStore(state => state.puzzle);
  const layout = useWindowStore(state => state.layout);

  const initial = { rotate: 0 };
  const animate = isSolved ? { rotate: 1080 } : {};
  const transition = { duration: 3, repeat: 0 };
  const className = layout + (isSolved ? ' solved' : '');

  return (
    <motion.section
      id='puzzle'
      initial={initial}
      animate={animate}
      transition={transition}
      className={className}
    >
      <TriangleUp id='t1' />
      <TriangleDown id='t2' />
      <TriangleUp id='t3' />
      <TriangleDown id='t4' />
      <TriangleUp id='t5' />
      <TriangleDown id='t6' />
      <Bubble id='hub' />
      <Bubble id='b1' />
      <Bubble id='b2' />
      <Bubble id='b3' />
      <Bubble id='b4' />
      <Bubble id='b5' />
      <Bubble id='b6' />
    </motion.section>
  );
};

export default PlayArea;
