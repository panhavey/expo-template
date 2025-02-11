import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { colors } from "@/constants";
import { PopoverOverlayProps } from "./types";

export const PopoverOverlay = ({ children, onClose, fullScreen, overlayColor = "transparent" }: PopoverOverlayProps) => {
  return (
    <Pressable style={[styles.overlay, fullScreen && styles.fullOverlay, !fullScreen && { backgroundColor: overlayColor }]} onPress={onClose}>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  fullOverlay: {
    padding: 0,
    backgroundColor: colors.white,
  },
});
