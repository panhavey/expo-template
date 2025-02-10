import { Portal } from "@gorhom/portal";
import React from "react";
import { View, StyleSheet } from "react-native";
import { ToastItem } from "../components/ToastItem";
import { ToastState } from "./types";

export const ToastContainer: React.FC<{ toasts: ToastState[] }> = ({ toasts }) => {
  if (toasts.length === 0) return null;

  return (
    <Portal>
      <View style={styles.container}>
        {toasts.map((toast, index) => (
          <ToastItem
            key={index}
            message={toast.message}
            type={toast.type}
            duration={toast.options?.duration}
            animation={toast.options?.animation}
            onDismiss={() => toast.onDismiss?.(index)}
            {...toast.options}
          />
        ))}
      </View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    pointerEvents: "box-none",
  },
});
