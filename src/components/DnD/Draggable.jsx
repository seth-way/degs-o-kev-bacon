import { useDraggable, useDndMonitor } from '@dnd-kit/core';

const Draggable = props => {
  //const Element = props.element || 'div';
  const { id, type, key, children } = props;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: {
      type: type,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      key={key}
      id={id}
      className='piece'
    >
      {children || ''}
    </button>
  );
};

export default Draggable;
