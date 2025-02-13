import React from "react";

import { useField } from "./FieldContext";
import { FloatingLabel } from "./FloatingLabel";
import { Text } from "../Text";
import { colors, fontSize } from "../../constants";
import { StyleSheet } from "react-native";

interface FieldLabelProps {
  label?: string;
}

export const FieldLabel: React.FC<FieldLabelProps> = ({ label }) => {
  if (!label) return null;

  const { variant, error, isFocused, value, required } = useField();

  const labelColor = isFocused ? colors.primary : error ? colors.error : colors.black_800;

  const labelComponent = (
    <Text style={[styles.label, { color: labelColor }]}>
      {label}
      {required && <Text style={[styles.label, { color: colors.error }]}> *</Text>}
    </Text>
  );

  if (variant === "outline") {
    return (
      <FloatingLabel hasValue={!!value} isFocused={isFocused}>
        {labelComponent}
      </FloatingLabel>
    );
  }

  return labelComponent;
};

const styles = StyleSheet.create({
  label: {
    fontSize: fontSize.md,
    marginBottom: 4,
    includeFontPadding: false,
    textAlignVertical: "center",
  },
});
