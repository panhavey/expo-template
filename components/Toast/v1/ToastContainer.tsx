import React, { useCallback, useEffect, useState, useId } from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ToastOptions, ToastProps } from "../types";
import { toastManager } from "./ToastManager";
import { ToastItem } from "../components/ToastItem";

export const ToastContainer: React.FC = () => {
  const idPrefix = useId();
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const dismissQueue = React.useRef<Set<string>>(new Set());
  const dismissTimeouts = React.useRef<Map<string, NodeJS.Timeout>>(new Map());
  const counter = React.useRef(0);

  const showToast = useCallback(
    (message: string, options?: ToastOptions) => {
      counter.current += 1;
      const timestamp = Date.now();
      const toastId = `${idPrefix}-${timestamp}-${counter.current}`;
      const newToast = { id: toastId, message, ...options };

      setToasts((currentToasts) => {
        const index = currentToasts.length;
        if (options?.duration && options.duration > 0) {
          const timeout = setTimeout(() => {
            removeToast(toastId);
          }, options.duration + index * 100);
          dismissTimeouts.current.set(toastId, timeout);
        }
        return [...currentToasts, newToast];
      });

      return toastId;
    },
    [idPrefix]
  );

  const removeToast = useCallback((toastId: string) => {
    if (dismissTimeouts.current.has(toastId)) {
      clearTimeout(dismissTimeouts.current.get(toastId));
      dismissTimeouts.current.delete(toastId);
    }

    dismissQueue.current.add(toastId);
    setToasts((current) => {
      const index = current.findIndex((toast) => toast.id === toastId);
      const previousToastsAreDismissed = current.slice(0, index).every((toast) => dismissQueue.current.has(toast.id));

      if (previousToastsAreDismissed) {
        const newToasts = current.filter((_, i) => i > index);
        dismissQueue.current.clear();
        return newToasts;
      }
      return current;
    });
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      dismissTimeouts.current.forEach((timeout) => clearTimeout(timeout));
      dismissTimeouts.current.clear();
    };
  }, []);

  const insets = useSafeAreaInsets();

  const updateToast = useCallback((toastId: string, message: string, options?: ToastOptions) => {
    setToasts((current) => current.map((toast) => (toast.id === toastId ? { ...toast, message, ...options } : toast)));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  useEffect(() => {
    toastManager.setHandlers(showToast, dismissAll, updateToast);
  }, [showToast, dismissAll, updateToast]);

  return (
    <View
      style={[
        styles.container,
        {
          left: insets.right,
          right: insets.left,
          top: insets.top,
          bottom: insets.bottom,
        },
      ]}
      pointerEvents="box-none"
    >
      {toasts.map((toast, index) => {
        const reverseIndex = toasts.length - 1 - index;
        const offset = toast.mode === "stack" ? reverseIndex * 65 : 0;

        return (
          <ToastItem
            key={toast.id}
            {...toast}
            style={[{ zIndex: 1000 + reverseIndex }, toast.position === "top" ? { top: offset } : { bottom: offset }]}
            onDismiss={() => removeToast(toast.id)}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
});
