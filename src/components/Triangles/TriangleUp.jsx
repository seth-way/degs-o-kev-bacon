import './Triangles.css';
import Droppable from '../DnD/Droppable';

const TriangleUp = ({ id, image, type }) => {
  return (
    <Droppable className='triangle' id={id} type={type}>
      <svg viewBox="0 0 100 100" fill="black">
  <polygon
    strokeWidth="4"
    stroke="var(--t-outline)"
    points="3 94, 97 94, 50 9"
    fill='var(--bg)'
  />
  <defs>
    <clipPath id={`${id}-clip-path`}>
      <polygon points="6.5 92, 93.5 92, 50 13" />
    </clipPath>
  </defs>
  {/* <image
    xlinkHref={image}
    x="0"
    y="0"
    width="100"
    clipPath={`${id}-clip-path`}
  /> */}
</svg>
      {/* <svg viewBox='0 0 150 130' fill='black'>
        <polygon
          strokeWidth='6'
          stroke='var(--t-outline)'
          points='3.75 129.5, 146.25 129.5, 75 6'
        />
        <defs>
          <clipPath id={pathId}>
            <polygon points='8.9 126.5, 141.1 126.5, 75 12' />
          </clipPath>
        </defs>
        <image
          xlinkHref={image}
          x='25'
          y='0'
          width='100'
          clipPath={`${id}-clip-path`}
        />
      </svg> */}
    </Droppable>
  );
};

export default TriangleUp;
