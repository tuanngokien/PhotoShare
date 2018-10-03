import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Input from '@material-ui/core/Input';
import Avatar from '@material-ui/core/Avatar';
import IconButton from "@material-ui/core/IconButton";

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
              <Avatar aria-label="Recipe">
                <img src="../../../assets/img/IMG_3958.JPG" alt="avatar"/>
              </Avatar>
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}