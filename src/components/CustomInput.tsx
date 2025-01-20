import { ChangeEvent, useContext, useEffect } from 'react'
import { useValidate } from '../hooks/useValidate'
import { FormContext } from './CustomForm'
import { RenderValueType, rulesProps } from '../types/formType'

interface InputProps {
  id?: string
  name?: string
  value: RenderValueType;
  rules: rulesProps[];
  label: string;
  showError?: boolean;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void; // Equivalent to the v-model binding
  placeholder?: string
}

export const CustomInput = ({ id, name, value, rules = [], label, showError = true, onChange, placeholder = '' }: InputProps) => {
  const form = useContext(FormContext); // Access form context
  const { errorTexts, inputValidate, resetInputValidate, resetInput, onInput } = useValidate({ modelValue: value, rules, onUpdateValue: onChange, id, name });
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
        id={id}
        name={name}
        value={value as RenderValueType}
        // onInput={(e) => onInput((e.target as HTMLInputElement).value)}
        onChange={onInput}
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