import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <h1>Podana strona nie istnieje</h1>
      <Link to="/login">Logowanie</Link>
    </>
  );
}

export default NotFound;
