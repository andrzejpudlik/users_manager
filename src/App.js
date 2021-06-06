import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import RegisterForm from './pages/RegisterForm/RegisterForm';
import LoginForm from './pages/LoginForm/LoginForm';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/404';

import './App.css';

function App() {
  Axios.defaults.withCredentials = true;
  const [loginStatus, setLoginStatus] = useState('');
  const [personalData, setPersonalData] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await Axios.get('http://localhost:3001/login');
      console.log(response);
        if (response.data.loggedIn === true) {
          setLoginStatus(response.data.user);
          console.log(response.data.user);
        };
    }
    fetchMyAPI();
  }, [personalData]);
  
  return (
    <Router>
        <Switch>
  
          {loginStatus ? (
            <Route exact path="/login">
              <Redirect to="/admin/dashboard" />
            </Route>
          ) : (
            <Route exact path="/login">
              <LoginForm changePersonalData={personalData => setPersonalData(personalData)} />
            </Route>
          )}

          {loginStatus ? null : (
            <Route path="/admin/dashboard">
              <Redirect to="/login" />
            </Route>
          )}

          <Route path="/admin/dashboard">
              <Dashboard user={loginStatus} />
          </Route>

          <Route exact path="/">
            <Redirect to="/login" />
          </Route>

          <Route exact path="/register">
            <RegisterForm />
          </Route>

          <Route component={NotFound} />

        </Switch>
    </Router>
  );
}

export default App;
