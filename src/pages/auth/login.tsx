import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Button, TextInput, Link, FormField } from '../../components';
import { useUser, useApi } from "../../data";
import styles from './auth.module.scss';

export function Login() {
  const navigate = useNavigate();
  const api = useApi(false);
  const { setUserToken } = useUser();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const loginMutation = useMutation(async (loginData) => {
    return (await api.post('auth/login', loginData)).data;
  }, {
    onSuccess: (data) => {
      setUserToken(data.authToken);
      navigate('/');
    },
  });

  function login() {
    if(form.password && form.email) {
      loginMutation.mutate({
        email: form.email,
        password: form.password
      } as any);
    }
  }

  return (
    <div className={styles.loginPage}>
      <h1 className={styles.title}>
        Login back to Notify
      </h1>
      <form className={styles.form}>
        <FormField label='Email'>
          <TextInput value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}/>
        </FormField>
        <FormField label='Password'>
          <TextInput value={form.password} type="password" onChange={(e) => setForm({...form, password: e.target.value})}/>
        </FormField>

        <Button
          className={styles.button}
          loading={loginMutation.isLoading}
          type="primary"
          children="Login to your account"
          onClick={login}
        />
      </form>
      <p className={styles.goToOpp}>
        <Link to="/auth/signup">Go to sign up</Link>
      </p>
    </div>
  )
}