import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import 'react-tabs/style/react-tabs.css';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Route, Link, Redirect, Switch} from 'react-router-dom'
import {DiscoverContainer, PopularPhotoContainer, PeopleContainer} from "../container/pages";

const base_route = "/pts/explorer";
const routes = {
    "collections": `${base_route}/collections`,
    "photos": `${base_route}/photos`,
    "people": `${base_route}/people`,
};

const StyleTab = props => {
    return (
        <Link to={props.to}  style={{ textDecoration: 'none', color: "#000000"}}>
            <Tab {...props} style={{fontWeight: "550"}}/>
        </Link>
    )
};

class Explorer extends Component {
    state = {
        value: 0,
    };

    componentDidMount() {
        let header = document.getElementById("header");
        let secondaryHeader = document.getElementsByClassName("explorer-nav-bar")[0];
        secondaryHeader.style.top = header.clientHeight + "px";
        let explorerContainer = document.getElementById("explorer-page-container");
        explorerContainer.style.marginTop = header.clientHeight + secondaryHeader.clientHeight + "px";
    }

    render() {
        const {pathname} = this.props.location;
        return (
            <div>
                <Grid container id={"explorer-page-container"}>
                    <Grid item xs={12}>
                        <AppBar color="default" className={"explorer-nav-bar"}>
                            <Tabs
                                centered
                                fullWidth
                                style={{margin: "0 7%", color: "black"}}
                                value={Object.values(routes).indexOf(pathname)}
                                indicatorColor={"primary"}>
                                <StyleTab to={routes.collections} label="Discover"/>
                                <StyleTab to={routes.photos} label="Popular Photos"/>
                                <StyleTab to={routes.people} label="People"/>
                            </Tabs>
                        </AppBar>
                        <div className={"explorer-container"} style={{height: 'auto', position: "relative"}}>
                            <Switch>
                                <Route exact path={base_route}>
                                    <Redirect to={routes.collections}/>
                                </Route>
                                <Route
                                    path={routes.collections}
                                    component={DiscoverContainer}
                                />
                                <Route
                                    path={routes.photos}
                                    component={PopularPhotoContainer}
                                />
                                <Route
                                    path={routes.people}
                                    component={PeopleContainer}
                                />
                            </Switch>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Explorer;
