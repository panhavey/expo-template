import { TextInput } from "react-native";
import { FieldVariants } from "../Field";

export type PickerMode = "normal" | "modal" | "fullModal";
export type PickerValue = string | string[];

export type PickerFieldNames<T = Record<string, any>> = {
  label: keyof T;
  value: keyof T;
};

export interface PickerOption<T = Record<string, any>> {
  label: string;
  value: string;
  original?: T;
}

export interface PickerProps<T = Record<string, any>> {
  label?: string;
  value?: PickerValue;
  options: T[];
  onChange?: (value: PickerValue, originalData?: T) => void;
  placeholder?: string;
  error?: string;
  variant?: FieldVariants;
  disabled?: boolean;
  loading?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
  searchable?: boolean;
  mode?: PickerMode;
  fieldNames?: PickerFieldNames<T>;
  multiple?: boolean;
  maxSelected?: number;
  showSelectAll?: boolean;
  showClear?: boolean;
  onMaxSelected?: () => void;
}

export interface PickerOptionsProps<T = Record<string, any>> {
  options: PickerOption<T>[];
  value?: PickerValue;
  onSelect: (option: PickerOption<T>) => void;
  multiple?: boolean;
  maxSelected?: number;
}

export interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  inputRef?: React.RefObject<TextInput>;
}
