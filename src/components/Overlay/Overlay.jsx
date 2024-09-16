import './Overlay.css';
import { getImagePath } from '../../lib/utils';
import { rectangle, circleClip } from '../../assets/paths';

const Overlay = ({ data }) => {
  const { id, text, img } = data;
  const type = id.startsWith('m') ? 'movie' : 'star';
  const imgPath = getImagePath(img);
  return (
    <div className={`overlay ${type}`}>
      <svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
        <g fill='var(--bg)'>
          <path d={rectangle} />
        </g>
        <defs>
          <clipPath id={`${id}-piece-clip-path`}>
            <path d={circleClip} />
          </clipPath>
        </defs>
        <image
          xlinkHref={imgPath}
          x='5'
          y='-5'
          width='90'
          clipPath={`url(#${id}-piece-clip-path)`}
        />
        <g strokeWidth='4' stroke='white' fill='none'>
          <path d={rectangle} />
        </g>
      </svg>
      <p>{text}</p>
    </div>
  );
};

export default Overlay;
