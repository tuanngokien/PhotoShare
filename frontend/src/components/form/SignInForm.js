import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import axios from 'axios';
import {FaFacebookF, FaGoogle, FaTwitter} from "react-icons/fa";

class SignInForm extends React.Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        };

        this.signInRequest = this.signInRequest.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    signInRequest = async () => {
        var data = {
            email: this.state.email,
            password: this.state.password,
        };
        await axios.post('/api/login', data)
            .then(function (response) {
                let data = response.data;
                if (data.success) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('id', data.id);
                    window.location.href = "#/pts/dashboard";
                } else {
                    let errors = data.errors;
                    for (const field of Object.keys(errors)) {
                        NotificationManager.error(errors[field], field, 1500);
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    inputEmail = (e) => {
        e.preventDefault();
        this.setState({email: e.target.value});
    }

    inputPassword = (e) => {
        e.preventDefault();
        this.setState({password: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.signInRequest();
    }

    redirectDashboard() {
        window.location.replace("/");
    }

    render() {
        return (
            <div className="form-items">
                <h3>Login to account</h3>
                <p>See what’s happening in the world right now</p>
                <form onSubmit={this.handleSubmit}>
                    <input className="form-control" type="text" name="email"
                           placeholder="E-mail Address" value={this.state.email} onChange={this.inputEmail} required/>
                    <input className="form-control" type="password" name="password"
                           placeholder="Password" value={this.state.password} onChange={this.inputPassword} required/>
                    <div className="form-button">
                        <button id="submit" type="submit" className="ibtn">Login</button>
                    </div>
                </form>
                <div className="other-links">
                    <div className="text">Find us on</div>
                    <a href="https://www.facebook.com/"><i className="fab facebook"><FaFacebookF/></i>Facebook</a>
                    <a href="https://www.google.com/"><i className="fab google"><FaGoogle/></i>Google</a>
                    <a href="https://twitter.com/"><i className="fab twitter"><FaTwitter/></i>Twitter</a>
                </div>
                <div className="page-links">
                    <NavLink to="/sign-up">Register new account</NavLink>
                </div>
            </div>
        )
    }
};

export default SignInForm;
