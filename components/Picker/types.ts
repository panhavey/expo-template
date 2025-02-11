import { TextInput } from "react-native";
import { FieldVariants } from "../Field";

export interface PickerFieldNames {
  label: string;
  value: string;
}

export interface PickerOption {
  label: string;
  value: string;
  original?: any;
}

export type PickerMode = "normal" | "modal" | "fullModal";

export type PickerValue = string | string[];

export interface PickerProps {
  label?: string;
  value?: PickerValue;
  options: any[];
  onChange?: (value: PickerValue, originalData?: any) => void;
  placeholder?: string;
  error?: string;
  variant?: FieldVariants;
  disabled?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
  searchable?: boolean;
  mode?: PickerMode;
  fieldNames?: PickerFieldNames;
  multiple?: boolean;
  maxSelected?: number;
  showSelectAll?: boolean;
  showClear?: boolean;
  onMaxSelected?: () => void;
}

export interface PickerOptionsProps {
  options: PickerOption[];
  value?: PickerValue;
  onSelect: (option: PickerOption) => void;
  multiple?: boolean;
  maxSelected?: number;
}

export interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  inputRef?: React.RefObject<TextInput>;
}
