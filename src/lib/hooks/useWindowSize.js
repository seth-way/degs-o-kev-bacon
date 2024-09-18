import { useLayoutEffect } from 'react';
import useWindowStore from '../../state/useWindowStore';

function debounce(fn, ms) {
  let timer;
  return _ => {
    clearTimeout(timer);
    timer = setTimeout(_ => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

export default function useWindowSize() {
  const setSize = useWindowStore(state => state.setSize);

  useLayoutEffect(() => {
    const debounced = debounce(function handleResize() {
      setSize({ height: window.innerHeight, width: window.innerWidth }, 300);
    });
    window.addEventListener('resize', debounced);
    return () => window.removeEventListener('resize', debounced);
  }, [setSize]);
}
