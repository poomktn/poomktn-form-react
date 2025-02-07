import { ChangeEvent, useRef, useState } from 'react';
import { CustomForm, CustomInput, FormRefProps } from './components';
import './App.css';

interface LoginDto {
  email: string
  name: string
  test: string
  var: string
}

function App() {
  const formRef = useRef<FormRefProps>(null)
  const [info, setInfo] = useState<LoginDto>({ email: '', name: '', test: '', var: '' })
  const [separate, setSeparate] = useState<string>('')
  const [errMsg, setErrMsg] = useState('')
  const [selectedTab, setSelectedTab] = useState(1)

  function setLogin(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setInfo(prev => ({ ...prev, [name]: value }))
  }

  const submitForm = () => {
    if (formRef?.current) {
      const form = formRef?.current
      const { isValid, errorText } = form.validate();
      console.log('info ', info)
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

  const showTab = (tab: number) => {
    return selectedTab === tab ? '' : 'none'
  }

  return (
    <div>
      <div onClick={() => setSelectedTab(1)}>tab 1</div>
      <div onClick={() => setSelectedTab(2)}>tab 2</div>
      <p>tab: {selectedTab}</p>
      <CustomForm ref={formRef}>
        <div style={{ display: showTab(1)}}>
          <CustomInput
            label='Name'
            placeholder='name'
            value={info.name}
            rules={[v => Boolean(v) || 'Name is required', v => (v as string).length <= 10 || 'Name Max 10 characters']}
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
          <div style={{ display: showTab(2)}}>
          <CustomInput
            label='test'
            name='test'
            placeholder='test'
            value={info.test}
            rules={[v => Boolean(v) || 'test is required', v => (v as string).length <= 10 || 'test Max 10 characters']}
            onChange={setLogin}
            validateOnBlur
          />
          <CustomInput
            label='var'
            name='var'
            placeholder='var'
            value={info.var}
            rules={[v => Boolean(v) || 'var is required', v => (v as string).length <= 10 || 'var Max 10 characters']}
            onChange={setLogin}
            validateOnInput={false}
          />
        </div>
        <div>
          <p>this is {errMsg}</p>
          <button type="button" onClick={submitForm}>Submit</button>
          <button type="button" onClick={resetAllForm}>Reset All</button>
          <button type="button" onClick={resetErrorForm}>Reset</button>
        </div >
      </CustomForm>
      <CustomInput
        label='okok'
        value={separate}
        rules={[v => Boolean(v) || 'Name is required', v => (v as string).length <= 10 || 'Max 10 characters']}
        placeholder='okok'
        onChange={e => setSeparate(e.target.value)}
        validateOnBlur
      />
    </div>
  )
}

export default App;
