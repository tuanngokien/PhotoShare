import React, {Component} from 'react'
import Header from './Header.js';
import Footer from './Footer.js';
import routes from './../../routes.js';
import {Redirect, Route, Switch} from 'react-router-dom';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";

export default class Layout extends Component {
    render() {
        return (
            <div className='main-container'>
                <div>
                    <Header/>
                </div>
                <div id={"main-content"} style={{flexGrow: 1}}>
                    <Switch>
                        {routes.map((route, idx) => {
                            return route.component ?
                                (<Route key={idx} path={route.path} exact={route.exact} name={route.name}
                                        render={props => (
                                            <route.component {...props} />
                                        )}/>) : (null);
                        })}
                    </Switch>
                    <ScrollUpButton ContainerClassName="scroll-button"/>
                </div>
                <div style={{position: "relative", zIndex: "1"}}>
                    <Footer/>
                </div>
            </div>
        )
    }
}