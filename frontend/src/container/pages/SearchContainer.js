import React from "react";
import Grid from '@material-ui/core/Grid';
import InfiniteScroll from '../../components/InfiniteScroll';
import {splitArray} from "../../utils";
import MediaQuery from 'react-responsive';
import axios from "axios";

const PhotoContainer = ({photos}) => {
    return (
        <Grid item xs={12} md={4} lg={3}>
            {photos.map((e, i) => {
                return (
                    <Grid key={i} container spacing={8}>
                        <Grid item xs={12}>
                            <a href={`/#/pts/posts/${e.postId}`}><img src={e.src} className={"search-image"}/></a>
                        </Grid>
                    </Grid>
                )
            })}
        </Grid>
    );
};

export default class PopularPhotoContainer extends React.Component {
    state = {
        photos: [],
        visiblePhotos: [],
        hasMorePhotos: true,
    };

    search = async (searchQuery) => {
        var headers = {Authorization: 'Bearer ' + localStorage.getItem('token')};
        const res = await axios.get(`/api/search/photos?q=${searchQuery}`, {headers: headers});
        return res.data.photos;
    };

    async componentDidMount() {
        const query = this.props.query;
        const searchedPhotos = await this.search(query);
        const photos = searchedPhotos.map(p => ({
            width: p.width,
            height: p.height,
            src: p.postImage,
            postId: p.postId
        }));
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
        let relatedSearches = ["sky", "birds", "dog", "lion"];
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
                                {splitArray(this.state.visiblePhotos, 4).map((photos, i) => <PhotoContainer key={i}
                                                                                                            photos={photos}/>)}
                            </MediaQuery>
                            <MediaQuery maxDeviceWidth={1280}>
                                {splitArray(this.state.visiblePhotos, 3).map((photos, i) => <PhotoContainer key={i}
                                                                                                            photos={photos}/>)}
                            </MediaQuery>
                        </Grid>
                    </InfiniteScroll>
                </Grid>
            </div>
        );
    }
}