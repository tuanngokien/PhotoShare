import React, { Component } from 'react';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import {NotificationContainer, NotificationManager} from 'react-notifications'
import 'react-notifications/dist/react-notifications.css'

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
        this.redirect = this.redirect.bind(this);
    }

    signUpRequest = async () => {
      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      var com = this;
      var data = {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
      }
      await axios.post('/api/signup', data)
      .then(function (response) {
        console.log(response);
        response.data.success? com.createNotification('success')
        : com.createNotification(response.data.errors===null? 'info': (response.data.errors.email||response.data.errors.password)) ;
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

    redirect() {
      window.location.replace('#/form');
    }

    createNotification = (type) => {
      switch (type) {
        case 'success':
          NotificationManager.success('Đăng kí thành công', 'Yêu cầu thành công', 4000, () => {this.redirect()});
          break;
        case 'Invalid email':
          NotificationManager.error('Hãy nhập lại email', 'Yêu cầu lỗi',5000);
          break;
        case 'Password must be between 8 and 20 characters':
          NotificationManager.error('Mật khẩu phải từ 8 đến 20 kí tự', 'Yêu cầu lỗi', 5000);
          break;
        case 'info':
          NotificationManager.error('Hãy nhập đầy đủ thông tin', 'Yêu cầu lỗi', 5000);
          break;
      };
    };

    render() {
        return (
        <div className="FormCenter">

            <NotificationContainer/>
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
