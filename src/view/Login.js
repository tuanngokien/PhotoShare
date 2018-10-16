import React, { Component } from 'react';
import { BrowserRouter as HashRouter, Route, Link, NavLink, Switch } from 'react-router-dom';
import SignUpForm from '../components/form/login/SignUpForm.js';
import SignInForm from '../components/form/login/SignInForm';
import Background from "./../assets/img/back.png";

import '../components/form/login/AppLogin.css';


class Login extends Component {
  render() {
    return (
      <HashRouter basename="#/form">
        <Switch>
        <div className="App_app" style = {{backgroundImage: `url(${Background})`, width: '100%', height:'100%' }}>
          <div className="App__Form">
            <div className="PageSwitcher">
              <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
              <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
            </div>

            <div className="FormTitle">
              <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or
              <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
            </div>
                <Route exact path="/" name="SignUpForm" component={SignUpForm}/>
                <Route exact path="/sign-in" name="SignInForm" component={SignInForm}/>
          </div>
        </div>
        </Switch>
      </HashRouter>
    );
  }
}

export default Login;
