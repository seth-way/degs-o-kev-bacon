import { useState, useEffect } from 'react';
import './PlayArea.css';
import { useDndMonitor } from '@dnd-kit/core';
import TriangleUp from '../Triangles/TriangleUp';
import TriangleDown from '../Triangles/TriangleDown';
import Bubble from '../Bubble/Bubble';
import jaws from '../../assets/images/jaws.jpg';
import kBacon from '../../assets/images/k-bacon.jpeg';

const dropZones = ['t', 'b'].flatMap(letter =>
  Array(6)
    .fill(null)
    .map((_, idx) => letter + (idx + 1))
);

const initialGameState = {
  t3: { img: '', text: '', current: '' },
  t1: { img: '', text: '', current: '' },
  t4: { img: '', text: '', current: '' },
  t5: { img: '', text: '', current: '' },
  t2: { img: '', text: '', current: '' },
  t6: { img: '', text: '', current: '' },
  b1: { img: '', text: '', current: '' },
  b2: { img: '', text: '', current: '' },
  b3: { img: '', text: '', current: '' },
  b4: { img: '', text: '', current: '' },
  b5: { img: '', text: '', current: '' },
  b6: { img: '', text: '', current: '' },
};

const PlayArea = ({ puzzle }) => {
  const [game, setGame] = useState(initialGameState);
  useDndMonitor({
    onDragStart(event) {
      handleDragStart(event);
    },
    onDragOver(event) {
      handleDragOver(event);
    },
    onDragEnd(event) {
      handleDragEnd(event);
    },
    onDragMove(event) {
      handleDragMove(event);
    },
  });

  return (
    <section id='puzzle'>
      <TriangleUp
        id='t1'
        type='movie'
        image={game?.t1?.img}
        text={game?.t1?.text}
      />
      <TriangleDown
        id='t2'
        type='movie'
        image={game?.t2?.img}
        text={game?.t2?.text}
      />
      <TriangleUp
        id='t3'
        type='movie'
        image={game?.t3?.img}
        text={game?.t3?.text}
      />
      <TriangleDown
        id='t4'
        type='movie'
        image={game?.t4?.img}
        text={game?.t4?.text}
      />
      <TriangleUp
        id='t5'
        type='movie'
        image={game?.t5?.img}
        text={game?.t5?.text}
      />
      <TriangleDown
        id='t6'
        type='movie'
        image={game?.t6?.img}
        text={game?.t6?.text}
      />
      <Bubble id='hub' image={puzzle?.hub?.img || ''} type='hub' />
      <Bubble id='b1' type='star' image={game?.b1?.img} text={game?.b1?.text} />
      <Bubble id='b2' type='star' image={game?.b2?.img} text={game?.b2?.text} />
      <Bubble id='b3' type='star' image={game?.b3?.img} text={game?.b3?.text} />
      <Bubble id='b4' type='star' image={game?.b4?.img} text={game?.b4?.text} />
      <Bubble id='b5' type='star' image={game?.b5?.img} text={game?.b5?.text} />
      <Bubble id='b6' type='star' image={game?.b6?.img} text={game?.b6?.text} />
    </section>
  );

  function handleDragOver(e) {}
  function handleDragEnd(e) {
    if (
      e.collisions[0]?.data?.droppableContainer &&
      !e.collisions[0]?.data?.droppableContainer?.disabled
    ) {
      const dragType = e.active?.data?.current?.type;
      const validDrop =
        e.collisions[0]?.data?.droppableContainer?.data?.current?.accepts?.includes(
          dragType
        );
      if (validDrop && dropZones.includes(e.over?.id)) {
        const dropId = e.over.id;
        const dragId = e.active.id;
        const dragImg = dragId.startsWith('m')
          ? puzzle.movies[dragId].img
          : puzzle.stars[dragId].img;
        const dragText = dragId.startsWith('m')
          ? puzzle.movies[dragId].text
          : puzzle.stars[dragId].text;
        setGame(prev => ({
          ...prev,
          [dropId]: { img: dragImg, text: dragText, current: dragId },
        }));
      }
    }
  }
  function handleDragMove(e) {
    //console.log(e);
  }
  function handleDragStart(e) {
    const id = e.active?.id;
    const zone = Object.entries(game).find(entry => entry[1].current === id);
    if (zone) {
      setGame(prev => ({
        ...prev,
        [zone[0]]: { img: '', text: '', current: '' },
      }));
    }
  }
};

export default PlayArea;
