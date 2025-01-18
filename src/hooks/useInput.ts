import { RenderValueType, InputProps } from '../types/formType';
import { useEffect, useRef} from 'react';

export function useInput(props: InputProps) {
  const errorTexts = useRef<string[]>([]);
  const modelValueRef = useRef<RenderValueType>(props.modelValue);

  const inputValidate = () => {
    errorTexts.current = props.rules.map((rule) => rule(modelValueRef.current)).filter((result) => result !== true);
    let errText = '';
    let valid = errorTexts.current.length === 0;
    if (!valid) {
      errText = errorTexts.current[0]; // take the first error message if there are any
    }
    return { valid, errText };
  };

  useEffect(() => {
    modelValueRef.current = props.modelValue
  }, [props.modelValue])

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
  };

  return {
    errorTexts: errorTexts.current,
    inputValidate,
    resetInputValidate,
    resetInput,
    onInput,
  };
}
