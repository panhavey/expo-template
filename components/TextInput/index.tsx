import { forwardRef } from "react";
import { CustomTextInputProps, TextInputRef } from "./types";
import { UnstyleTextInput } from "./UnstyleTextInput";
import { Field } from "../Field";

const TextInput = forwardRef<TextInputRef, CustomTextInputProps>(({ variant = "default", right, left, style, ...props }, ref) => {
  return (
    <Field.Root variant={variant} error={props.error}>
      <Field.Label label={props.label} />
      <Field.Content left={left} right={right}>
        <UnstyleTextInput {...props} ref={ref} />
      </Field.Content>
      <Field.Error error={props.error} />
    </Field.Root>
  );
});

export default TextInput;
