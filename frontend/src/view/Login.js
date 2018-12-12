import React, {Component} from 'react';
import {BrowserRouter as HashRouter, Route, Link, NavLink, Switch} from 'react-router-dom';
import SignUpForm from '../components/form/SignUpForm';
import SignInForm from '../components/form/SignInForm';
import {NotificationContainer} from 'react-notifications';
import '../components/form/form.css';



class Login extends Component {
    render() {
        return (
            <HashRouter basename="#/form">
                <div className="form-body without-side">
                    <NotificationContainer/>
                    <div className="website-logo">
                        <a href="/">
                            <div className="logo">
                                <img className="logo-size" src="https://uphinhnhanh.com/images/2018/12/12/logo3.png" alt=""/>
                            </div>
                        </a>
                    </div>
                    <div className="row">
                        <div className="img-holder">
                            <div className="bg"></div>
                            <div className="info-holder">
                                <img src="images/graphic3.svg" alt=""/>
                            </div>
                        </div>
                        <div className="form-holder">
                            <div className="form-content">
                                <Route exact path="/sign-up" name="SignUpForm" component={SignUpForm}/>
                                <Route exact path="/" name="SignInForm" component={SignInForm}/>
                            </div>
                        </div>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default Login;
