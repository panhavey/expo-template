export type DialogType = "default" | "error" | "success" | "warning" | "info";

export type DialogAnimation = "fade" | "scale" | "slideUp" | "none";

export interface AnimationConfig {
  duration?: number;
  damping?: number;
  delay?: number;
}

export interface DialogOptions {
  title?: string;
  content: string | React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  type?: DialogType;
  icon?: React.ReactNode;
  animation?: DialogAnimation;
  animationConfig?: AnimationConfig;
}

export interface DialogProps extends Omit<DialogOptions, "content"> {
  visible: boolean;
  onClose: () => void;
  children: DialogOptions["content"];
}

export interface DialogConfig {
  size: number;
  color: string;
}
