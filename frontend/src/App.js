import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Layout} from './container';
import Login from './view/Login.js';

import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter basename="/">
          <Switch>
            <Redirect exact from="/" to="/form" />
            <Redirect exact from="/pts/" to="/pts/dashboard" />
            <Route path="/pts" name="Home" component={Layout} />
            <Route path="/form" name="Login" component={Login} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
