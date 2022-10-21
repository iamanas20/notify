import { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';
import { useNavigate } from "react-router-dom";
import { onError } from '.';
import { Button, TextInput, Link, FormField } from '../../components';
import { useUser, useApi, ErrorData } from "../../data";
import styles from './auth.module.scss';

type SignupData = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
}

export function Signup() {
  const navigate = useNavigate();
  const api = useApi(false);
  const { setUserToken } = useUser();
  const [form, setForm] = useState<SignupData>({
    name: '',
    email: '',
    password: '',
    rePassword: '',
  });

  const signupMutation = useMutation<{ authToken: string }, Error, Omit<SignupData, 'rePassword'>>(async (signupData) => {
    return (await api.post('auth/signup', signupData)).data;
  }, {
    onSuccess: (data) => {
      setUserToken(data.authToken);
      toast.success('Signed up successfully! Welcome to Notify!');
      navigate('/');
    },
    onError
  });

  function signup() {
    if(form.name && form.email) {
      if(form.password === form.rePassword) {
        signupMutation.mutate({
          name: form.name,
          email: form.email,
          password: form.password
        });
      }
    }
  }

  return (
    <div className={styles.signUpPage}>
      <h1 className={styles.title}>
        Welcome to Notify
      </h1>
      <form className={styles.form}>
        <FormField label='Your name'>
          <TextInput value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}/>
        </FormField>
        <FormField label='Email'>
          <TextInput value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}/>
        </FormField>
        <FormField label='Password'>
          <TextInput value={form.password} type="password" onChange={(e) => setForm({...form, password: e.target.value})}/>
        </FormField>
        <FormField label='Password again'>
          <TextInput value={form.rePassword} type="password" onChange={(e) => setForm({...form, rePassword: e.target.value})}/>
        </FormField>
        
        <Button
          className={styles.button}
          loading={signupMutation.isLoading}
          type="primary"
          children="Create your account"
          onClick={signup}
        />
      </form>
      <p className={styles.goToOpp}>
        <Link to="/auth">Go to login</Link>
      </p>
    </div>
  )
}