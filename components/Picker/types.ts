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

export interface PickerProps {
  label?: string;
  value?: string;
  options: any[];
  onChange?: (value: string, originalData?: any) => void;
  placeholder?: string;
  error?: string;
  variant?: FieldVariants;
  disabled?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
  searchable?: boolean;
  mode?: "normal" | "modal" | "fullModal";
  fieldNames?: PickerFieldNames;
}

export interface PickerOptionsProps {
  options: PickerOption[];
  value?: string;
  onSelect: (option: PickerOption) => void;
}

export interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  inputRef?: React.RefObject<TextInput>;
}
