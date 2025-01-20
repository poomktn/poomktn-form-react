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
  rules: Function[];
  onUpdateValue: (value: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
}
