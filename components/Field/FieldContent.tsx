import React from "react";
import { StyleSheet, View } from "react-native";
import { useField } from "./FieldContext";
import { FieldContentProps } from "./type";
import { colors } from "@/constants/color";
import { borderRadius, spacing } from "../../constants";

export const FieldContent: React.FC<FieldContentProps> = ({ children, left, right }) => {
  const { isFocused, disabled } = useField();

  return (
    <View
      style={[styles.contentContainer, isFocused ? styles.borderFocus : styles.borderBlur]}
      accessibilityState={{ selected: isFocused, disabled }}
    >
      {left && <View style={styles.addon}>{left}</View>}
      <View style={styles.inputContainer}>{children}</View>
      {right && <View style={styles.addon}>{right}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    height: 45,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
  },
  inputContainer: {
    position: "relative",
    flex: 1,
  },
  borderFocus: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  borderBlur: {
    borderWidth: 1,
    borderColor: colors.black_200,
  },
  addon: {
    justifyContent: "center",
  },
});
