import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DialogType } from "../types";
import { DialogTypeConfig } from "../constants/config";

interface DialogActionsProps {
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose: () => void;
  type: DialogType;
}

export const DialogActions: React.FC<DialogActionsProps> = ({ confirmText, cancelText, onConfirm, onCancel, onClose, type }) => {
  const config = DialogTypeConfig[type];

  return (
    <View style={styles.buttonContainer}>
      {cancelText && (
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel || onClose} activeOpacity={0.8}>
          <Text style={styles.cancelText}>{cancelText}</Text>
        </TouchableOpacity>
      )}
      {confirmText && (
        <TouchableOpacity
          style={[styles.button, styles.confirmButton, { backgroundColor: config.color }]}
          onPress={onConfirm || onClose}
          activeOpacity={0.8}
        >
          <Text style={styles.confirmText}>{confirmText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    width: "100%",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    maxWidth: 160,
  },
  cancelButton: {
    backgroundColor: "#F3F4F6",
  },
  confirmButton: {
    backgroundColor: "#2563EB",
  },
  cancelText: {
    color: "#374151",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  confirmText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});
