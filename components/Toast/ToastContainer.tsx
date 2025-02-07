import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ToastOptions, ToastProps } from "./types";
import { toastManager } from "./ToastManager";
import { ToastItem } from "./components/ToastItem";

export const ToastContainer: React.FC = () => {
  const [toastQueue, setToastQueue] = useState<ToastProps[]>([]);
  const [activeToasts, setActiveToasts] = useState<ToastProps[]>([]);
  const insets = useSafeAreaInsets();

  const showToast = useCallback((message: string, options?: ToastOptions) => {
    const toastId = Math.random().toString(36).substring(2, 9);
    const newToast = { id: toastId, message, ...options };
    setToastQueue(currentQueue => [...currentQueue, newToast]);
    return toastId;
  }, []);

  const removeToast = useCallback((toastId: string) => {
    setActiveToasts(current => current.filter(toast => toast.id !== toastId));
  }, []);

  const dismissAll = useCallback(() => {
    setToastQueue([]);
    setActiveToasts([]);
  }, []);

  // Handle toast queue
  useEffect(() => {
    if (toastQueue.length > 0 && activeToasts.length === 0) {
      const [nextToast, ...remainingToasts] = toastQueue;
      setActiveToasts([nextToast]);
      setToastQueue(remainingToasts);
    }
  }, [toastQueue, activeToasts]);

  useEffect(() => {
    toastManager.setHandlers(showToast, dismissAll);
  }, [showToast, dismissAll]);

  return (
    <View 
      style={[
        styles.container,
        {
          left: insets.right,
          right: insets.left,
          top: insets.top,
          bottom: insets.bottom,
        }
      ]} 
      pointerEvents="box-none"
    >
      {activeToasts.map((toast, index) => (
        <ToastItem 
          key={toast.id} 
          {...toast} 
          style={[{ zIndex: 1000 + index }]} 
          onDismiss={() => removeToast(toast.id)} 
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
});
