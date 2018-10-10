import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Layout} from './container';
import FirstLogin  from './view/FirstLogin.js';
import Login from './view/Login.js';

import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter basename="/">
          <Switch>
            <Redirect exact from="/" to="/pts/dashboard" />
            <Route path="/pts" name="Home" component={Layout} />
            <Route path="/firstLogin" name="FirstLogin" component={FirstLogin} />
            <Route path="/login" name="Login" component={Login} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
