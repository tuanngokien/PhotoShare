import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from "@material-ui/core/IconButton";
import {Notifications, CloudUpload, Explore} from '@material-ui/icons';
import IMG_3958 from '../../assets/img/IMG_3958.JPG';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Logo from '../../assets/img/logo3.png';

export default class Header extends Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    logout = () => {
        this.handleClose();
        window.location.replace("#/form");
    };

    redirectProfile = () => {
        this.handleClose();
        window.location.replace("#/pts/profile");
    };

    render() {
        const {anchorEl} = this.state;
        return (
            <div>
                <AppBar position='fixed' id='header' className={"header"}>
                    <Toolbar className='main'>
                        <Grid container justify={"space-between"} alignItems={"center"}>
                            <a className="app-logo" href="#/pts/dashboard">
                                <img src={Logo} alt="logo" title="logo" style={{width: "100%", height: "auto"}}/>
                            </a>
                            <div>
                                <Grid container justify={"flex-start"} alignItems={"flex-end"}
                                      style={{background: "white", borderRadius: "5px", padding: "3px"}}
                                      id={"top-searchbar"}>
                                    <Grid item style={{color: "rgba(21,21,23,.95)", background: "transparent", paddingLeft: "5px", paddingRight: "5px"}}>
                                        <Icon>search</Icon>
                                    </Grid>
                                    <Grid>
                                        <Input
                                            style={{
                                                background: "transparent",
                                                width: "300px",
                                                marginRight: "10px",
                                            }} placeholder={"Photos, people"}/>
                                    </Grid>
                                </Grid>
                            </div>
                            <div>
                                <IconButton href='#/pts/upload'>
                                    <CloudUpload style={{color: "white", fontSize: "1.2em"}}/>
                                </IconButton>
                                <IconButton>
                                    <Explore style={{color: "white", fontSize: "1.2em"}}/>
                                </IconButton>
                                <IconButton>
                                    <Notifications style={{color: "white", fontSize: "1.2em"}}/>
                                </IconButton>
                                <IconButton onClick={this.handleClick} style={{paddingBottom: "0", paddingTop: "0"}}>
                                    <Avatar aria-label="Recipe" style={{border: "3px dotted white"}}>
                                        <img
                                            src={"https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/29597226_601217733565084_99387188199077288_n.jpg?_nc_cat=1&_nc_ht=scontent.fhan2-3.fna&oh=5447367bdf5e22e371ddc90574e776fc&oe=5C446BCC"}
                                            style={{height: '100%', width: '100%'}} alt="avatar"/>
                                    </Avatar>
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={this.handleClose}
                                    PaperProps={{
                                        style: {
                                            width: 120,
                                            paddingTop: 0,
                                            paddingBottom: 0
                                        }
                                    }}>
                                    <MenuItem onClick={this.redirectProfile}>Profile</MenuItem>
                                    <MenuItem onClick={this.logout}>Logout</MenuItem>
                                </Menu>
                            </div>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}