export default function validateInfo(values) {
  let errors = {};

  if (!values.usernameLogin) {
    errors.usernameLogin = 'Nazwa użytkownika jest wymagana';
  }

  if (!values.passwordLogin) {
    errors.passwordLogin = 'Hasło jest wymagane';
  }
  return errors;
}
