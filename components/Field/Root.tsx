import React from "react";
import { View } from "react-native";
import { FieldProvider } from "./FieldContext";
import { FieldProps } from "./type";
import { spacing } from "../../constants";

export const Root: React.FC<FieldProps> = ({ children, error, required, variant = "default", disabled, height = 45, style }) => (
  <FieldProvider variant={variant} disabled={disabled} error={error} required={required}>
    <View
      style={[
        {
          gap: spacing.xs,
        },
        style,
      ]}
    >
      {children}
    </View>
  </FieldProvider>
);
