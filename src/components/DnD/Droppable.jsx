//import { useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';

const Droppable = ({ id, type, className, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
    data: {
      accepts: [type],
    },
  });
  const style = {
    // background: isOver ? 'green' : undefined,
    // color: isOver ? 'black' : 'currentColor',
  };

  return (
    <div id={id} ref={setNodeRef} style={style} className={className}>
      {children}
    </div>
  );
};

export default Droppable;
