import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Link, TextInput } from '../../components';
import { FormField } from '../../components/inputs/formField';
import { useUser } from '../../data/authMiddleware';
import styles from './auth.module.scss';

export function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUserToken } = useUser();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  function login() {
    if(form.password && form.email) {
      setLoading(true);
      axios.post(process.env.REACT_APP_API_URL + 'auth/login', {
        email: form.email,
        password: form.password
      })
      .then(
        response => {
          setUserToken(response.data.authToken);
          navigate('/');
        }
      )
      .finally(
        () => {
          setLoading(false);
        }
      )
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
          <TextInput value={form.password} onChange={(e) => setForm({...form, password: e.target.value})}/>
        </FormField>

        <Button
          className={styles.button}
          loading={loading}
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