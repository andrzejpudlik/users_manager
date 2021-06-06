import React from 'react';
import { Link } from 'react-router-dom';

import validate from './validateInfo';
import useForm from './useForm';

function LoginForm({ changePersonalData }) {
  const { handleChange, handleSubmit, values, errors } = useForm(
    changePersonalData,
    validate
  );

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
