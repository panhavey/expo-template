import { StyleProp, ViewStyle } from "react-native";

export type ToastType = "success" | "error" | "info" | "warning";

export type ToastAnimation = "bounce" | "slide";

export type ToastMode = "stack" | "overlap";

export interface ToastOptions {
  type?: ToastType;
  duration?: number;
  position?: "top" | "bottom";
  style?: StyleProp<ViewStyle>;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onPress: () => void;
  };
  animation?: ToastAnimation;
  animationConfig?: {
    duration?: number;
    damping?: number;
    stiffness?: number;
  };
  showProgress?: boolean;
  mode?: ToastMode;
}

export interface ToastProps extends ToastOptions {
  id: string;
  message: string;
}

export interface ToastItemProps extends Omit<ToastProps, "id"> {
  onDismiss: () => void;
  style?: StyleProp<ViewStyle>;
}

export interface ToastItem extends ToastProps {
  id: string;
}

export interface ToastState {
  message: string;
  type: ToastType;
  options?: ToastOptions;
  onDismiss?: (index: number) => void;
}
