import { ChangeEvent, useRef, useState } from 'react';
import { CustomForm, CustomInput, FormRefProps } from './components';
import './App.css';

interface LoginDto {
  email: string
  name: string
}

function App() {
  const formRef = useRef<FormRefProps>(null)
  const [info, setInfo] = useState<LoginDto>({ email: '', name: '' })
  const [separate, setSeparate] = useState<string>('')
  const [errMsg, setErrMsg] = useState('')

  function setLogin(e: ChangeEvent<HTMLInputElement>) {
    let { name, value } = e.target
    console.log(name, value)
    setInfo(prev => ({ ...prev, [name]: value }))
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
            placeholder='name'
            value={info.name}
            rules={[v => Boolean(v) || 'Name is required', v => (v as string).length <= 10 || 'Max 10 characters']}
            name='name'
            onChange={setLogin}
          />
          <CustomInput
            label='Email'
            value={info.email}
            rules={[v => Boolean(v) || 'Email is required', v => /.+@.+\..+/.test(v as string) || 'Invalid email']}
            placeholder='email'
            name='email'
            onChange={setLogin}
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
        value={separate}
        rules={[v => Boolean(v) || 'Name is required', v => (v as string).length <= 10 || 'Max 10 characters']}
        placeholder='name'
        onChange={e => setSeparate(e.target.value)}
      />
    </div>
  )
}

export default App;
