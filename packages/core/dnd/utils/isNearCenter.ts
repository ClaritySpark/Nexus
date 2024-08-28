import { Position } from "../types";

export const isNearCenter = (
  elementRect: DOMRect,
  mousePos: Position,
  threshold: number,
): boolean => {
  const centerX = elementRect.left + elementRect.width / 2;
  const centerY = elementRect.top + elementRect.height / 2;

  return (
    Math.abs(mousePos.x - centerX) < threshold &&
    Math.abs(mousePos.y - centerY) < threshold
  );
};
