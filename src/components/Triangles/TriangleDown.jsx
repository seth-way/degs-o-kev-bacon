import './Triangles.css';
import { useShallow } from 'zustand/shallow';
import usePuzzleStore from '../../state/usePuzzleStore';
import { useDroppable } from '@dnd-kit/core';
import { getImagePath } from '../../lib/utils';
import { Star, Clapperboard } from 'lucide-react';

const TriangleDown = ({ id }) => {
  const puzzle = usePuzzleStore(state => state.puzzle);
  const zone = usePuzzleStore(state => state.zones[id]);
  const isSolved = usePuzzleStore(state => state.isSolved);
  const hubId = puzzle.hub?.id;
  const type = hubId ? (hubId.startsWith('m') ? 'star' : 'movie') : '';
  const img = zone?.img || '';
  const text = zone?.text || '';
  const { isOver, setNodeRef } = useDroppable({
    id: id,
    data: {
      accepts: [type],
    },
    disabled: img !== '',
  });

  const style = {
    color: isOver ? 'var(--text-2)' : 'currentColor',
  };

  const className = 'triangle' + (isSolved ? ' solved' : '');

  return (
    <div id={id} ref={setNodeRef} style={style} className={className}>
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
        {img && (
          <image
            xlinkHref={getImagePath(img)}
            x='0'
            y='0'
            width='100'
            clipPath={`url(#${id}-clip-path)`}
          />
        )}
      </svg>
      {text ? (
        <p>{text}</p>
      ) : type === 'movie' ? (
        <Clapperboard />
      ) : type === 'star' ? (
        <Star />
      ) : (
        ''
      )}
    </div>
  );
};

export default TriangleDown;
