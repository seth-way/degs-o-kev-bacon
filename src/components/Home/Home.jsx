import './Home.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getImagePath } from '../../lib/utils';
import usePuzzleStore from '../../state/usePuzzleStore';
import Logo from '../Logo/Logo';
import Loading from '../Loading/Loading';

const Home = () => {
	const [isLoading, setIsLoading] = useState(true);
	const puzzles = usePuzzleStore(state => state.puzzles);
	const clearPuzzle = usePuzzleStore(state => state.clearPuzzle);
	const navigate = useNavigate();
  
	useEffect(() => {
		clearPuzzle();
		return () => {
			clearPuzzle();
		};
	}, [clearPuzzle]);

	useEffect(() => {
		setIsLoading(puzzles.length === 0);
	}, [puzzles]);

	return (
		<div id="home">
			<h1 aria-label="six degrees of Kevin Bacon">
				6
				<span className="logo-wrapper">
					<Logo />
				</span>
				&nbsp;of Kevin Bacon
			</h1>
			<p>challenge your movie trivia.</p>
			<div className="buttons">
				{isLoading ? (
					<Loading />
				) : (
					puzzles.map(puzzle => (
						<motion.button
							key={`link_puzzle_${puzzle.id}`}
							whileHover={{ scale: 1.07 }}
							whileTap={{ scale: 0.9 }}
							transition={{ type: 'spring' }}
							className="movie-card"
							onClick={() => navigate(`/puzzles/${puzzle.id}`)}
							aria-label={`To ${puzzle.text} puzzle`}>
							<img src={getImagePath(puzzle.img)} alt={`${puzzle.text} headshot`} />
						</motion.button>
					))
				)}
			</div>
		</div>
	);
};

export default Home;
