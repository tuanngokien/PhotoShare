import React, {Component} from 'react'
import Header from './Header.js';
import Footer from './Footer.js';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Dashboard from './../../view/Dashboard.js';
import routes from './../../routes.js';
import {Redirect, Route, Switch} from 'react-router-dom';

export default class Layout extends Component {
    render() {
        return (
            <div className='main-container'>
                <div>
                    <Header/>
                </div>
                <div style={{flexGrow: 1}} id={"main-content"}>
                    <Switch>
                        {routes.map((route, idx) => {
                            return route.component ?
                                (<Route key={idx} path={route.path} exact={route.exact} name={route.name}
                                        render={props => (
                                            <route.component {...props} />
                                        )}/>) : (null);
                        })}
                    </Switch>
                </div>
                <div style={{position: "relative", zIndex: "1"}}>
                    <Footer/>
                </div>
            </div>
        )
    }
}