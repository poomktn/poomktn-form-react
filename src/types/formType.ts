import { ChangeEvent } from 'react'

export interface InputValidateProps {
  inputValidate: () => { valid: boolean, errText: string }
  resetInputValidate: () => void
  resetInput: () => void
}

export type rulesProps = (input?: RenderValueType) => string | boolean

export type RenderValueType = string | number
export type AllValueType = RenderValueType | boolean

export interface InputProps {
  modelValue: RenderValueType;
  rules: ((v: RenderValueType) => boolean | string)[];
  onUpdateValue: (value: ChangeEvent<HTMLInputElement>) => void;
  validateOnInput: boolean;
  validateOnBlur: boolean;
  id?: string;
  name?: string;
}
