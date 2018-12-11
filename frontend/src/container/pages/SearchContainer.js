import React from "react";
import Grid from '@material-ui/core/Grid';
import InfiniteScroll from '../../components/InfiniteScroll';
import {splitArray} from "../../utils";
import MediaQuery from 'react-responsive';

const PhotoContainer = ({photos}) => {
    return (
        <Grid item xs={12} md={4} lg={3}>
            {photos.map((e, i) => <Grid key={i} container spacing={8}><Grid item xs={12}><img src={e.src}
                                                                                              className={"search-image"}/></Grid></Grid>)}
        </Grid>
    );
};

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
            this.setState({visiblePhotos, hasMorePhotos});
        }, 200);

    };

    render() {
        let {query} = this.props;
        let relatedSearches = ["nature", "birds", "dog", "lion"];
        return (
            <div className={"page-container"} style={{marginTop: "50px"}}>
                <h1 className={"search-query-header"}>{query} pictures</h1>
                <p>Related search:
                    {relatedSearches.map((e, i) => <a key={e} href={"#"} className={"related-search-keyword"}>{e}</a>)}
                </p>
                <Grid style={{margin: "30px 0"}} className={"main-content"}>
                    <InfiniteScroll
                        pageStart={0}
                        initialLoad={false}
                        loadMore={this.loadMore}
                        hasMore={this.state.hasMorePhotos}>
                        <Grid container spacing={8}>
                            <MediaQuery minDeviceWidth={1280}>
                                {splitArray(this.state.visiblePhotos, 4).map((photos, i) => <PhotoContainer key={i} photos={photos}/>)}
                            </MediaQuery>
                            <MediaQuery maxDeviceWidth={1280}>
                                {splitArray(this.state.visiblePhotos, 3).map((photos, i) => <PhotoContainer key={i} photos={photos}/>)}
                            </MediaQuery>
                        </Grid>
                    </InfiniteScroll>
                </Grid>
            </div>
        );
    }
}