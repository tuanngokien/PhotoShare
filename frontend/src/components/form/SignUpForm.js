import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as IpConfig from '../../ipConfig/IpConfig.js';
import Button from "@material-ui/core/Button";

class SignUpForm extends Component {
    constructor() {
        super();

        this.state = {
          email: null,
          password: null,
          firstName: null,
          lastName: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signUpRequest = this.signUpRequest.bind(this);
    }

    signUpRequest = async () => {
      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      var data = {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
      }
      await axios.post(IpConfig.URL + '/api/signup', data)
      .then(function (response) {
        console.log(response);
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

    inputFirstName = (e) => {
      e.preventDefault();
      this.setState({firstName: e.target.value});
    }

    inputLastName = (e) => {
      e.preventDefault();
      this.setState({lastName: e.target.value});
    }

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

        console.log('The form was submitted with the following data:');
        console.log(this.state);
    }

    render() {
        return (
        <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="name">First Name</label>
                <input
                  type="text"
                  className="FormField__Input"
                  placeholder="Enter your first name"
                  name="name" value={this.state.fisrtName}
                  onChange={this.inputFirstName} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="name">Last Name</label>
                <input
                  type="text"
                  className="FormField__Input"
                  placeholder="Enter your last name"
                  name="name"
                  value={this.state.lastName}
                  onChange={this.inputLastName} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input
                  type="email"
                  id="email"
                  className="FormField__Input"
                  placeholder="Enter your email" name="email"
                  value={this.state.email} onChange={this.inputEmail} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="FormField__Input"
                  placeholder="Enter your password"
                  name="password"
                  value={this.state.password}
                  onChange={this.inputPassword} />
              </div>
              <div className="FormField" style={{textAlign: 'center'}}>
                <Button
                  variant="extendedFab"
                  aria-label="Delete"
                  style={{ backgroundColor: '#52C4B9', color: 'white', minWidth: '30%'}}
                  onClick={this.signUpRequest}
                >
                  <span>Sign up</span>
                </Button>
              </div>
            </form>
          </div>
        );
    }
}

export default SignUpForm;
