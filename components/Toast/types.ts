import { StyleProp, ViewStyle } from "react-native";

export type ToastType = "success" | "error" | "info" | "warning";

export type ToastAnimation = "bounce" | "slide";

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
}

export interface ToastProps extends ToastOptions {
  id: string;
  message: string;
}

export interface ToastItemProps extends Omit<ToastProps, "id"> {
  onDismiss: () => void;
}

export interface ToastItem extends ToastProps {
  id: string;
}
