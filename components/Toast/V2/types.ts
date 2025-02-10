import { ToastType, ToastOptions } from "../types";

export interface ToastState {
  message: string;
  type: ToastType;
  options?: ToastOptions;
  onDismiss?: (index: number) => void;
}
