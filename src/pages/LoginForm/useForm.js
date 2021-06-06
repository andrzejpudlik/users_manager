import { useState, useEffect } from 'react';
import Axios from 'axios';

const useForm = (changePersonalData, validate) => {
  const [values, setValues] = useState({
    usernameLogin: '',
    passwordLogin: '', 
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        Axios.post("http://localhost:3001/login", {
          username: values.usernameLogin,
          password: values.passwordLogin
        }).then((response) => {
          if (response.data.message) {
            alert(response.data.message);
          } else {
            changePersonalData(true);
          }
        });
      }
    },
    [errors]
  );

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
