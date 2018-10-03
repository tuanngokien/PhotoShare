import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

export default class Footer extends Component{
  render(){
    return(
      <div >
        <AppBar position='static' className='header'>
          <Toolbar>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}