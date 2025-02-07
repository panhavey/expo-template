import React from "react";

import { Text } from "../Text";
import { colors } from "../constants";

interface FieldErrorProps {
  error?: string;
}

export const FieldError: React.FC<FieldErrorProps> = ({ error }) => {
  if (!error) return null;
  return <Text style={{ color: colors.error }}>{error}</Text>;
};
