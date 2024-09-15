import './Piece.css';
import { useState } from 'react';
import { useDraggable, useDndMonitor } from '@dnd-kit/core';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { rectangle, rectangleClip, circleClip } from '../../assets/paths';
import { getImagePath } from '../../lib/utils';

const Piece = ({ data, type }) => {
  const { id, text, img } = data;
  const imgPath = getImagePath(img);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: {
      type: type,
    },
  });

  //const animateSVG = animate;

  useDndMonitor({
    onDragStart(event) {
      //console.log('start', event);
    },
    onDragMove(event) {
      //console.log('move', event);
      console.log('will accept??', event.over?.data?.current?.accepts);
    },
    onDragOver(event) {
      //console.log('over', event);
    },
    onDragEnd(event) {
      //console.log('end', event);
    },
    onDragCancel(event) {
      //console.log('start', event);
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 10px)`,
      }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      style={style}
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
        <g strokeWidth='4' stroke='white' fill='none'>
          <path d={rectangle} />
        </g>
      </svg>
      <p>{text}</p>
    </button>
  );
};

export default Piece;
