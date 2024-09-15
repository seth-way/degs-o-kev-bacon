import './Pieces.css';
import { useDndMonitor } from '@dnd-kit/core';
import Droppable from '../DnD/Droppable';
import Piece from '../Piece/Piece';

const Pieces = ({ type, orientation, data }) => {
  useDndMonitor({
    onDragOver(event) {
      console.log('over', event);
    },
    onDragEnd(event) {
      console.log('end', event);
    },
  });

  return (
    <Droppable id={`droppable-${type}`} type={type}>
      <div className={`pieces ${type} ${orientation}`}>
        {Object.values(data).map((item) => (
          <Piece
            key={`${item.id}_piece`}
            type={type}
            data={item}
          />
        ))}
      </div>
    </Droppable>
  );
};

export default Pieces;
