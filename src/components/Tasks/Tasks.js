import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function Tasks() {

  let minDate = new Date().toISOString().slice(0, 10);
  const [text, setText] = useState('');
  const [checked, setChecked] = useState(false);
  const [date, setDate] = useState(minDate);
  const [isActive, setIsActive] = useState(false);
  const [groupId, setGroupId] = useState(1);
  const [groupList, setGroupList] = useState([]);
  const [tasksList, setTasksList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/groups").then((response) => {
      setGroupList(response.data);
      setGroupId(response.data[0].id_group)
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/tasks").then((response) => {
      setTasksList(response.data);
    });
  }, [tasksList]);
  
  let maxDate = minDate.slice(0, 4) * 1 + 1;
  maxDate = maxDate + "-12-31";

  const addTask = () => {
    Axios.post("http://localhost:3001/task/create", {
      name_task: text,
      important: checked.toString(),
      date_finish: date,
      id_group: groupId
    }).then((response) => {
      console.log(response);
      setTasksList([
        ...tasksList, {
          name_task: text,
          important: checked.toString(),
          date_finish: date,
          id_group: groupId
        }
      ]);
    });
  };

  const showAddTask = e => {
    e.preventDefault();
    setIsActive(!isActive);
  }

  const deleteTask = id_task => {
    const confirmTask = window.confirm("Czy na pewno chcesz usunąć zadanie?");
    if (confirmTask) {
      Axios.delete(`http://localhost:3001/delete/task/${id_task}`)
      .then((response) => {
        if(response.data.message) {
          alert(response.data.message)
        } else {
          setTasksList(tasksList.filter((val) => {
            return val.id_task !== id_task;
          }));
        }
      });
    }
  }

  return (
    <div className="container">
    <button className="btn" onClick={showAddTask}>{!isActive ? 'Nowe zadanie' : 'Ukryj'}</button>
    {isActive ? (
      <div className="tasks">
        <div className="form_inputs">
          <input
            className="form_input" 
            type="text" 
            placeholder="Nazwa zadania" 
            value={text} 
            onChange={e => setText(e.target.value)}
          />
          <div className="form_checkbox">
            <input 
              type="checkbox" 
              id="important" 
              checked={checked} 
              onChange={e => setChecked(e.target.checked)} 
            />
            <label className="form_label" htmlFor="important">Priorytet</label>
          </div>
          <label className="form_label" htmlFor="date">Do kiedy zrobić</label>
          <input
            className="form_input" 
            type="date" 
            value={date} 
            min={minDate} max={maxDate} 
            onChange={e => setDate(e.target.value)} 
          />
          <div className="form_select">
            <label className="form_label" htmlFor="group">Wybierz grupę</label>
            <select 
              className="form_select_group" 
              id="group"
              value={groupId}
              onChange={e => setGroupId(e.target.value)}
            >
              {groupList.map(group => {
                return (
                  <option value={group.id_group} key={group.id_group}>{group.name_group}</option>
                )
              })}
            </select>
          </div>
          <button className="btn btn_add" onClick={addTask}>Dodaj zadanie</button>
        </div>
      </div>
    ) : null}

    <h1 className="header_users">Zadania</h1>
    {groupList.map((value) => {
      return (

        <div className="container_list" key={value.id_group}>
          <div className="header_group">
            <h2 className="group_task">{value.name_group}</h2>
          </div>
          <ul className="list_params">
            <li className="list_params_item">Nazwa zadania</li>
            <li className="list_params_item">Priorytet</li>
            <li className="list_params_item">Data zakończenia</li>
            <li className="list_params_item">Akcje</li>
          </ul>

          {tasksList.map((val) => {
              if(value.id_group === val.id_group) {
              return (
                <ul className="list_users" key={val.id_task}>
                  <li className="list-group-item">{val.name_task}</li>
                  <li className="list-group-item">{val.important === 'false' ? 'Nie' : 'Tak'}</li>
                  <li className="list-group-item">{val.date_finish}</li>
                  <li className="list-group-item">
                    <button onClick={() => deleteTask(val.id_task)}>Zakończ zadanie</button>
                  </li>
                </ul>
              )
            } 
          })}
        </div>
      )
    })}
  </div>  
  );
};

export default Tasks;
