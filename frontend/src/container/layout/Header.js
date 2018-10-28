import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from "@material-ui/core/IconButton";
import Notifications from '@material-ui/icons/Notifications';
import CloudUpload from '@material-ui/icons/CloudUpload';
import ChatBubble from '@material-ui/icons/ChatBubble';
import IMG_3958 from '../../assets/img/IMG_3958.JPG';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
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
                <AppBar position='fixed' className='header'>
                    <Toolbar className='main'>
                        <Grid container justify={"space-between"} alignItems={"center"}>
                            <a className="app-logo" href="/">
                                <img src={Logo} alt="Jambo" title="Jambo" style={{width: "100%", height: "auto"}}/>
                            </a>
                            <div>
                                <Grid container justify={"flex-start"} alignItems={"center"}>
                                    <Grid container spacing={8} alignItems="center"
                                          style={{background: "white", borderRadius: "5px"}}>
                                        <Grid item style={{color: "rgba(21,21,23,.95)", background: "transparent",}}>
                                            <Icon>search</Icon>
                                        </Grid>
                                        <Grid>
                                            <TextField style={{
                                                background: "transparent",
                                                width: "300px",
                                                marginRight: "10px"
                                            }} placeholder={"Photos, people"}/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                            <div>
                                <IconButton href='#/pts/upload'>
                                    <CloudUpload style={{color: "white"}}/>
                                </IconButton>
                                <IconButton href='#/pts/chat'>
                                    <ChatBubble style={{color: "white"}}/>
                                </IconButton>
                                <IconButton>
                                    <Notifications style={{color: "white"}}/>
                                </IconButton>
                                <IconButton onClick={this.handleClick}>
                                    <Avatar aria-label="Recipe" style={{border: "3px dotted white"}}>
                                        <img src={IMG_3958} style={{height: '100%', width: '100%'}} alt="avatar"/>
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
                                    }}
                                >
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