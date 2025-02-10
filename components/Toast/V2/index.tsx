import React, { useCallback, useEffect, useState } from "react";
import { ToastOptions, ToastType } from "../types";
import { ToastState } from "./types";
import { ToastContainer } from "./ToastContainer";

type ToastInstanceType = ((message: string, type: ToastType, options?: ToastOptions) => void) | null;

let toastInstance: ToastInstanceType = null;

export const toast = {
  show: (message: string, type: ToastType = "info", options?: ToastOptions) => {
    if (toastInstance) {
      toastInstance(message, type, options);
    }
  },
  success: (message: string, options?: ToastOptions) => {
    toast.show(message, "success", options);
  },
  error: (message: string, options?: ToastOptions) => {
    toast.show(message, "error", options);
  },
  warning: (message: string, options?: ToastOptions) => {
    toast.show(message, "warning", options);
  },
  info: (message: string, options?: ToastOptions) => {
    toast.show(message, "info", options);
  },
};

export const ToastProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const removeToast = useCallback((index: number) => {
    setToasts((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const setToastState = useCallback(
    (message: string, type: ToastType, options?: ToastOptions) => {
      const newToast: ToastState = {
        message,
        type,
        options,
        onDismiss: removeToast,
      };

      setToasts((prev) => {
        if (options?.mode === "stack") {
          return [...prev, newToast];
        }
        return [newToast];
      });
    },
    [removeToast]
  );

  useEffect(() => {
    toastInstance = setToastState;
    return () => {
      toastInstance = null;
    };
  }, [setToastState]);

  return (
    <>
      {children}
      <ToastContainer toasts={toasts} />
    </>
  );
};

export type { ToastState } from "./types";
