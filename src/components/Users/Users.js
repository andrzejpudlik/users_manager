import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function Users() {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:3001/users')
      .then((response) => {
        setUsersList(response.data.result);
      });
  }, []);
  return (
    <div className="container">
      <h1 className="header_users">Użytkownicy</h1>
      <ul className="list_params">
        <li className="list_params_item">Imię</li>
        <li className="list_params_item">Nazwisko</li>
        <li className="list_params_item">Email</li>
        <li className="list_params_item">Telefon</li>
      </ul>
      {usersList.map((val, key) => {
        return (
          <ul className="list_users" key={val.lastname}>
            <li className="list-group-item">{val.firstname}</li>
            <li className="list-group-item">{val.lastname}</li>
            <li className="list-group-item">{val.email}</li>
            <li className="list-group-item">{val.phone}</li>
          </ul>
        )
      })}
    </div>
  );
};

export default Users;
