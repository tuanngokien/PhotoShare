import React from "react"
import Grid from '@material-ui/core/Grid';
import {DiscoverCard} from "../../components/explorer";
import Typography from '@material-ui/core/Typography';

export default class DiscoverContainer extends React.Component {
    state = {
        albums: []
    };

    componentDidMount() {
        let albums = require("./data/discover");
        this.setState({albums})
    }

    render() {
        return (
            <div className={"explorer-container page-container"}>
                <h1>Discover Beautiful Pictures</h1>
                <p>Explore the most popular collections.</p>
                <Grid container spacing={40} className={"main-content"}>
                    {this.state.albums.map((al, i) => <DiscoverCard key={i} {...al}/>)}
                </Grid>
            </div>
        );
    }
}