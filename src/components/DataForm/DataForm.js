import React from 'react';

import validate from './validateInfo';
import useForm from './useForm';

import './DataForm.css';

const DataForm = ({ user, changePersonalData }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    user,
    changePersonalData,
    validate
  );

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <h1>
          Wprowadź swoje dane
        </h1>
        <div className='form-inputs'>
          <label className='form-label'>Imię</label>
          <input
            className='form-input'
            type='text'
            name='firstname'
            placeholder='Podaj imię'
            value={values.firstname}
            onChange={handleChange}
          />
          {errors.firstname && <p>{errors.firstname}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Nazwisko</label>
          <input
            className='form-input'
            type='text'
            name='lastname'
            placeholder='Podaj nazwisko'
            value={values.lastname}
            onChange={handleChange}
          />
          {errors.lastname && <p>{errors.lastname}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Telefon</label>
          <input
            className='form-input'
            type='text'
            name='phone'
            placeholder='Podaj telefon'
            value={values.phone}
            onChange={handleChange}
          />
          {errors.phone && <p>{errors.phone}</p>}
        </div>
        <button className='form-input-btn' type='submit'>
          Potwierdź
        </button>
      </form>
    </div>
  );
};

export default DataForm;
