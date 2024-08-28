import { useState, useCallback, useRef } from "react";

interface Position {
  x: number;
  y: number;
}

interface UseDraggableOptions {
  onDragStart?: (position: Position) => void;
  onDragEnd?: (position: Position) => void;
  gridSnap?: number;
}

export const useDraggable = ({
  onDragStart,
  onDragEnd,
  gridSnap = 1,
}: UseDraggableOptions = {}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const startPosRef = useRef<Position>({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      const startPos = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
      startPosRef.current = startPos;
      onDragStart?.({ x: position.x, y: position.y });
    },
    [position, onDragStart],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      let newX = e.clientX - startPosRef.current.x;
      let newY = e.clientY - startPosRef.current.y;

      // Grid snapping
      if (gridSnap > 1) {
        newX = Math.round(newX / gridSnap) * gridSnap;
        newY = Math.round(newY / gridSnap) * gridSnap;
      }

      setPosition({ x: newX, y: newY });
    },
    [isDragging, gridSnap],
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      onDragEnd?.(position);
    }
  }, [isDragging, position, onDragEnd]);

  return {
    isDragging,
    position,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
