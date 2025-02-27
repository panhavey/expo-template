import { DefaultAnimationConfig } from "./constants/config";
import { DialogOptions, DialogType, DialogAnimation, AnimationConfig, DialogStyles } from "./types";
import { getDialogIcon } from "./utils/icons";

interface DialogShowOptions extends DialogStyles {
  animation?: DialogAnimation;
  animationConfig?: AnimationConfig;
  dismissible?: boolean;
  autoClose?: number;
}

interface AlertOptions extends DialogShowOptions {
  message: string | React.ReactNode;
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

  private showDialogWithType(options: AlertOptions & { type: DialogType }) {
    this.show({
      content: options.message,
      confirmText: "OK",
      ...options, // Pass through all style properties
    });
  }

  error(options: AlertOptions) {
    this.showDialogWithType({
      ...options,
      type: "error",
      title: options.title || "Error",
    });
  }

  success(options: AlertOptions) {
    this.showDialogWithType({
      ...options,
      type: "success",
      title: options.title || "Success",
    });
  }

  warning(options: AlertOptions) {
    this.showDialogWithType({
      ...options,
      type: "warning",
      title: options.title || "Warning",
    });
  }

  info(options: AlertOptions) {
    this.showDialogWithType({
      ...options,
      type: "info",
      title: options.title || "Info",
    });
  }

  confirm({ onOk, onCancel, ...options }: ConfirmOptions) {
    this.show({
      content: options.message,
      onConfirm: () => {
        onOk?.();
        this.hide();
      },
      onCancel: () => {
        onCancel?.();
        this.hide();
      },
      confirmText: "OK",
      cancelText: "Cancel",
      type: "default",
      icon: getDialogIcon(options.type || "default"),
      ...options, // Pass through all style properties
    });
  }

  hide() {
    if (!this.initialized || !this.hideDialog) return;
    this.hideDialog();
  }
}

export const dialog = DialogService.getInstance();
