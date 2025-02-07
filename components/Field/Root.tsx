import React from "react";
import { View } from "react-native";
import { FieldProvider } from "./FieldContext";
import { FieldProps } from "./type";
import { spacing } from "../../constants";

export const Root: React.FC<FieldProps> = ({ children, error, variant = "default", disabled, height = 45, style }) => (
  <FieldProvider variant={variant} disabled={disabled} error={error}>
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
