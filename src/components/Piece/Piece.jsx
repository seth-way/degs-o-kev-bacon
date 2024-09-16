import './Piece.css';
import { useState, useEffect } from 'react';
import { useDraggable, useDndMonitor } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { rectangle, rectangleClip, circleClip } from '../../assets/paths';
import { getImagePath } from '../../lib/utils';

const Piece = ({ data, propStyle }) => {
  const { id, text, img } = data;
  const type = id.startsWith('m') ? 'movie' : 'star';
  const imgPath = getImagePath(img);
  const { attributes, listeners, setNodeRef, transform, node } = useDraggable({
    id: id,
    data: {
      type: type,
    },
  });

  // useEffect(() => {
  //   // console.log(transform);
  //   // console.log(listeners);
  // }, [transform, listeners]);

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 10px)`,
      }
    : undefined;

  return (
    <button
      ref={node}
      style={{ ...style, ...propStyle }}
      {...listeners}
      {...attributes}
      id={id}
      className={`piece ${type}`}
    >
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
        <g strokeWidth='4' stroke='currentColor' fill='none'>
          <path d={rectangle} />
        </g>
      </svg>
      <p>{text}</p>
    </button>
  );
};

export default Piece;
