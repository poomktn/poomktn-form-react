import { RenderValueType, InputProps } from '../types/formType';
import { useRef} from 'react';

export function useInput(props: InputProps) {
  const errorTexts = useRef<string[]>([]);
  const inputValidate = () => {
    errorTexts.current = props.rules.map((rule) => rule(props.modelValue)).filter((result) => result !== true);
    let errText = '';
    let valid = errorTexts.current.length === 0;
    if (!valid) {
      errText = errorTexts.current[0]; // take the first error message if there are any
    }
    return { valid, errText };
  };

  // Function to reset the validation errors
  const resetInputValidate = () => {
    errorTexts.current = [];
  };

  // Function to reset the input value
  const resetInput = () => {
    props.onUpdateModelValue(''); // Reset model value
    resetInputValidate(); // Reset validation errors
  };

  // Function to handle input changes
  const onInput = (newVal: RenderValueType) => {
    props.onUpdateModelValue(newVal); // Update the model value
    inputValidate()
  };

  return {
    errorTexts: errorTexts.current,
    inputValidate,
    resetInputValidate,
    resetInput,
    onInput,
  };
}
