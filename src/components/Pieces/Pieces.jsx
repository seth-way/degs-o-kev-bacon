import './Pieces.css';
import { useState, useEffect, useRef } from 'react';
import { useDndMonitor } from '@dnd-kit/core';
import Droppable from '../DnD/Droppable';
import Piece from '../Piece/Piece';

const dropZones = ['t', 'b'].flatMap(letter =>
  Array(6)
    .fill(null)
    .map((_, idx) => letter + (idx + 1))
);

const Pieces = ({ type, orientation, data }) => {
  const zoneRef = useRef(null);
  const [propStyles, setPropStyles] = useState(null);

  useEffect(() => {
    if (zoneRef?.current) {
      const { current } = zoneRef;
      const board = document
        .getElementById('gameboard')
        .getBoundingClientRect();
      const length = Math.min(board.height, board.width);
      const getStyles = orientation === 'landscape' ? (idx) => ({
        top: (idx / 6) * length * 0.9,
        left: (idx / 6) * length * 0.3,
        color: 'var(--piece-color)',
      }) : (idx) => ({
        left: (idx / 6) * length * 0.9,
        top: (idx / 6) * length * 0.3,
        color: 'var(--piece-color)',
      });

      const initialStyles = new Array(6).fill().map((_, idx) => getStyles(idx));

      const stylesById = Object.values(data).reduce((acc, item, idx) => {
        const { id } = item;
        acc[id] = initialStyles[idx];
        return acc;
      }, {});

      setPropStyles(() => stylesById);
    }
  }, [data, orientation]);

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
    <Droppable id={`droppable-${type}`} type={type}>
      <div className={`pieces ${type} ${orientation}`} ref={zoneRef}>
        {Object.values(data).map(item => (
          <Piece
            key={`${item.id}_piece`}
            data={item}
            propStyle={propStyles[item.id]}
          />
        ))}
      </div>
    </Droppable>
  );

  function handleDragStart(e) {
    if (e.active?.data?.current?.type === type) {
      propStyles[e.active.id].opacity = 1;
    }
  }

  function handleDragMove(e) {
    if (e.active?.data?.current?.type === type) {
    }
  }

  function handleDragOver(e) {}

  function handleDragEnd(e) {
    if (
      e.active?.data?.current?.type === type &&
      e.over?.data?.current?.accepts &&
      e.over?.data?.current?.accepts.includes(e.active?.data?.current?.type)
    ) {
      propStyles[e.active.id].left += e.delta.x;
      propStyles[e.active.id].top += e.delta.y;
      if (dropZones.includes(e.over.id)) {
        propStyles[e.active.id].opacity = 0;
      }
    }
  }
};

export default Pieces;
