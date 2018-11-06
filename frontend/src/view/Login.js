import React, { Component } from 'react';
import { BrowserRouter as HashRouter, Route, Link, NavLink, Switch } from 'react-router-dom';
import SignUpForm from '../components/form/SignUpForm.js';
import SignInForm from '../components/form/SignInForm';
import Background from "./../assets/img/back.png";
import {NotificationContainer, NotificationManager} from 'react-notifications';

import '../components/form/Form.css';


class Login extends Component {
  render() {
    return (
      <HashRouter basename="#/form">
        <Switch>
        <div className="App_app" style = {{backgroundImage: `url(${Background})`, width: '100%', height:'100%' }}>
          <div className="App__Form">
            <div className="PageSwitcher">
              <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
              <NavLink to="/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
            </div>

            <div className="FormTitle">
              <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or
              <NavLink to="/sign-up" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
            </div>
                <Route exact path="/sign-up" name="SignUpForm" component={SignUpForm}/>
                <Route exact path="/" name="SignInForm" component={SignInForm}/>
          </div>
        </div>
        </Switch>
      </HashRouter>
    );
  }
}

export default Login;
