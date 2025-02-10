import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Dialog } from "./Dialog";
import { dialogService } from "./DialogService";

export type DialogOptions = {
  title?: string;
  content: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
};

type DialogContextType = {
  show: (options: DialogOptions) => void;
  hide: () => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

export const DialogProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [dialogState, setDialogState] = useState<{
    visible: boolean;
    options: DialogOptions | null;
  }>({
    visible: false,
    options: null,
  });

  const show = useCallback((options: DialogOptions) => {
    setDialogState({ visible: true, options });
  }, []);

  const hide = useCallback(() => {
    setDialogState({ visible: false, options: null }); // Clear options when hiding
  }, []);

  const handleClose = useCallback(() => {
    dialogState.options?.onCancel?.();
    hide();
  }, [dialogState.options, hide]);

  useEffect(() => {
    dialogService.setHandlers(show, hide);
    return () => {
      dialogService.setHandlers(null, null);
    };
  }, [show, hide]);

  return (
    <DialogContext.Provider value={{ show, hide }}>
      {children}
      <Dialog
        visible={dialogState.visible}
        onClose={handleClose}
        title={dialogState.options?.title}
        onConfirm={dialogState.options?.onConfirm}
        onCancel={dialogState.options?.onCancel}
        confirmText={dialogState.options?.confirmText}
        cancelText={dialogState.options?.cancelText}
      >
        {dialogState.options?.content}
      </Dialog>
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
