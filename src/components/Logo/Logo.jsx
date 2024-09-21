import './Logo.css';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Logo = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [timeoutRef, setTimeoutRef] = useState(null);
  const [delay, setDelay] = useState(0.7);
  const handleClick = () => {
    if (hasLoaded) {
      setDelay(0);
      setClicked(true);
      if (timeoutRef) clearTimeout(timeoutRef);
      const newRef = setTimeout(() => {
        setClicked(false);
      }, 0.05);
      setTimeoutRef(newRef);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setHasLoaded(true);
    }, 1000);
  }, []);

  const dur1 = 1;
  const initial = { opacity: 0, scale: 100, x: -1000 };
  const animate = { opacity: 1, scale: 1, x: 0 };
  const transition = { duration: dur1, type: 'spring' };
  const transition2 = {
    delay: delay,
    duration: 0.75,
    times: [0, 0.5, 1],
    ease: 'easeOut',
  };
  const animate2 = clicked
    ? {}
    : { scale: [0.5, 0.75, 0.5], opacity: [0, 0.4, 0, 0, 0] };

  return (
    <div onClick={handleClick}>
      <motion.svg
        initial={initial}
        animate={animate}
        transition={transition}
        style={{ originX: 1, originY: 0.6 }}
        className={'logo' + (hasLoaded ? ' loaded' : '')}
        viewBox='0 0 100 100'
        fill='var(--bg)'
        strokeWidth='20'
        stroke='currentColor'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.circle cx='50' cy='50' r='50' />
        <motion.circle
          cx='50'
          cy='50'
          r='50'
          transition={transition2}
          animate={clicked ? {} : { ...animate2, x: [0, -200, 0] }}
        />
        <motion.circle
          cx='50'
          cy='50'
          r='50'
          transition={transition2}
          animate={clicked ? {} : { ...animate2, x: [0, 200, 0] }}
        />
        <motion.circle
          cx='50'
          cy='50'
          r='50'
          transition={transition2}
          animate={
            clicked ? {} : { ...animate2, x: [0, -100, 0], y: [0, 173, 0] }
          }
        />
        <motion.circle
          cx='50'
          cy='50'
          r='50'
          transition={transition2}
          animate={
            clicked ? {} : { ...animate2, x: [0, 100, 0], y: [0, 173, 0] }
          }
        />
        <motion.circle
          cx='50'
          cy='50'
          r='50'
          transition={transition2}
          animate={
            clicked ? {} : { ...animate2, x: [0, -100, 0], y: [0, -173, 0] }
          }
        />
        <motion.circle
          cx='50'
          cy='50'
          r='50'
          transition={transition2}
          animate={
            clicked ? {} : { ...animate2, x: [0, 100, 0], y: [0, -173, 0] }
          }
        />
        <motion.circle cx='50' cy='50' r='50' />
      </motion.svg>
    </div>
  );
};

export default Logo;
