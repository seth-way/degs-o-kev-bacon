import './Triangles.css';
import Droppable from '../DnD/Droppable';

const TriangleDown = ({ id, image, type }) => {
  return (
    <Droppable id={id} className='triangle' type={type}>
      <svg
        viewBox='0 0 100 100'
        fill='black'
        xmlns='http://www.w3.org/2000/svg'
      >
        <polygon
          strokeWidth='4'
          stroke='var(--t-outline)'
          points='3 3, 97 3, 50 91'
          fill='var(--bg)'
        />
        <defs>
          <clipPath id={`${id}-clip-path`}>
            <polygon points='6.5 5, 93.5 5, 50 88' />
          </clipPath>
        </defs>
        {/* <image
    xlinkHref={image}
    x="0"
    y="-20"
    width="100"
    clipPath={`${id}-clip-path`}
  /> */}
      </svg>
      {/* <svg viewBox='0 0 150 130' fill='black'>
        <polygon
          strokeWidth='6'
          stroke='var(--t-outline)'
          points='3.75 0.5, 146.25 0.5, 75 124'
        />
        <defs>
          <clipPath id={pathId}>
            <polygon points='8.9 3.5, 141.1 3.5, 75 118' />
          </clipPath>
        </defs>
        <image
          xlinkHref={image}
          x='25'
          y='-20'
          width='100'
          clipPath={`${id}-clip-path`}
        />
      </svg> */}
    </Droppable>
  );
};

export default TriangleDown;
