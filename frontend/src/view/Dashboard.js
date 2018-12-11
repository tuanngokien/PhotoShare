import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {Col, Row} from 'react-grid-system';
import PostContainer from '../components/dashboard/postContainer.js';
import FollowSidebar from '../components/dashboard/followSidebar';
import SearchTrendingSidebar from '../components/dashboard/searchTrendingSidebar';
import Input from '@material-ui/core/Input';
import StickyBox from "react-sticky-box";
import InfiniteScroll from '../components/InfiniteScroll';
import {MdSearch} from "react-icons/md";
import {splitArray} from "../utils";

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            favourite: false,
            isOpenImgBox: false,
            currentImage: 0,
            posts: [],
            visiblePosts: [],
            hasMorePosts: true,
            follows: [],
            searches: [],
        };
        this.onHandleLike = this.onHandleLike.bind(this);
        this.openImgBox = this.openImgBox.bind(this);
        this.closeImgBox = this.closeImgBox.bind(this);
    }

    scrollEvent = () => {
        if (window.scrollY > window.innerHeight / 4) {
            this.headerClassList.add('header');
            this.topSearchBar.style.display = "flex";
        } else {
            this.headerClassList.remove('header');
            this.topSearchBar.style.display = "none";
        }
    };

    loadData() {
        let data = require("../container/pages/data/dashboard");
        return data
    }

    loadMore = (page) => {
        setTimeout(() => {
            let hasMorePosts = true;
            let allPosts = this.state.posts;
            let visiblePosts = this.state.visiblePosts;
            let newPosts = allPosts.slice(page * 8, (page + 1) * 8);
            visiblePosts.push(...newPosts);
            if (visiblePosts.length >= allPosts.length) {
                hasMorePosts = false;
            }
            this.setState({visiblePosts, hasMorePosts});
        }, 1000);
    };

    componentDidMount() {
        let data = this.loadData();
        let visiblePosts = data.posts.slice(0, 8);
        this.setState({...data, visiblePosts});
        this.headerClassList = document.getElementById("header").classList;
        this.headerClassList.remove("header");
        this.headerClassList.add("header-transparent");
        this.topSearchBar = document.getElementById("top-searchbar");
        this.topSearchBar.style.display = "none";
        window.addEventListener("scroll", this.scrollEvent);
    }

    componentWillUnmount() {
        this.headerClassList.remove("header-transparent");
        this.headerClassList.add("header");
        this.topSearchBar.style.display = "flex";
        window.removeEventListener("scroll", this.scrollEvent)
    }

    onHandleLike = () => {
        this.setState({favourite: !this.state.favourite});
    };
    openImgBox = () => {
        this.setState({
            isOpenImgBox: true,
            currentImage: 0,
        });
    };
    closeImgBox = () => {
        this.setState({isOpenImgBox: false});
    };

    onSearch = (event) => {
        event.preventDefault();
        let query = this.searchInput.value;
        window.location.href = `/#/pts/search?q=${query}`;
    };

    render() {
        const {visiblePosts, follows, searches} = this.state;
        const [postPart1, postPart2] = splitArray(visiblePosts, 2);
        return (
            <div>
                <Grid container justify={"center"} alignItems={"center"} className={"jumbotron"}>
                    <div>
                        <Grid container direction={"column"} alignItems={"center"}>
                            <h1 style={{fontWeight: "900", margin: 0, fontSize: "3em"}}>PHOTOSHARE</h1>
                            <h3 style={{margin: "10px 0 30px 0"}}>Gifted by the world’s most generous community of
                                photographers</h3>
                        </Grid>
                        <Grid container justify={"flex-start"} alignItems={"flex-end"}
                              className={"dashboard-searchbar"}>
                            <Grid item style={{color: "rgba(21,21,23,.95)", background: "transparent",}}>
                                <MdSearch style={{fontSize: "2.8em", padding: "0 5px"}}/>
                            </Grid>
                            <Grid item id={"dashboard-search-field"}>
                                <form onSubmit={this.onSearch}>
                                    <Input
                                        disableUnderline={true}
                                        inputRef={e => this.searchInput = e}
                                        style={{
                                            background: "transparent",
                                            width: "100%",
                                            marginRight: "10px"
                                        }} placeholder={"Search high-resolution photos"}/>
                                </form>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <div className='container dashboard-main-content'>
                    <InfiniteScroll
                        pageStart={0}
                        initialLoad={false}
                        loadMore={this.loadMore}
                        hasMore={this.state.hasMorePosts}>
                        <Row>
                            <Col xs={12} md={9.2}>
                                <Row>
                                    <Col xs={12} md={6} style={{padding: 0}}>
                                        {postPart1.map(post => {
                                            return <PostContainer key={post.postId} {...post}/>
                                        })}
                                    </Col>
                                    <Col xs={12} md={6} style={{padding: 0}}>
                                        {postPart2.map(post => {
                                            return <PostContainer key={post.postId} {...post}/>
                                        })}
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12} md={2.8} style={{padding: 0}} id={"dashboard-sidebar"}>
                                <StickyBox offsetTop={100}>
                                    <FollowSidebar followList={follows}/>
                                    <SearchTrendingSidebar keywordList={searches}/>
                                </StickyBox>
                            </Col>
                        </Row>
                    </InfiniteScroll>
                </div>
            </div>
        )
    }
}