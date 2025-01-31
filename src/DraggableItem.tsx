import { useDraggable } from '@dnd-kit/core';
import { FaGripLines } from 'react-icons/fa';

interface DraggableItemProps {
  id: string;
  children: React.ReactNode;
}

function DraggableItem({ id, children }: DraggableItemProps) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      {/* Drag Handle */}
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          cursor: 'grab',
          padding: '0.25rem',
        }}
      >
        <FaGripLines />
      </div>

      {/* Content */}
      {children}
    </div>
  );
}

export default DraggableItem;
