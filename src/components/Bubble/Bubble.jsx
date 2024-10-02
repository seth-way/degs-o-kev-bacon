import './Bubble.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import usePuzzleStore from '../../state/usePuzzleStore';
import { motion } from 'framer-motion';
import { useDroppable } from '@dnd-kit/core';
import { getImagePath } from '../../lib/utils';
import { Star, Clapperboard } from 'lucide-react';

const Bubble = ({ id }) => {
	const [rotation, setRotation] = useState(0);
	const puzzle = usePuzzleStore(state => state.puzzle);
	const zone = usePuzzleStore(state => state.zones[id]);
	const isSolved = usePuzzleStore(state => state.isSolved);
	const hubId = puzzle.hub?.id;

	useEffect(() => {
		if (isSolved) setRotation(prev => prev - 1800);
	}, [isSolved]);

	const type = id === 'hub' ? 'hub' : hubId ? (hubId.startsWith('s') ? 'star' : 'movie') : '';
	const img = zone?.img || '';
	const text = zone?.text || '';
	const { isOver, setNodeRef } = useDroppable({
		id: id,
		data: {
			accepts: [type]
		},
		disabled: img !== ''
	});

	const style =
		type === 'hub'
			? { color: 'var(--hub-color)' }
			: {
					color: isSolved ? 'var(--hub-color)' : isOver ? 'var(--text-2)' : 'currentColor'
			  };

	const initial = { rotate: rotation };
	const animate = { rotate: rotation };
	const transition = { duration: 3, repeat: 0 };
	var ariaLabel = id === 'hub' ? 'Puzzle Hub' : `Movie Star Slot ${id}`;
	ariaLabel += text ? `. Current piece ${text}` : '. No current piece.';
	return (
		<motion.div
			id={id}
			ref={setNodeRef}
			style={style}
			className="bubble"
			initial={initial}
			animate={animate}
			transition={transition}
			aria-label={ariaLabel}>
			<svg viewBox="0 0 100 100" fill="none">
				<circle cx="50" cy="50" r="47" strokeWidth="6" stroke="currentColor" fill="var(--bg)" />
				<defs>
					<clipPath id={`${id}-clip-path`}>
						<circle cx="50" cy="50" r="44" />
					</clipPath>
				</defs>
				{img && (
					<image
						xlinkHref={getImagePath(img)}
						x="5"
						y="-5"
						width="90"
						clipPath={`url(#${id}-clip-path)`}
					/>
				)}
			</svg>
			{!img && type === 'movie' ? <Clapperboard /> : !img && type === 'star' ? <Star /> : ''}
		</motion.div>
	);
};

export default Bubble;

Bubble.propTypes = {
	id: PropTypes.string
};
