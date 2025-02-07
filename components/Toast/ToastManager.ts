import { ToastOptions } from "./types";

class ToastManager {
  private static instance: ToastManager;
  private showCallback: ((message: string, options?: ToastOptions) => string) | null = null;
  private dismissCallback: ((toastId?: string) => void) | null = null;
  private updateCallback: ((toastId: string, message: string, options?: ToastOptions) => void) | null = null;

  private constructor() {}

  static getInstance() {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  setHandlers(
    show: (message: string, options?: ToastOptions) => string,
    dismiss: (toastId?: string) => void,
    update: (toastId: string, message: string, options?: ToastOptions) => void
  ) {
    this.showCallback = show;
    this.dismissCallback = dismiss;
    this.updateCallback = update;
  }

  show(message: string, options?: ToastOptions): string {
    return this.showCallback?.(message, options) ?? '';
  }

  update(toastId: string, message: string, options?: ToastOptions) {
    this.updateCallback?.(toastId, message, options);
  }

  dismiss(toastId?: string) {
    this.dismissCallback?.(toastId);
  }

  dismissAll() {
    this.dismissCallback?.();
  }
}

export const toastManager = ToastManager.getInstance();

export const toast = {
  show: (message: string, options?: ToastOptions) => toastManager.show(message, options),
  update: (toastId: string, message: string, options?: ToastOptions) => 
    toastManager.update(toastId, message, options),
  dismiss: (toastId: string) => toastManager.dismiss(toastId),
  dismissAll: () => toastManager.dismissAll(),
  success: (message: string, options?: Omit<ToastOptions, "type">) => 
    toastManager.show(message, { ...options, type: "success" }),
  error: (message: string, options?: Omit<ToastOptions, "type">) => 
    toastManager.show(message, { ...options, type: "error" }),
  info: (message: string, options?: Omit<ToastOptions, "type">) => 
    toastManager.show(message, { ...options, type: "info" }),
  warning: (message: string, options?: Omit<ToastOptions, "type">) => 
    toastManager.show(message, { ...options, type: "warning" }),
};
