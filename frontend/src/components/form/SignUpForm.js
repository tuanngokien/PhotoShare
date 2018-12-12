import React, {Component} from 'react';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import {NotificationContainer, NotificationManager} from 'react-notifications'
import 'react-notifications/dist/react-notifications.css'
import {FaFacebookF, FaGoogle, FaTwitter} from "react-icons/fa";
import {NavLink} from "react-router-dom";

class SignUpForm extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signUpRequest = this.signUpRequest.bind(this);
    }

    signUpRequest = async () => {
        var com = this;
        var data = {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
        }
        await axios.post('/api/signup', data)
            .then(function (response) {
                let data = response.data;
                if (data.success) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('id', data.id);
                    NotificationManager.success("You have signed up successfully", "Photoshare", 1500);
                    setTimeout(() => {
                        window.location.href = "#/pts/dashboard";
                    }, 1500);
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
    };

    inputEmail = (e) => {
        e.preventDefault();
        this.setState({email: e.target.value});
    };

    inputPassword = (e) => {
        e.preventDefault();
        this.setState({password: e.target.value});
    };

    inputFirstName = (e) => {
        e.preventDefault();
        this.setState({firstName: e.target.value});
    };

    inputLastName = (e) => {
        e.preventDefault();
        this.setState({lastName: e.target.value});
    };

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.signUpRequest();
    }

    render() {
        return (
            <div className="form-items">
                <h3>Register new account</h3>
                <p>See what’s happening in the world right now</p>
                <form onSubmit={this.handleSubmit}>
                    <input className="form-control" type="text" name="firstName" placeholder="First Name"
                           value={this.state.firstName} onChange={this.inputFirstName} required/>
                    <input className="form-control" type="text" name="lastName" placeholder="Last Name"
                           value={this.state.lastName} onChange={this.inputLastName} required/>
                    <input className="form-control" type="email" name="email" placeholder="E-mail Address"
                           value={this.state.email} onChange={this.inputEmail} required/>
                    <input className="form-control" type="password" name="password" placeholder="Password"
                           value={this.state.password} onChange={this.inputPassword} required/>
                    <div className="form-button">
                        <button id="submit" type="submit" className="ibtn">Register</button>
                    </div>
                </form>
                <div className="other-links">
                    <div className="text">Find us on</div>
                    <a href="https://www.facebook.com/"><i className="fab facebook"><FaFacebookF/></i>Facebook</a>
                    <a href="https://www.google.com/"><i className="fab google"><FaGoogle/></i>Google</a>
                    <a href="https://twitter.com/"><i className="fab twitter"><FaTwitter/></i>Twitter</a>
                </div>
                <div className="page-links">
                    <NavLink to="/">Login to account</NavLink>
                </div>
            </div>
        );
    }
}

export default SignUpForm;
