import { useRef, useState } from 'react';
import { CustomForm, CustomInput, FormRefProps } from './components';
import './App.css';
import { RenderValueType } from './types/formType';

interface LoginDto {
  email: string
  name: string
}

function App() {
  const formRef = useRef<FormRefProps>(null)
  const [info, setInfo] = useState<LoginDto>({ email: '', name: '' })
  const [errMsg, setErrMsg] = useState('')

  function setLogin(key: keyof LoginDto, val: RenderValueType) {
    setInfo(prev => ({ ...prev, [key]: val }))
  }

  const submitForm = () => {
    if (formRef?.current) {
      let { isValid, errorText } = formRef?.current.validate();
      if (isValid) {
        console.log('form is right!');
        setErrMsg('form is valid!')
      } else {
        console.log('form is wrong!');
        setErrMsg(errorText)
      }
    }
  };

  const resetAllForm = () => {
    if (formRef?.current) {
      formRef?.current.reset();
    }
    setErrMsg('')
  };

  const resetErrorForm = () => {
    if (formRef?.current) {
      formRef?.current.resetValidate();
    }
    setErrMsg('')
  };

  return (
    <div className='m-2'>
      <CustomForm ref={formRef}>
        <div>
          <CustomInput
            label='Name'
            value={info.name}
            rules={[v => Boolean(v) || 'Name is required', v => (v as string).length <= 10 || 'Max 10 characters']}
            onChange={val => setLogin('name', val)}
            placeholder='name'
          />
          <CustomInput
            label='Email'
            value={info.email}
            rules={[v => Boolean(v) || 'Email is required', v => /.+@.+\..+/.test(v as string) || 'Invalid email']}
            onChange={val => setLogin('email', val)}
            placeholder='email'
          />
        </div>
        <div>
          <p>this is {errMsg}</p>
          <button type="button" onClick={submitForm}>Submit</button>
          <button type="button" onClick={resetAllForm}>Reset All</button>
          <button type="button" onClick={resetErrorForm}>Reset</button>
        </div >
      </CustomForm >
      <CustomInput
        label='name'
        value={info.name}
        rules={[v => Boolean(v) || 'Name is required', v => (v as string).length <= 10 || 'Max 10 characters']}
        onChange={val => setLogin('name', val)}
        placeholder='name'
      />
    </div>
  )
}

export default App;
