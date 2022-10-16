import axios from 'axios';
import { MouseEvent, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, TextInput, Link } from '../../components';
import { FormField } from '../../components/inputs/formField';
import { useUser } from '../../data/authMiddleware';
import styles from './auth.module.scss';

export function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUserToken } = useUser();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    rePassword: '',
  });

  function signup() {
    if(form.name && form.email) {
      if(form.password === form.rePassword) {
        setLoading(true);
        axios.post(process.env.REACT_APP_API_URL + 'auth/signup', {
          name: form.name,
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
          <TextInput value={form.password} onChange={(e) => setForm({...form, password: e.target.value})}/>
        </FormField>
        <FormField label='Password again'>
          <TextInput value={form.rePassword} onChange={(e) => setForm({...form, rePassword: e.target.value})}/>
        </FormField>
        
        <Button
          className={styles.button}
          loading={loading}
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