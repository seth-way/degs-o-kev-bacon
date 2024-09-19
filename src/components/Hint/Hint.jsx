import './Hint.css';
import useWindowStore from '../../state/useWindowStore';
import { motion } from 'framer-motion';
import { CircleX } from 'lucide-react';

const Hint = () => {
  const hint = useWindowStore(state => state.hint);
  const setHint = useWindowStore(state => state.setHint);
  const showRules = hint === 'RULES_GUIDE';
  return (
    <div className={'hint-message' + (showRules ? ' rules' : '')}>
      {hint === 'RULES_GUIDE' ? displayRules() : hint}
      <motion.button
        initial={{ color: 'var(--text)' }}
        whileHover={{ scale: 1.09, color: 'var(--hub-color)' }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring' }}
        onClick={() => setHint('')}
      >
        <CircleX />
      </motion.button>
    </div>
  );

  function displayRules() {
    return (
      <>
        <h2>How to Play:</h2>
        <ul>
          <li>
            The center of the puzzle is our featured <b>STAR</b>.
          </li>
          <li>
            All game <b>PIECES</b> are either...
            <ul>
              <li>
                a <b>MOVIE</b> that our <b>STAR</b> had a role in.
              </li>
              <li>
                a <b>CO-STAR</b> from those <b>MOVIES</b>.
              </li>
            </ul>
          </li>
          <li>
            <b>STARS</b> can only be placed in <b>STAR</b> spaces.
          </li>
          <li>
            <b>MOVIES</b> can only be placed in <b>MOVIE</b> spaces.
          </li>
          <li>
            Your challenge is to place the <b>PIECES</b> so that...
            <ul>
              <li>
                each <b>TRIANGLE</b> contains a <b>MOVIE</b>.
              </li>
              <li>
                the <b>BUBBLES</b> near each <b>TRIANGLE</b> contain{' '}
                <b>STARS</b> from that <b>MOVIE</b>.
              </li>
            </ul>
          </li>
          <li>
            If you find yourself stuck...
            <ul>
              <li>
                re-click the help button on a partially completed puzzle for a
                helpful hint.
              </li>
            </ul>
          </li>
          <li>
            <b>Good Luck!</b>
          </li>
        </ul>
      </>
    );
  }
};

export default Hint;
