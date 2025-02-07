import {
  ReactNode,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { FormContext, useForm } from '../hooks/useForm'
import { InputValidateProps } from '../types/formType'

type formProps = {
  children: ReactNode
  className?: string
}

type returnValProps = {
  isValid: boolean
  errorText: string
}

export type FormRefProps = {
  resetValidate: () => void
  reset: () => void
  validate: () => returnValProps
}

export type FormContextProps = {
  register: (input: InputValidateProps) => void,
  unregister: (input: InputValidateProps) => void
}

export const CustomForm = forwardRef<FormRefProps, formProps>(function CustomForm(
  { children, className }: formProps,
  ref
) {
  const {
    register,
    unregister,
    validate,
    resetValidate,
    reset,
  } = useForm();

  useImperativeHandle(
    ref,
    () => ({
      validate,
      resetValidate,
      reset,
    }),
    [reset, resetValidate, validate]
  )

  const defaultContext = { register, unregister }
  return (
    <FormContext.Provider value={defaultContext}>
      <form>
        <div className={className}>{children}</div>
      </form>
    </FormContext.Provider>
  )
})
