import React from "react";
import Gallery from "react-photo-gallery";
import Grid from '@material-ui/core/Grid';
import InfiniteScroll from '../../components/InfiniteScroll';

export default class PopularPhotoContainer extends React.Component {
    state = {
        photos: [],
        visiblePhotos: [],
        hasMorePhotos: true,
    };

    componentDidMount() {
        let photos = require("./data/popular_photos");
        this.setState({photos});
        let visiblePhotos = photos.slice(0, 20);
        this.setState({visiblePhotos});
    }

    loadMore = (page) => {
        setTimeout(() => {
            let hasMorePhotos = true;
            let allPhotos = this.state.photos;
            let visiblePhotos = this.state.visiblePhotos;
            let newPhotos = allPhotos.slice(page * 20, (page + 1) * 20);
            visiblePhotos.push(...newPhotos);
            if (visiblePhotos.length >= allPhotos.length) {
                hasMorePhotos = false;
            }
            this.setState({visiblePhotos, hasMorePhotos: hasMorePhotos});
        }, 1000);

    };

    render() {
        return (
            <div className={"page-container"}>
                <h1>Popular Photos</h1>
                <p>Images with the most views uploaded in the last 30 days.</p>
                <Grid style={{margin: "30px 0"}} className={"main-content"}>
                    <InfiniteScroll
                        pageStart={0}
                        initialLoad={false}
                        loadMore={this.loadMore}
                        hasMore={this.state.hasMorePhotos}>
                        <Gallery photos={this.state.visiblePhotos}/>
                    </InfiniteScroll>
                </Grid>
            </div>
        );
    }
}