import { TextInput, TextInputProps } from "react-native";

export interface CustomTextInputProps extends TextInputProps {
  variant?: TextInputVariant;
  label?: string;
  error?: string;
  disabled?: boolean;
  right?: React.ReactNode;
  left?: React.ReactNode;
}

export type TextInputVariant = "default" | "outline";

export type TextInputRef = TextInput;
