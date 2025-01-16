import { useRef } from 'react';
import { InputValidateProps } from '../types/formType';

export function useForm() {
  const inputsRef = useRef<InputValidateProps[]>([]);
  // Register a new input
  const register = (input: InputValidateProps) => {
    inputsRef.current.push(input);
  }

  // Unregister an input
  const unregister = (input: InputValidateProps) => {
    inputsRef.current = inputsRef.current.filter((i) => i !== input);
  }

   // Validate all inputs
   const validate = () => {
    let errorText = '';
    let isValid = true;
    inputsRef.current.forEach((input) => {
      console.log(input)
      let { valid, errText } = input.inputValidate();
      if (!valid) {
        isValid = false;
        if (!errorText) errorText = errText;
      }
    });
    return { isValid, errorText };
  }

  // Reset validation state for all inputs
  const resetValidate = () => {
    inputsRef.current.forEach((input) => input.resetInputValidate());
  }

  // Reset all input values
  const reset = () => {
    inputsRef.current.forEach((input) => input.resetInput());
  }

  return {
    register,
    unregister,
    validate,
    resetValidate,
    reset,
  };
}
