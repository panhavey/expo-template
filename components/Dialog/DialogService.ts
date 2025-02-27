import { DefaultAnimationConfig } from "./constants/config";
import { DialogOptions, DialogType, DialogAnimation, AnimationConfig } from "./types";
import { getDialogIcon } from "./utils/icons";

interface DialogShowOptions {
  animation?: DialogAnimation;
  animationConfig?: AnimationConfig;
}

class DialogService {
  private static instance: DialogService;
  private showDialog?: (options: DialogOptions) => void;
  private hideDialog?: () => void;
  private initialized: boolean = false;
  private messageQueue: DialogOptions[] = [];

  private constructor() {}

  static getInstance(): DialogService {
    if (!DialogService.instance) {
      DialogService.instance = new DialogService();
    }
    return DialogService.instance;
  }

  setHandlers(show: ((options: DialogOptions) => void) | null, hide: (() => void) | null) {
    this.showDialog = show || undefined;
    this.hideDialog = hide || undefined;
    this.initialized = Boolean(show && hide);

    if (this.initialized && this.messageQueue.length > 0) {
      const nextMessage = this.messageQueue.shift();
      if (nextMessage) this.show(nextMessage);
    }
  }

  isInitialized() {
    return this.initialized;
  }

  show(options: DialogOptions) {
    if (!this.initialized) {
      this.messageQueue.push(options);
      return;
    }
    if (!this.showDialog) return;
    this.showDialog({
      ...options,
      animation: options.animation || "fade",
      animationConfig: { ...DefaultAnimationConfig, ...options.animationConfig },
    });
  }

  hide() {
    if (!this.initialized || !this.hideDialog) return;
    this.hideDialog();
  }

  private showDialogWithType(message: string | React.ReactNode, type: DialogType, title?: string, options?: DialogShowOptions) {
    this.show({
      title,
      content: message,
      confirmText: "OK",
      type,
      icon: getDialogIcon(type),
      animation: options?.animation,
      animationConfig: options?.animationConfig,
    });
  }

  alert(message: string | React.ReactNode, title?: string, options?: DialogShowOptions) {
    this.show({
      title,
      content: message,
      confirmText: "OK",
      type: "default",
      icon: getDialogIcon("default"),
      animation: options?.animation,
      animationConfig: options?.animationConfig,
    });
  }

  error(message: string | React.ReactNode, title: string = "Error", options?: DialogShowOptions) {
    this.showDialogWithType(message, "error", title, options);
  }

  success(message: string | React.ReactNode, title: string = "Success", options?: DialogShowOptions) {
    this.showDialogWithType(message, "success", title, options);
  }

  warning(message: string | React.ReactNode, title: string = "Warning", options?: DialogShowOptions) {
    this.showDialogWithType(message, "warning", title, options);
  }

  info(message: string | React.ReactNode, title: string = "Info", options?: DialogShowOptions) {
    this.showDialogWithType(message, "info", title, options);
  }

  confirm(message: string | React.ReactNode, onConfirm: () => void, title?: string, type: DialogType = "default", options?: DialogShowOptions) {
    this.show({
      title,
      content: message,
      onConfirm,
      onCancel: () => this.hide(),
      confirmText: "OK",
      cancelText: "Cancel",
      type,
      icon: getDialogIcon(type),
      animation: options?.animation,
      animationConfig: options?.animationConfig,
    });
  }
}

export const dialog = DialogService.getInstance();
