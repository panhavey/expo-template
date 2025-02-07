import React, { createContext, useContext, useState } from "react";
import { FieldContextType, FieldProviderProps } from "./type";

const FieldContext = createContext<FieldContextType | null>({
  variant: "default",
  isFocused: false,
});

export const useField = () => {
  const context = useContext(FieldContext);
  if (!context) {
    throw new Error("useInput must be used within an InputProvider");
  }
  return context;
};

export const FieldProvider: React.FC<FieldProviderProps> = ({ children, variant, disabled, error }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState();

  return (
    <FieldContext.Provider
      value={{
        variant,
        isFocused,
        disabled,
        error,
        value,
        setIsFocused,
        setValue,
      }}
    >
      {children}
    </FieldContext.Provider>
  );
};
