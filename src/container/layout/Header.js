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

export default class Header extends Component{
  render(){
    return(
      <div >
        <AppBar position='fixed' className='header'>
          <Toolbar className='container'>
            <a className="app-logo" href="#">
              <img src="http://via.placeholder.com/180x65" alt="Jambo" title="Jambo"/>
            </a>
            <div style={{flexGrow: 1}}></div>
            <div style={{width: '20%'}}>
              <Input placeholder="Search..." className='search'/>
            </div>
            <IconButton>
              <CloudUpload/>
            </IconButton>
            <IconButton>
              <ChatBubble/>
            </IconButton>
            <IconButton>
              <Notifications/>
            </IconButton>
            <IconButton>
              <Avatar aria-label="Recipe">
                <img src={IMG_3958} style={{height: '100%', width: '100%'}} alt="avatar"/>
              </Avatar>
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}