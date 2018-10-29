import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import axios from 'axios';
import * as IpConfig from '../../ipConfig/IpConfig.js'

class SignInForm extends Component {
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
      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token' : localStorage.getItem('token')
      };
      var data = {
        email: this.state.email,
        password: this.state.password, 
      }
      await axios.post(IpConfig + '/api/signin',{headers: headers}, {params: data})
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

    handleSubmit(e) {
        e.preventDefault();

        console.log('The form was submitted with the following data:');
        console.log(this.state);
    }

    redirectDashboard(){
        window.location.replace("/");
    }
    render() {
        return (
        <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields" onSubmit={this.handleSubmit}>
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

              <div className="FormField">
                  <button 
                    className="FormField__Button mr-20" 
                    onClick={this.signInRequest}
                  >
                    Sign In
                  </button>
              </div>
            </form>
          </div>
        );
    }
}

export default SignInForm;
