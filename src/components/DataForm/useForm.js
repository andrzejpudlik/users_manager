import { useState, useEffect } from 'react';
import Axios from 'axios';

const useForm = (user, changePersonalData, validate) => {
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    phone: ''
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
        Axios.post("http://localhost:3001/personal_data", {
          id_data: user[0].id,
          firstname: values.firstname,
          lastname: values.lastname,
          phone: values.phone
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
