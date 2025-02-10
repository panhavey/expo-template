import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Pressable } from "react-native";
import { Portal } from "@gorhom/portal";

interface DialogProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  visible,
  onClose,
  title,
  children,
  onConfirm,
  onCancel,
  confirmText = "OK",
  cancelText = "Cancel",
}) => {
  return (
    <Portal>
      {visible && (
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.backdrop} onPress={onClose} />
          <View style={styles.dialog}>
            {title && <Text style={styles.title}>{title}</Text>}
            <View style={styles.content}>{typeof children === "string" ? <Text>{children}</Text> : children}</View>
            {(onConfirm || onCancel) && (
              <View style={styles.buttonContainer}>
                {onCancel && (
                  <Pressable style={[styles.button, styles.cancelButton]} onPress={onCancel}>
                    <Text style={styles.buttonText}>{cancelText}</Text>
                  </Pressable>
                )}
                {onConfirm && (
                  <Pressable style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
                    <Text style={[styles.buttonText, styles.confirmButtonText]}>{confirmText}</Text>
                  </Pressable>
                )}
              </View>
            )}
          </View>
        </View>
      )}
    </Portal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dialog: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "85%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  content: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 80,
  },
  cancelButton: {
    backgroundColor: "#f1f1f1",
  },
  confirmButton: {
    backgroundColor: "#007AFF",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
  confirmButtonText: {
    color: "white",
  },
});
