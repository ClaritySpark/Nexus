import { useState, useCallback, useRef, useEffect } from "react";

interface DropZone {
  id: string;
  rect: DOMRect;
}

interface UseDroppableOptions {
  onDrop?: (itemId: string, dropZoneId: string) => void;
}

export const useDroppable = ({ onDrop }: UseDroppableOptions = {}) => {
  const [dropZones, setDropZones] = useState<DropZone[]>([]);
  const dropZonesRef = useRef<DropZone[]>([]);

  const registerDropZone = useCallback((id: string, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    setDropZones((prev) => [...prev, { id, rect }]);
  }, []);

  const unregisterDropZone = useCallback((id: string) => {
    setDropZones((prev) => prev.filter((zone) => zone.id !== id));
  }, []);

  const findDropZone = useCallback((x: number, y: number): string | null => {
    for (const zone of dropZonesRef.current) {
      if (
        x >= zone.rect.left &&
        x <= zone.rect.right &&
        y >= zone.rect.top &&
        y <= zone.rect.bottom
      ) {
        return zone.id;
      }
    }
    return null;
  }, []);

  const handleDrop = useCallback(
    (itemId: string, x: number, y: number) => {
      const dropZoneId = findDropZone(x, y);
      if (dropZoneId) {
        onDrop?.(itemId, dropZoneId);
      }
    },
    [findDropZone, onDrop],
  );

  useEffect(() => {
    dropZonesRef.current = dropZones;
  }, [dropZones]);

  return {
    registerDropZone,
    unregisterDropZone,
    handleDrop,
  };
};
