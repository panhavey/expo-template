import { PopoverPlacement, PopoverPosition } from "./types";

export const getPopoverPosition = (triggerPosition: PopoverPosition, placement: PopoverPlacement = "bottom", offset: number = 8) => {
  const { x, y, width = 0, height = 0 } = triggerPosition;

  switch (placement) {
    case "top":
      return {
        top: y - offset,
        left: x,
      };
    case "bottom":
      return {
        top: y + height * 2 + offset,
        left: x,
      };
    case "left":
      return {
        top: y,
        left: x - offset,
      };
    case "right":
      return {
        top: y,
        left: x + width + offset,
      };
    default:
      return {
        top: y + height + offset,
        left: x,
      };
  }
};
