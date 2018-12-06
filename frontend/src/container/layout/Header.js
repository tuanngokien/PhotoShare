import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from "@material-ui/core/IconButton";
import {Notifications, CloudUpload, Explore} from '@material-ui/icons';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Logo from '../../assets/img/logo3.png';
import {Link} from "react-router-dom";

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
        window.location.replace("#/pts/profile/" + localStorage.getItem('id'));
    };

    render() {
        const {anchorEl} = this.state;
        return (
            <div>
                <AppBar position='fixed' id='header' className={"header"}>
                    <div className={"main"}>
                        <Grid container justify={"space-between"} alignItems={"center"}>
                            <Link className="app-logo" to={"/pts/"}>
                                <img src={Logo} alt="logo" style={{width: "90%", height: "auto"}}/>
                            </Link>
                            <div>
                                <Grid container justify={"flex-start"} alignItems={"flex-end"}
                                      style={{background: "white", borderRadius: "5px", padding: "3px"}}
                                      id={"top-searchbar"}>
                                    <Grid item style={{
                                        color: "rgba(21,21,23,.95)",
                                        background: "transparent",
                                        paddingLeft: "5px",
                                        paddingRight: "5px"
                                    }}>
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
                            <div className={"nav-actions"}>
                                <IconButton href='#/pts/upload'>
                                    <CloudUpload/>
                                </IconButton>
                                <IconButton href='#/pts/explorer'>
                                    <Explore/>
                                </IconButton>
                                <IconButton>
                                    <Notifications/>
                                </IconButton>
                                <IconButton onClick={this.handleClick} style={{paddingBottom: "3px", paddingTop: "3px"}}>
                                    <Avatar style={{border: "3px solid white"}}>
                                        <img
                                            src={"https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/29597226_601217733565084_99387188199077288_n.jpg?_nc_cat=1&_nc_ht=scontent.fhan2-3.fna&oh=5447367bdf5e22e371ddc90574e776fc&oe=5C446BCC"}
                                            style={{height: '100%', width: 'auto'}}
                                            alt="avatar"/>
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
                    </div>
                </AppBar>
            </div>
        )
    }
}
