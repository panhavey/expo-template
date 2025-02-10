import { DialogOptions } from "./DialogContext";

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
    this.showDialog(options);
  }

  hide() {
    if (!this.initialized || !this.hideDialog) return;
    this.hideDialog();
  }

  alert(message: string | React.ReactNode, title?: string) {
    this.show({
      title,
      content: message,
      confirmText: "OK",
    });
  }

  confirm(message: string | React.ReactNode, onConfirm: () => void, title?: string) {
    this.show({
      title,
      content: message,
      onConfirm,
      onCancel: () => this.hide(),
      confirmText: "OK",
      cancelText: "Cancel",
    });
  }
}

export const dialogService = DialogService.getInstance();
