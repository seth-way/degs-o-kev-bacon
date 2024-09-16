import { useState, useEffect } from 'react';
import './Bubble.css';
import { useDroppable } from '@dnd-kit/core';
import { getImagePath } from '../../lib/utils';

const Bubble = ({ id, image, type }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
    data: {
      accepts: [type],
    },
    disabled: image !== '',
  });

  const style = type === 'hub' ? {color: 'var(--hub-color)'} : {
    color: isOver ? 'black' : 'currentColor',
  };

  return (
    <div id={id} ref={setNodeRef} style={style} className='bubble'>
      <svg viewBox='0 0 100 100' fill='none'>
        <circle
          cx='50'
          cy='50'
          r='47'
          strokeWidth='6'
          stroke='currentColor'
          fill='var(--bg)'
        />
        <defs>
          <clipPath id={`${id}-clip-path`}>
            <circle cx='50' cy='50' r='44' />
          </clipPath>
        </defs>
        {image && (
          <image
            xlinkHref={getImagePath(image)}
            x='5'
            y='-5'
            width='90'
            clipPath={`url(#${id}-clip-path)`}
          />
        )}
      </svg>
    </div>
  );
};

export default Bubble;
