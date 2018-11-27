import React from "react";
import Gallery from "react-photo-gallery";
import Grid from "@material-ui/core/Grid/Grid";
import DiscoverCard from "./DiscoverCard";

export default class PopularPhotoContainer extends React.Component{
    state = {
        photos: []
    };

    componentDidMount() {
        let photos = require("./data/popular_photos");
        this.setState({photos});
    }

    render() {
        return (
            <div className={"page-container"}>
                <h1>Popular Photos</h1>
                <p>Images with the most views uploaded in the last 30 days.</p>
                <div style={{margin: "30px 0"}} className={"main-content"}>
                     <Gallery columns={4} photos={this.state.photos}/>
                </div>
            </div>
        );
    }
}