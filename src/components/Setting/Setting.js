import React, {useEffect, useState } from 'react';
import Axios from 'axios';

import './Setting.css';

function Setting({ user }) {
  const [dataSetting, setDataSetting] = useState([]);
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [isActiveSetting, setIsActiveSetting] = useState(false);

  useEffect(() => {
    Axios.post("http://localhost:3001/setting/user", {
      username: user[0].username
    }).then((response) => {
      setDataSetting(response.data[0]);
      setNewFirstName(response.data[0].firstname);
      setNewLastName(response.data[0].lastname);
      setNewEmail(response.data[0].email);
      setNewPhone(response.data[0].phone);
    })
  }, [user]);

  const handleClick = () => {
    setIsActiveSetting(!isActiveSetting);
    if(isActiveSetting) {
      Axios.put("http://localhost:3001/setting/user/update", {
        id: user[0].id,  
        firstname: newFirstName,
        lastname: newLastName,
        email: newEmail,
        phone: newPhone
      }).then((response) => {
        if (response.data.message) {
          alert(response.data.message);
        } else {
          setDataSetting({
            firstname: newFirstName,
            lastname: newLastName,
            email: newEmail,
            phone: newPhone
          })
        }
      });
    };
  };

  return (
    <div className="container">
      <h1 className="header_users">Ustawienia konta</h1>
      <div className="form_setting_inputs">
        <label className="form_label">Twoje dane</label>
        <div className="list_setting">
          <p>Imię: </p>
          <p>{dataSetting.firstname}</p>
          {isActiveSetting && (
          <input 
            className="form_setting_input"
            type="text"
            value={newFirstName}
            onChange={e => setNewFirstName(e.target.value)}
          />
          )}
        </div>
        <div className="list_setting">
          <p>Nazwisko: </p>
          <p>{dataSetting.lastname}</p>
          {isActiveSetting && (
          <input 
            className="form_setting_input"
            type="text" 
            value={newLastName}
            onChange={e => setNewLastName(e.target.value)}
          />
          )}
        </div>
        <div className="list_setting">
          <p>Email: </p>
          <p>{dataSetting.email}</p>
          {isActiveSetting && (
          <input 
            className="form_setting_input"
            type="text" 
            value={newEmail}
            onChange={e => setNewEmail(e.target.value)} 
          />
          )}
        </div>
        
        <div className="list_setting">
          <p>Telefon: </p>
          <p>{dataSetting.phone}</p>
          {isActiveSetting && (
            <input 
              className="form_setting_input"
              type="text" 
              value={newPhone}
              onChange={e => setNewPhone(e.target.value)} 
            />
          )}
        </div>

        <button 
          className="btn btn_add" 
          onClick={handleClick}
        >
          {!isActiveSetting ? 'Zmień dane' : 'Zapisz dane'}
        </button>
      </div>
    </div>
  );
};

export default Setting;
