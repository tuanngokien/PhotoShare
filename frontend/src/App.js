import React, {Component} from 'react';
import './App.css';
import {Layout} from './container';
import Login from './view/Login.js';

import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        fontFamily: "Proxima Nova, sans-serif",
    },
});

class App extends Component {
    render() {
        return (
            <div className="App">
                <MuiThemeProvider theme={theme}>
                    <HashRouter basename="/">
                        <Switch>
                            <Redirect exact from="/" to="/form"/>
                            <Redirect exact from="/pts/" to="/pts/dashboard"/>
                            <Route path="/pts" name="Home" component={Layout}/>
                            <Route path="/form" name="Login" component={Login}/>
                        </Switch>
                    </HashRouter>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
