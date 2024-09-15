import './Bubble.css';
import Droppable from '../DnD/Droppable';
import { getImagePath } from '../../lib/utils';

const Bubble = ({ id, image, type }) => {
  console.log('type <><>', type, id);
  return (
    <Droppable className='bubble' id={id} type={type}>
      <svg viewBox='0 0 100 100' fill='none'>
        <circle
          cx='50'
          cy='50'
          r='47'
          strokeWidth='6'
          stroke='var(--b-outline)'
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
    </Droppable>
  );
};

export default Bubble;
