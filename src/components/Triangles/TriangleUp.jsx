import './Triangles.css';
import { useState, useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import Droppable from '../DnD/Droppable';
import { getImagePath } from '../../lib/utils';

const TriangleUp = ({ id, image, type }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
    data: {
      accepts: [type],
    },
    disabled: image !== '',
  });

  const style = {
    background: isOver ? 'green' : undefined,
    color: isOver ? 'black' : 'currentColor',
  };
  return (
    <div id={id} ref={setNodeRef} style={style} className='triangle'>
      <svg viewBox='0 0 100 100' fill='black'>
        <polygon
          strokeWidth='4'
          stroke='currentColor'
          points='3 94, 97 94, 50 9'
          fill='var(--bg)'
        />
        <defs>
          <clipPath id={`${id}-clip-path`}>
            <polygon points='6.5 92, 93.5 92, 50 13' />
          </clipPath>
        </defs>
        {image && (
          <image
            xlinkHref={getImagePath(image)}
            x='0'
            y='0'
            width='100'
            clipPath={`url(#${id}-clip-path)`}
          />
        )}
      </svg>
    </div>
  );
};

export default TriangleUp;
