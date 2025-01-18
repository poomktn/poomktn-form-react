import { RenderValueType, InputProps } from '../types/formType';
import { useEffect, useRef, useState } from 'react';

export function useInput(props: InputProps) {
  const [errorTexts, setErrorTexts ] = useState<string[]>([]);
  const modelValueRef = useRef<RenderValueType>(props.modelValue);

  const inputValidate = () => {
    const errors = props.rules.map((rule) => rule(modelValueRef.current)).filter((result) => result !== true);
    setErrorTexts(errors)
    let errText = '';
    let valid = errors.length === 0;
    if (!valid) {
      errText = errors[0]; // take the first error message if there are any
    }
    return { valid, errText };
  };

  useEffect(() => {
    modelValueRef.current = props.modelValue
    inputValidate()
  }, [props.modelValue])

  // Function to reset the validation errors
  const resetInputValidate = () => {
    setErrorTexts([])
  };

  // Function to reset the input value
  const resetInput = () => {
    props.onUpdateModelValue(''); // Reset model value
    resetInputValidate(); // Reset validation errors
  };

  // Function to handle input changes
  const onInput = (newVal: RenderValueType) => {
    props.onUpdateModelValue(newVal); // Update the model value
  };

  return {
    errorTexts,
    inputValidate,
    resetInputValidate,
    resetInput,
    onInput,
  };
}
