import './Triangles.css';
import PropTypes from 'prop-types';
import usePuzzleStore from '../../state/usePuzzleStore';
import { useDroppable } from '@dnd-kit/core';
import { getImagePath } from '../../lib/utils';
import { Star, Clapperboard } from 'lucide-react';

const TriangleUp = ({ id }) => {
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

export default TriangleUp;

TriangleUp.propTypes = {
  id: PropTypes.string,
};
