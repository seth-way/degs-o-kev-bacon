import './Home.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getImagePath } from '../../lib/utils';
import usePuzzleStore from '../../state/usePuzzleStore';

const Home = () => {
  const puzzles = usePuzzleStore(state => state.puzzles);
  console.log(puzzles);
  return (
    <div id='home'>
      <h1>6&deg; of Kevin Bacon</h1>
      <p>challenge your movie trivia.</p>
      <div className='buttons'>
        {puzzles.map(puzzle => (
          <Link
            key={`link_puzzle_${puzzle.id}`}
            to={`/puzzles/${puzzle.id}`}
            className='movie-card'
          >
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring' }}
            >
              <img src={getImagePath(puzzle.img)} alt={`${puzzle.text} headshot`}/>
            </motion.button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
