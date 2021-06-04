import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import ModalGroup from './ModalGroup';
import './Groups.css';

function Groups() {

  const [userId, setUserId] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [nameGroup, setNameGroup] = useState('');
  const [groupList, setGroupList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [groupUsers, setGroupUsers] = useState([]);

  const addGroup = () => {
    Axios.post("http://localhost:3001/group/create", {
      name_group: nameGroup,
    }).then((response) => {
      if (response.data.message) {
        alert(response.data.message);
      } else {
        setIsActive(!isActive);
        setGroupList([
          ...groupList, {
            name_group: nameGroup,
          }
        ]);
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/groups").then((response) => {
      setGroupList(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/group/users").then((response) => {
      setGroupUsers(response.data.result);
    });
  }, [groupUsers, groupList]);

  useEffect(() => {
    Axios.get('http://localhost:3001/users')
      .then((response) => {
        setUsersList(response.data.result);
      });
  }, [groupUsers]);

  const showAddGroup = e => {
    e.preventDefault();
    setIsActive(!isActive);
  }

  const handleClick = id => {
    setGroupId(id);
    setIsOpen(true);
  }

  const deleteUserFromGroup = id => {
    const confirmDeleteUserFromGroup = window.confirm("Czy na pewno chcesz usunąć użytkownika z grupy?");
    if (confirmDeleteUserFromGroup) {
      Axios.put("http://localhost:3001/remove/group/user", {
        id: id
      }).then((response) => {
        if (response.data.message) {
          alert(response.data.message);
        } else {
          setGroupUsers(groupUsers.filter((val) => {
            return val.id !== id;
          }));
        };
      });
    }
  }

  const removeGroup = id_group => {
    const confirmDeleteGroup = window.confirm("Czy na pewno chcesz usunąć grupę?");
    if (confirmDeleteGroup) {
      Axios.delete(`http://localhost:3001/delete/group/${id_group}`).then((response) => {
        if(response.data.message) {
          alert(response.data.message)
        } else {
          setGroupList(groupList.filter((val) => {
            return val.id_group !== id_group;
          }));
        }
      });
    }
  }

  useEffect(() => {
      if (userId) {
        Axios.put("http://localhost:3001/update/group/user", {
          id_group: groupId,
          id: userId,       
        }).then((response) => {
          if (response.data.message) {
            alert(response.data.message);
          } else {
            Axios.get("http://localhost:3001/group/users").then((response) => {
              setGroupUsers(response.data.result);
            });
            setIsOpen(false);
            setUsersList(usersList.filter(users => {
              return users.id !== userId;
            }));
          };
        });
      }
  }, [userId]);

  return (
    <div className="container">

      <button className="btn" onClick={showAddGroup}>{!isActive ? 'Nowa grupa' : 'Ukryj'}</button>
      
      {isActive ? (
      <div className="form_inputs">
        <label className="form_label">Nowa grupa</label>
        <input 
          className="form_input"
          type="text" 
          placeholder="Nazwa grupy" 
          value={nameGroup} 
          onChange={e => setNameGroup(e.target.value)}
        />
        <button className="btn btn_add" onClick={addGroup}>Zapisz</button>
      </div>
      ) : null}
      <h1>Grupy</h1>
      {groupList.map((value) => {
        return (
          <div className="container_list" key={value.id_group}>
            <div className="header_group">
              <h2 className="name_group">{value.name_group}</h2>
              <button className="btn" onClick={() => handleClick(value.id_group)}>Dodaj użytkowników</button>
              <ModalGroup key={value.id_group} open={isOpen} onClose={() => setIsOpen(false)} usersList={usersList} changeUserId={userId => setUserId(userId)} />
              <button className="btn" disabled={isDisabled} onClick={() => removeGroup(value.id_group)}>Usuń grupę</button>
            </div>
            <ul className="list_params">
              <li className="list_params_item">Imię</li>
              <li className="list_params_item">Nazwisko</li>
              <li className="list_params_item">Email</li>
              <li className="list_params_item">Telefon</li>
              <li className="list_params_item">Akcje</li>
            </ul>
            {groupUsers ? groupUsers.map((val) => {
              if(value.id_group === val.id_group) {
              return (
                <ul className="list_users" key={val.phone}>
                  <li className="list-group-item">{val.firstname}</li>
                  <li className="list-group-item">{val.lastname}</li>
                  <li className="list-group-item">{val.email}</li>
                  <li className="list-group-item">{val.phone}</li>
                  <li className="list-group-item">
                    <button onClick={() => deleteUserFromGroup(val.id)}>Usuń z grupy</button>
                  </li>
                </ul>
              )}
            }) : null}
          </div>
        )
      })}

    </div>
  );
};

export default Groups;