import './Triangles.css';
import { useState, useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import Droppable from '../DnD/Droppable';
import { getImagePath } from '../../lib/utils';

const TriangleDown = ({ id, image, type }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
    data: {
      accepts: [type],
    },
    disabled: image !== '',
  });

  const style = {
    color: isOver ? 'black' : 'currentColor',
  };

  return (
    <div id={id} ref={setNodeRef} style={style} className='triangle'>
      <svg
        viewBox='0 0 100 100'
        fill='black'
        xmlns='http://www.w3.org/2000/svg'
      >
        <polygon
          strokeWidth='4'
          stroke='currentColor'
          points='3 3, 97 3, 50 91'
          fill='var(--bg)'
        />
        <defs>
          <clipPath id={`${id}-clip-path`}>
            <polygon points='6.5 5, 93.5 5, 50 88' />
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

export default TriangleDown;
