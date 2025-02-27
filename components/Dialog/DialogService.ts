import { DefaultAnimationConfig } from "./constants/config";
import { DialogOptions, DialogType, DialogAnimation, AnimationConfig } from "./types";
import { getDialogIcon } from "./utils/icons";

interface DialogShowOptions {
  animation?: DialogAnimation;
  animationConfig?: AnimationConfig;
  dismissible?: boolean;
}

interface AlertOptions extends DialogShowOptions {
  message: string | React.ReactNode;
  onOk?: () => void;
  title?: string;
}

interface ConfirmOptions extends AlertOptions {
  onOk?: () => void;
  onCancel?: () => void;
  type?: DialogType;
  confirmText?: string;
  cancelText?: string;
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

  private showDialogWithType(options: AlertOptions & { type: DialogType }) {
    this.show({
      title: options.title,
      content: options.message,
      confirmText: "OK",
      type: options.type,
      icon: getDialogIcon(options.type),
      animation: options.animation,
      animationConfig: options.animationConfig,
    });
  }

  alert(options: AlertOptions) {
    this.show({
      title: options.title,
      content: options.message,
      confirmText: "OK",
      type: "default",
      icon: getDialogIcon("default"),
      animation: options.animation,
      animationConfig: options.animationConfig,
    });
  }

  error(options: AlertOptions) {
    this.showDialogWithType({ ...options, type: "error", title: options.title || "Error", onOk: options.onOk });
  }

  success(options: AlertOptions) {
    this.showDialogWithType({ ...options, type: "success", title: options.title || "Success", onOk: options.onOk });
  }

  warning(options: AlertOptions) {
    this.showDialogWithType({ ...options, type: "warning", title: options.title || "Warning", onOk: options.onOk });
  }

  info(options: AlertOptions) {
    this.showDialogWithType({ ...options, type: "info", title: options.title || "Info", onOk: options.onOk });
  }

  confirm(options: ConfirmOptions) {
    this.show({
      title: options.title,
      content: options.message,
      onConfirm: () => {
        options.onOk?.();
        this.hide();
      },
      onCancel: () => {
        options.onCancel?.();
        this.hide();
      },
      confirmText: options.confirmText || "OK",
      cancelText: options.cancelText || "Cancel",
      type: options.type || "default",
      icon: getDialogIcon(options.type || "default"),
      animation: options.animation,
      animationConfig: options.animationConfig,
    });
  }
}

export const dialog = DialogService.getInstance();
