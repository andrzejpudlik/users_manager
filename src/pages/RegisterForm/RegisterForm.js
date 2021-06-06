import React from 'react';
import { Link } from 'react-router-dom';

import validate from './validateInfo';
import useForm from './useForm';


function RegisterForm() {
  const { handleChange, handleSubmit, values, errors } = useForm(
    validate
  );

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <h1>Rejestracja</h1>
        <div className='form-inputs'>
          <label className='form-label'>Nazwa użytkownika</label>
          <input
            className='form-input'
            type='text'
            name='username'
            placeholder='Podaj nazwę użytkownika'
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <input
            className='form-input'
            type='email'
            name='email'
            placeholder='Podaj email'
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Hasło</label>
          <input
            className='form-input'
            type='password'
            name='password'
            placeholder='Podaj hasło'
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Potwierdź hasło</label>
          <input
            className='form-input'
            type='password'
            name='password2'
            placeholder='Powtórz hasło'
            value={values.password2}
            onChange={handleChange}
          />
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
        <button className='form-input-btn' type='submit'>
          Zarejestruj się
        </button>
        <span className='form-input-login'>
          Masz już konto? <Link to="/login">Zaloguj się</Link>
        </span>
      </form>
    </div>
  );
}

export default RegisterForm;
