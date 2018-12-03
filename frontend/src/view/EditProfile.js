import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import {Col, Row} from 'react-grid-system';
import Collapse from '@material-ui/core/Collapse';
import 'font-awesome/css/font-awesome.min.css'

const currencies = [
  {
    value: "Male",
    label: "Male"
  },
  {
    value: "Female",
    label: "Female"
  },
];
class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
       currency: "Male",
    expanded: false
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  render() {
    return (
      <div className="container" style={{paddingTop:'3%'}}>
          <Row>
          <Col xs={4}>
            <Card style={{marginBottom:'5%'}}>
              <CardHeader
                style = {{borderBottomWidth: 0.5}}
                avatar = {<Avatar alt="Remy Sharp"
                      src="https://c2.staticflickr.com/6/5495/buddyicons/12673279@N07_r.jpg?1483401053#12673279@N07"
                      style={{width: 120, height: 120}}
                />}
                style={{marginLeft: '32%'}}
              />
              <div style={{margin: '3%', marginLeft: '34%'}}>
                <a href="#/pts/edit/undefined"
                   style={{textDecorationLine: 'none', color:'black'}}
                >
                  Change Profile Photo
                </a>
              </div>
            </Card>
            <Card>
              <form noValidate autoComplete="off">
                <div>
                  <CardHeader
                    title = {<span style={{fontWeight:'bold'}}><i class="fas fa-user"></i> Information</span>}
                  />
                  <TextField
                    required
                    id="outlined-name"
                    label="Name"
                    defaultValue="Tuan Ngo Kien"
                    margin="normal"
                    variant="outlined"
                    style={{width: '95%', marginRight: '2%', marginLeft: '2%'}}
                  />
                </div>
                <div>
                  <TextField
                    required
                    id="outlined-username-input"
                    label="UserName"
                    defaultValue="@ngokientuan"
                    margin="normal"
                    variant="outlined"
                    style={{width: '95%', marginRight: '2%', marginLeft: '2%'}}
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Gender"
                    value={this.state.currency}
                    onChange={this.handleChange("currency")}
                    margin="normal"
                    variant="outlined"
                    style={{width: '95%', marginRight: '2%', marginLeft: '2%', marginBottom: '5%'}}
                  >
                  {currencies.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                  </TextField>
                </div>
                <Button variant="outlined" style={{marginLeft: '2%', marginBottom: '5%'}}>Submit</Button>
              </form>
            </Card>
          </Col>
          <Col xs={8}>
            <Card style={{marginBottom:'2%'}}>
              <form noValidate autoComplete="off">
                <CardHeader
                  title = {<span style={{fontWeight:'bold'}}><i class="fas fa-address-book"></i> Contact</span>}
                />
                <div>
                  <TextField
                    required
                    id="outlined-email-input"
                    label="Email"
                    type="email"
                    defaultValue="ngokientuan@gmail.com"
                    autoComplete="email"
                    margin="normal"
                    variant="outlined"
                    style={{width: '95%', marginRight: '2%', marginLeft: '2%'}}
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-phone"
                    label="Phone"
                    defaultValue="012345678"
                    margin="normal"
                    variant="outlined"
                    style={{width: '95%', marginRight: '2%', marginLeft: '2%', marginBottom: '2%'}}
                  />
                </div>
              <Button variant="outlined" style={{marginLeft: '2%', marginBottom: '2%'}}>Submit</Button>
            </form>
          </Card>
          <Card style={{marginBottom: '2%'}}>
            <CardHeader
              title = {<span style={{fontWeight:'bold'}}><i class="fas fa-key"></i> Change password</span>}
              subheader = "You should use strong password that you haven't used yet"
            />
              <TextField
                id="outlined-password-input"
                label="Current Password"
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
                style={{width: '95%', marginRight: '2%', marginLeft: '2%'}}
              />
              <TextField
                id="outlined-password-input"
                label="New Password"
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
                style={{width: '95%', marginRight: '2%', marginLeft: '2%'}}
              />
              <TextField
                id="outlined-password-input"
                label="Retype New Password"
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
                style={{width: '95%', marginRight: '2%', marginLeft: '2%', marginBottom: '2%'}}
              />
              <Button variant="outlined" style={{marginLeft: '2%', marginBottom: '2%'}}>Submit</Button>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EditProfile;
