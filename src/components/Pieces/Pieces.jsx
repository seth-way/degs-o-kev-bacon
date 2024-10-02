import './Pieces.css';
import PropTypes from 'prop-types';
import { useDroppable } from '@dnd-kit/core';
import useWindowStore from '../../state/useWindowStore';
import Piece from '../Piece/Piece';
import { Star, Clapperboard } from 'lucide-react';

const Pieces = ({ type }) => {
	const { setNodeRef } = useDroppable({
		id: `droppable-${type}`,
		data: {
			accepts: [type]
		}
	});

	const layout = useWindowStore(state => state.layout);

	return (
		<div
			className={`pieces ${type} ${layout}`}
			ref={setNodeRef}
			id={`pieces-${type}`}
			aria-label={`${type} pieces`}>
			{new Array(6).fill().map((_, idx) => (
				<Piece key={`${type}_piece_${idx}`} type={type} idx={idx} />
			))}
			{type === 'star' ? <Star id="star-marker" /> : <Clapperboard id="movie-marker" />}
		</div>
	);
};

export default Pieces;

Pieces.propTypes = {
	type: PropTypes.string
};
