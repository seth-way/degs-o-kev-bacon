import './Piece.css';
import PropTypes from 'prop-types';
import usePuzzleStore from '../../state/usePuzzleStore';
import { useDraggable } from '@dnd-kit/core';
import { rectangle, circleClip } from '../../assets/paths';
import { getImagePath } from '../../lib/utils';

const Piece = ({ idx, type }) => {
	const { attributes, listeners, transform, node } = useDraggable({
		id: `${type[0]}_${idx}`,
		data: {
			type: type
		}
	});

	const pieceInfo = usePuzzleStore(state => state.pieces[type + 's'][idx]);

	if (!pieceInfo) return <></>;

	const { color, id, img, text, left, top, opacity } = pieceInfo;
	const imgPath = getImagePath(img);

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 10px)`
		  }
		: undefined;

	return (
		<button
			ref={node}
			style={{ ...style, color, left, top, opacity }}
			{...listeners}
			{...attributes}
			id={id}
			className={`piece ${type}`}>

			<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="piece-img">
				<g fill="var(--bg)">
					<path d={rectangle} />
				</g>
				<defs>
					<clipPath id={`${id}-piece-clip-path`}>
						<path d={circleClip} />
					</clipPath>
				</defs>
				<image
					xlinkHref={imgPath}
					x="5"
					y="-5"
					width="90"
					clipPath={`url(#${id}-piece-clip-path)`}
				/>
			</svg>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="piece-overlay">
				<g strokeWidth="4" stroke="currentColor" fill="none">
					<path d={rectangle} />
				</g>
			</svg>
			<p>{text}</p>
		</button>
	);
};

export default Piece;

Piece.propTypes = {
	idx: PropTypes.number,
	type: PropTypes.string
};
