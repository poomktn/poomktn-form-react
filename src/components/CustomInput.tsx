import { useContext, useEffect } from 'react'
import { useInput } from '../hooks/useInput'
import { FormContext } from './CustomForm'
import { RenderValueType, rulesProps } from '../types/formType'

interface InputProps {
  value: RenderValueType;
  rules: rulesProps[];
  label: string;
  showError?: boolean;
  onChange: (value: RenderValueType) => void; // Equivalent to the v-model binding
  placeholder?: string
}

export const CustomInput = ({ value, rules = [], label, showError = true, onChange, placeholder = '' }: InputProps) => {
  const form = useContext(FormContext); // Access form context
  const { errorTexts, inputValidate, resetInputValidate, resetInput, onInput } = useInput({ modelValue: value, rules, onUpdateModelValue: onChange });

  // Register input when component is mounted, unregister when it's unmounted
  useEffect(() => {
    if (form) {
      form?.register({ inputValidate, resetInputValidate, resetInput });
    }

    return () => {
      if (form) {
        form?.unregister({ inputValidate, resetInputValidate, resetInput });
      }
    };
  }, []);

  return (
    <div className="input-wrapper">
      <label>{label}</label>
      <input
        value={value as RenderValueType}
        // onInput={(e) => onInput((e.target as HTMLInputElement).value)}
        onChange={(e) => onInput(e.target.value)}
        className={errorTexts.length > 0 ? "error" : ""}
        placeholder={placeholder}
      />
      {showError && errorTexts.length > 0 && (
        <div className="error-messages">
          <p>{errorTexts[0]}</p>
        </div>
      )}
    </div>
  );
};