import React from "react";
import { View, StyleSheet } from "react-native";
import { borderRadius, colors, spacing } from "@/constants";
import { PopoverContentProps } from "./types";

export const PopoverContent = ({ children, fullScreen, style }: PopoverContentProps) => {
  return <View style={[styles.content, fullScreen && styles.fullContent, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.sm,
    overflow: "hidden",
    maxHeight: "80%",
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.gray_200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fullContent: {
    flex: 1,
    borderRadius: 0,
    maxHeight: "100%",
  },
});
