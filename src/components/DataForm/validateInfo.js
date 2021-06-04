export default function validateInfo(values) {
  let errors = {};

  if (!values.firstname.trim()) {
    errors.firstname = 'Imię jest wymagane';
  }


  if (!values.lastname) {
    errors.lastname = 'Nazwisko jest wymagane';
  } 

  if (!values.phone) {
    errors.phone = 'Numer telefony jest wymagany';
  } 
  // else if (values.password.length < 9) {
  //   errors.phone = 'Numer telefonu musi zawierać przynajmniej 9 liczb';
  // }

  return errors;
}
