import { AnimationConfig, DialogType } from "../types";

export const DialogTypeConfig: Record<
  DialogType,
  {
    size: number;
    color: string;
  }
> = {
  default: {
    size: 30,
    color: "#666666",
  },
  error: {
    size: 30,
    color: "#DC2626",
  },
  success: {
    size: 30,
    color: "#059669",
  },
  warning: {
    size: 30,
    color: "#D97706",
  },
  info: {
    size: 30,
    color: "#2563EB",
  },
};

export const DefaultAnimationConfig: AnimationConfig = {
  duration: 200,
  damping: 15,
  delay: 0,
};
