import { RenderValueType, InputProps } from '../types/formType';
import { ChangeEvent, useRef, useState } from 'react';

export function useValidate(props: InputProps) {
  const [errorTexts, setErrorTexts ] = useState<string[]>([]);
  const localValue = useRef<RenderValueType>(props.modelValue);

  const inputValidate = () => {
    const errors = props.rules.map((rule) => rule(localValue.current)).filter((result) => result !== true);
    setErrorTexts(errors)
    let errText = '';
    let valid = errors.length === 0;
    if (!valid) {
      errText = errors[0]; // take the first error message if there are any
    }
    return { valid, errText };
  };

  // Function to reset the validation errors
  const resetInputValidate = () => {
    setErrorTexts([])
  };

  // Function to reset the input value
  const resetInput = () => {
    localValue.current = ''
    props.onUpdateValue({ target: { id: props.id, name: props.name, value: '' } } as ChangeEvent<HTMLInputElement>); // Reset model value
    resetInputValidate(); // Reset validation errors
  };

  // Function to handle input changes
  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    localValue.current = e.target.value
    props.onUpdateValue(e); // Update the model value
    inputValidate()
  };

  return {
    errorTexts,
    inputValidate,
    resetInputValidate,
    resetInput,
    onInput,
  };
}
