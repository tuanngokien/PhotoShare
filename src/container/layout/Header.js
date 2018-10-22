import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Input from '@material-ui/core/Input';
import Avatar from '@material-ui/core/Avatar';
import IconButton from "@material-ui/core/IconButton";
import Notifications from '@material-ui/icons/Notifications';
import CloudUpload from '@material-ui/icons/CloudUpload';
import ChatBubble from '@material-ui/icons/ChatBubble';
import IMG_3958 from '../../assets/img/IMG_3958.JPG';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default class Header extends Component{
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logout = () => {
    this.handleClose();
    window.location.replace("#/form");
  };

  redirectProfile = () => {
    this.handleClose();
    window.location.replace("#/pts/profile");
  }

  render(){
    const { anchorEl } = this.state;
    return(
      <div >
        <AppBar position='fixed' className='header'>
          <Toolbar className='main'>
            <a className="app-logo" href="#">
              <img src="http://via.placeholder.com/180x65" alt="Jambo" title="Jambo"/>
            </a>
            <div style={{flexGrow: 1}}></div>
            <div style={{width: '20%'}}>
              <Input placeholder="Search..." className='search'/>
            </div>
            <IconButton href='#/pts/upload'>
              <CloudUpload />
            </IconButton>
            <IconButton href='#/pts/chat'>
              <ChatBubble/>
            </IconButton>
            <IconButton>
              <Notifications/>
            </IconButton>
            <IconButton onClick={this.handleClick}>
              <Avatar aria-label="Recipe">
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
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}