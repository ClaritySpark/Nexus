export interface Position {
  x: number;
  y: number;
}

export interface DraggableItem {
  id: string;
  type: string;
  position: Position;
}

export interface DropZone {
  id: string;
  accepts: string[];
}
