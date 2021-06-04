import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Axios from 'axios';

import DataForm from '../../components/DataForm/DataForm';
import Sidebar from '../../components/Sidebar/Sidebar';
import Users from '../../components/Users/Users';
import Groups from '../../components/Groups/Groups';
import Tasks from '../../components/Tasks/Tasks';
import Setting from '../../components/Setting/Setting';


function Dashboard(props) {

  if (props === "") {
    <Redirect to="/login" />
  }
  const [isExistPersonalData, setIsExistPersonalData] = useState(false);
  const [personalData, setPersonalData] = useState(false);
  useEffect(() => {
    if (props.user !== "") {
      Axios.post("http://localhost:3001/personal_data/is_exist", {
        id: props.user[0].id
      }).then((response) => {
        console.log(response);
        if (!(response.data.message)) {
          setIsExistPersonalData(true);
        }
      });
    }
  }, [props, personalData]);

  return (
    <>
      {(!isExistPersonalData && !personalData) ? 
        <DataForm {...props} changePersonalData={personalData => setPersonalData(personalData)} />
      : (
      <Router>
        <Sidebar {...props} />
        <Switch>
          <Route path='/admin/dashboard/users' exact component={Users} />
          <Route path='/admin/dashboard/groups' exact component={Groups} />
          <Route path='/admin/dashboard/tasks' exact component={Tasks} />
          <Route path='/admin/dashboard/setting'>
            <Setting {...props} />
          </Route>
        </Switch>
      </Router>
      )}
    </>
  );
};

export default Dashboard;
