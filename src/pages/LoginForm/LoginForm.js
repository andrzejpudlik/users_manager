import React from 'react';
import Axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

import validate from './validateInfo';
import useForm from './useForm';

function LoginForm({ changePersonalData }) {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );
  const history = useHistory();

  function submitForm() {
    Axios.post("http://localhost:3001/login", {
      username: values.usernameLogin,
      password: values.passwordLogin
    }).then((response) => {
      if (response.data.message) {
        alert(response.data.message);
      } else {
        changePersonalData(true);
        history.push('/admin/dashboard');
      }
    });
  }

  return (
    <>
      <div className='form-container'>
        <form onSubmit={handleSubmit} className='form' noValidate>
          <h1>
            Logowanie
          </h1>
          <div className='form-inputs'>
            <label className='form-label'>Nazwa użytkownika</label>
            <input
              className='form-input'
              type='text'
              name='usernameLogin'
              placeholder='Wpisz swoją nazwę użytkownika'
              value={values.usernameLogin}
              onChange={handleChange}
            />
            {errors.usernameLogin && <p>{errors.usernameLogin}</p>}
          </div>
          <div className='form-inputs'>
            <label className='form-label'>Hasło</label>
            <input
              className='form-input'
              type='password'
              name='passwordLogin'
              placeholder='Wpisz swoje hasło'
              value={values.passwordLogin}
              onChange={handleChange}
            />
            {errors.passwordLogin && <p>{errors.passwordLogin}</p>}
          </div>
          <button className='form-input-btn' type='submit'>
            Zaloguj się
          </button>
          <span className='form-input-login'>
            Nie masz jeszcze konta? <Link to="/register">Zarejestruj się</Link>
          </span>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
