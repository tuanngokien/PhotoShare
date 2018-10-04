import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Layout} from './container';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter basename="/">
          <Switch>
            <Redirect exact from="/" to="/dashboard" />
            <Route path="/dashboard/" name="Dashboard" component={Layout} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
