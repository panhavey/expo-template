import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Dialog } from "./Dialog";
import { dialog } from "./DialogService";
import { DialogOptions } from "./types";
import { DefaultAnimationConfig } from "./constants/config";

interface DialogContextValue {
  show: (options: DialogOptions) => void;
  hide: () => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

export const DialogProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dialogOptions, setDialogOptions] = useState<DialogOptions | null>(null);

  const show = useCallback((newOptions: DialogOptions) => {
    const processedOptions: DialogOptions = {
      ...newOptions,
      animation: newOptions.animation || "fade",
      animationConfig: {
        ...DefaultAnimationConfig,
        ...newOptions.animationConfig,
      },
    };

    setDialogOptions(processedOptions);
    setIsVisible(true);
  }, []);

  const hide = useCallback(() => {
    setIsVisible(false);

    const animationDuration = dialogOptions?.animationConfig?.duration || 300;
    const clearTimeout = setTimeout(() => {
      setDialogOptions(null);
    }, animationDuration);

    return () => window.clearTimeout(clearTimeout);
  }, [dialogOptions?.animationConfig?.duration]);

  const handleClose = useCallback(() => {
    dialogOptions?.onCancel?.();
    hide();
  }, [dialogOptions, hide]);

  useEffect(() => {
    dialog.setHandlers(show, hide);
    return () => dialog.setHandlers(null, null);
  }, [show, hide]);

  const contextValue = React.useMemo<DialogContextValue>(() => ({ show, hide }), [show, hide]);

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      <Dialog
        visible={isVisible}
        onClose={handleClose}
        title={dialogOptions?.title}
        onConfirm={dialogOptions?.onConfirm}
        onCancel={dialogOptions?.onCancel}
        confirmText={dialogOptions?.confirmText}
        cancelText={dialogOptions?.cancelText}
        type={dialogOptions?.type}
        icon={dialogOptions?.icon}
        animation={dialogOptions?.animation}
      >
        {dialogOptions?.content}
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
