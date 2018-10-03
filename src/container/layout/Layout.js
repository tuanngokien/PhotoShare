import React, {Component} from 'react'
import Header from './Header.js';
import Footer from './Footer.js';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Dashboard from './../../view/Dashboard.js';

export default class Layout extends Component{
    render(){
      return(
        <div className='main-container'>
          <Header/>
          <div className='container' style={{flexGrow: 1, marginTop: '6%', marginBottom: '2%'}}>
            <Dashboard/>
          </div>
          <div >
            <Footer/>
          </div>
        </div>
      )
    }
}