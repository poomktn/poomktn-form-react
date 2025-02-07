import { RenderValueType, InputProps } from "../types/formType";
import { ChangeEvent, useRef, useState } from "react";

export function useValidate({
  modelValue,
  rules,
  onUpdateValue,
  id,
  name,
  validateOnInput,
  validateOnBlur,
}: InputProps) {
  const [errorTexts, setErrorTexts] = useState<string[]>([]);
  const localValue = useRef<RenderValueType>(modelValue);

  const inputValidate = () => {
    const errors = rules
      .map((rule) => rule(localValue.current))
      .filter((result) => result !== true) as string[];
    setErrorTexts(errors as string[]);
    let errText = "";
    const valid = errors.length === 0;
    if (!valid) {
      errText = errors[0]; // take the first error message if there are any
    }
    return { valid, errText };
  };

  // Function to reset the validation errors
  const resetInputValidate = () => {
    setErrorTexts([]);
  };

  // Function to reset the input value
  const resetInput = () => {
    localValue.current = "";
    onUpdateValue({
      target: { id, name, value: "" },
    } as ChangeEvent<HTMLInputElement>); // Reset model value
    resetInputValidate(); // Reset validation errors
  };

  // Function to handle input changes
  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    localValue.current = e.target.value;
    onUpdateValue(e); // Update the model value
    // validateOnBlur prior than validateOnInput
    if (!validateOnBlur && validateOnInput) inputValidate();
  };

  const actionOnBlur = () => {
    if (validateOnBlur) inputValidate();
  };

  return {
    errorTexts,
    inputValidate,
    resetInputValidate,
    resetInput,
    onInput,
    actionOnBlur,
  };
}
