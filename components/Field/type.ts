export type FieldVariants = "default" | "outline";

export interface BaseFieldProps {
  variant?: FieldVariants;
  disabled?: boolean;
  error?: string;
  required?: boolean;
}

export interface FieldContentProps {
  children: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export interface FieldProps extends BaseFieldProps, FieldContentProps {
  label?: string;
  style?: any;
  height?: number;
}

export interface FieldContextType extends BaseFieldProps {
  isFocused: boolean;
  value?: any;
  setIsFocused?: (focused: boolean) => void;
  setValue?: (value: any) => void;
}

export interface FieldProviderProps extends BaseFieldProps {
  children: React.ReactNode;
}
