import { Position } from "../types";

export const snapToCenter = (elementRect: DOMRect): Position => {
  return {
    x: elementRect.left + elementRect.width / 2,
    y: elementRect.top + elementRect.height / 2,
  };
}
