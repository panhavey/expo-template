import React from "react";
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react-native";
import { colors } from "@/constants";

export const getToastIcon = (type: string) => {
  switch (type) {
    case "success":
      return <CheckCircle2 size={20} color={colors.white} />;
    case "error":
      return <AlertCircle size={20} color={colors.white} />;
    case "warning":
      return <AlertTriangle size={20} color={colors.white} />;
    case "info":
      return <Info size={20} color={colors.white} />;
    default:
      return null;
  }
};
