import React from 'react';
import ReactDom from 'react-dom';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  width: '80%',
  zIndex: 1000
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

function ModalGroup({ open, children, onClose, usersList, changeUserId }) {
  if (!open) return null;
  
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button onClick={onClose}>Zamknij</button>
        {children}
        <div className="container">
          <h1 className="header_users">Użytkownicy</h1>
          <ul className="list_params">
            <li className="list_params_item">Imię</li>
            <li className="list_params_item">Nazwisko</li>
            <li className="list_params_item">Email</li>
            <li className="list_params_item">Telefon</li>
            <li className="list_params_item">Akcja</li>
          </ul>
          {usersList.map((val) => {
            if(!(Number.isInteger(val.id_group))) {
              return (
              <ul className="list_users" key={val.lastname}>
                <li className="list-group-item">{val.firstname}</li>
                <li className="list-group-item">{val.lastname}</li>
                <li className="list-group-item">{val.email}</li>
                <li className="list-group-item">{val.phone}</li>
                <li className="list-group-item">
                  <button className='btn_edit' onClick={() => changeUserId(val.id)}>
                    Dodaj użytkownika
                  </button>
                </li>
              </ul>
              )
            }
          })}
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
};

export default ModalGroup;