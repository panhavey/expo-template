import { StyleProp, TextStyle, ViewStyle } from "react-native";

export type DialogType = "default" | "error" | "success" | "warning" | "info" | "confirm";

export type DialogAnimation = "fade" | "scale" | "slideUp" | "none";

export interface AnimationConfig {
  duration?: number;
  damping?: number;
  delay?: number;
}

export interface DialogHeaderStyles {
  titleStyle?: StyleProp<TextStyle>;
  iconContainerStyle?: StyleProp<ViewStyle>;
}

export interface DialogContentStyles {
  contentStyle?: StyleProp<ViewStyle>;
  contentTextStyle?: StyleProp<TextStyle>;
}

export interface DialogActionsStyles {
  buttonContainerStyle?: StyleProp<ViewStyle>;
  confirmButtonStyle?: StyleProp<ViewStyle>;
  cancelButtonStyle?: StyleProp<ViewStyle>;
  confirmTextStyle?: StyleProp<TextStyle>;
  cancelTextStyle?: StyleProp<TextStyle>;
}

export interface DialogStyles extends DialogActionsStyles, DialogHeaderStyles, DialogContentStyles {
  overlayStyle?: StyleProp<ViewStyle>;
  dialogStyle?: StyleProp<ViewStyle>;
}

export interface DialogOptions extends DialogStyles {
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
  dismissible?: boolean;
  overlayColor?: string;
  width?: number | string;
  maxWidth?: number;
  padding?: number;
  borderRadius?: number;
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
