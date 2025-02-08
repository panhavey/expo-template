import { FieldVariants } from "../Field";

export interface PickerOption {
  label: string;
  value: string;
}

export interface PickerProps {
  label?: string;
  value?: string;
  options: PickerOption[];
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  variant?: FieldVariants;
  disabled?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
  searchable?: boolean;
  mode?: "normal" | "modal" | "fullModal";
}
