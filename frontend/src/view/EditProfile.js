import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import {Col, Row} from 'react-grid-system';
import Collapse from '@material-ui/core/Collapse';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import {FaAddressBook, FaUserAlt, FaKey} from "react-icons/fa";
import {ChangeAvatarButton} from "../components/editProfile"
import {NotificationManager} from 'react-notifications'

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
            expanded: false,
            currentPass: '',
            newPass: '',
            reNewPass: '',
            email: '',
            firstName: '',
            lastName: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitChangePass = this.handleSubmitChangePass.bind(this);
        this.handleSubmitChangeInfo = this.handleSubmitChangeInfo.bind(this);
    }

    handleExpandClick = () => {
        this.setState(state => ({expanded: !state.expanded}));
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleSubmitChangePass() {
        const {currentPass, newPass, reNewPass} = this.state;
        var headers = {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        };
        var data = {
            current_password: currentPass,
            new_password: newPass,
            re_new_password: reNewPass
        }
        axios.patch('/api/profile/password', data, {headers: headers})
            .then(function (res) {
                if (res.data.success) {
                    NotificationManager.success("Successfully changed password", "Profile changed", 500);
                }
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    handleSubmitChangeInfo() {
        const {email, firstName, lastName} = this.state;
        var headers = {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        };
        var data = {
            email: email,
            first_name: firstName,
            last_name: lastName
        }
        axios.patch('/api/profile/basic', data, {headers: headers})
            .then(function (res) {
                localStorage.setItem('firstName', res.data.user.firstName);
                localStorage.setItem('lastName', res.data.user.lastName);
                localStorage.setItem('name', res.data.user.firstName + res.data.user.lastName);
                localStorage.setItem('email', res.data.user.email);
                if (res.data.success) {
                    NotificationManager.success("Successfully changed basic info", "Profile changed", 500);
                    setTimeout(() => {
                        window.location.reload();
                    }, 700)
                }
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    render() {
        var firstname = localStorage.getItem('firstName');
        var lastname = localStorage.getItem('lastName');
        var username = '@' + localStorage.getItem('username');
        var email = localStorage.getItem('email');
        return (
            <div className="container" style={{paddingTop: '3%'}}>
                <Row>
                    <Col xs={4}>
                        <Card style={{marginBottom: '5%'}}>
                            <CardHeader
                                style={{borderBottomWidth: 0.5}}
                                avatar={<Avatar alt="Remy Sharp"
                                                src={localStorage.getItem('avatar')}
                                                style={{width: 120, height: 120}}
                                />}
                                style={{marginLeft: '32%'}}
                            />
                            <div style={{margin: '3%', marginLeft: '34%'}}>
                                <ChangeAvatarButton userId={localStorage.getItem("id")}/>
                            </div>
                        </Card>
                        <Card>
                            <form noValidate autoComplete="off">
                                <div>
                                    <CardHeader
                                        title={<span style={{fontWeight: 'bold'}}><FaUserAlt
                                            style={{verticalAlign: "middle"}}/> Information</span>}
                                    />
                                    <TextField
                                        required
                                        id="outlined-name"
                                        label="FirstName"
                                        defaultValue={firstname}
                                        margin="normal"
                                        variant="outlined"
                                        onChange={this.handleChange("firstName")}
                                        style={{width: '95%', marginRight: '2%', marginLeft: '2%'}}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        required
                                        id="outlined-lastname-input"
                                        label="LastName"
                                        defaultValue={lastname}
                                        margin="normal"
                                        variant="outlined"
                                        onChange={this.handleChange("lastName")}
                                        style={{width: '95%', marginRight: '2%', marginLeft: '2%'}}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="ooutlined-read-only-input"
                                        label="UserName"
                                        defaultValue={username}
                                        margin="normal"
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }}
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
                                <Button
                                    variant="outlined"
                                    style={{marginLeft: '2%', marginBottom: '5%'}}
                                    onClick={this.handleSubmitChangeInfo}
                                >
                                    Submit
                                </Button>
                            </form>
                        </Card>
                    </Col>
                    <Col xs={8}>
                        <Card style={{marginBottom: '2%'}}>
                            <form noValidate autoComplete="off">
                                <CardHeader
                                    title={<span style={{fontWeight: 'bold'}}><FaAddressBook
                                        style={{verticalAlign: "middle"}}/> Contact</span>}
                                />
                                <div>
                                    <TextField
                                        required
                                        id="outlined-email-input"
                                        label="Email"
                                        type="email"
                                        defaultValue={email}
                                        autoComplete="email"
                                        margin="normal"
                                        variant="outlined"
                                        onChange={this.handleChange("email")}
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
                                <Button
                                    variant="outlined"
                                    style={{marginLeft: '2%', marginBottom: '2%'}}
                                    onClick={this.handleSubmitChangeInfo}
                                >
                                    Submit
                                </Button>
                            </form>
                        </Card>
                        <Card style={{marginBottom: '2%'}}>
                            <CardHeader
                                title={<span style={{fontWeight: 'bold'}}><FaKey/> Change password</span>}
                                subheader="You should use strong password that you haven't used yet"
                            />
                            <TextField
                                id="outlined-password-input"
                                label="Current Password"
                                type="password"
                                autoComplete="current-password"
                                onChange={this.handleChange("currentPass")}
                                margin="normal"
                                variant="outlined"
                                style={{width: '95%', marginRight: '2%', marginLeft: '2%'}}
                            />
                            <TextField
                                id="password-input1"
                                label="New Password"
                                type="password"
                                onChange={this.handleChange("newPass")}
                                margin="normal"
                                variant="outlined"
                                style={{width: '95%', marginRight: '2%', marginLeft: '2%'}}
                            />
                            <TextField
                                id="password-input2"
                                label="Retype New Password"
                                type="password"
                                onChange={this.handleChange("reNewPass")}
                                margin="normal"
                                variant="outlined"
                                style={{width: '95%', marginRight: '2%', marginLeft: '2%', marginBottom: '2%'}}
                            />
                            <Button
                                variant="outlined"
                                style={{marginLeft: '2%', marginBottom: '2%'}}
                                onClick={this.handleSubmitChangePass}
                            >
                                Submit
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default EditProfile;
