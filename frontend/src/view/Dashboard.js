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
import axios from 'axios';
import landingImg1 from "../assets/img/landing1.jpeg";
import landingImg2 from "../assets/img/landing2.jpeg";
import landingImg4 from "../assets/img/landing4.jpeg";

const backgroundImageList = [landingImg1, landingImg2, landingImg4];

const getJumbotronBackgroundStyle = (backgroundImage) => {
    return `linear-gradient(180deg, rgba(0, 0, 0, .38) 0, rgba(0, 0, 0, .38) 3.5%, rgba(0, 0, 0, .379) 7%, rgba(0, 0, 0, .377) 10.35%, rgba(0, 0, 0, .375) 13.85%, rgba(0, 0, 0, .372) 17.35%, rgba(0, 0, 0, .369) 20.85%, rgba(0, 0, 0, .366) 24.35%, rgba(0, 0, 0, .364) 27.85%, rgba(0, 0, 0, .361) 31.35%, rgba(0, 0, 0, .358) 34.85%, rgba(0, 0, 0, .355) 38.35%, rgba(0, 0, 0, .353) 41.85%, rgba(0, 0, 0, .351) 45.35%, rgba(0, 0, 0, .35) 48.85%, rgba(0, 0, 0, .353) 52.35%, rgba(0, 0, 0, .36) 55.85%, rgba(0, 0, 0, .371) 59.35%, rgba(0, 0, 0, .385) 62.85%, rgba(0, 0, 0, .402) 66.35%, rgba(0, 0, 0, .42) 69.85%, rgba(0, 0, 0, .44) 73.35%, rgba(0, 0, 0, .46) 76.85%, rgba(0, 0, 0, .48) 80.35%, rgba(0, 0, 0, .498) 83.85%, rgba(0, 0, 0, .515) 87.35%, rgba(0, 0, 0, .529) 90.85%, rgba(0, 0, 0, .54) 94.35%, rgba(0, 0, 0, .547) 97.85%, rgba(0, 0, 0, .55)), url("${backgroundImage}") no-repeat`
};


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
            data: [],
            backgroundImage: null,
            img: []
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

    loadData = async() =>{
        var headers = {Authorization: 'Bearer ' + localStorage.getItem('token')};
        let data;
        var com = this;
        var temp = -1;
        await axios.get('/api/feed', {headers: headers})
        .then(function(res){
            com.setState({data: res.data.posts});
            com.setState({searches: res.data.searches});
            com.setState({visiblePosts: com.state.data.slice(0, 8)});
            //console.log(res.data.posts)
        })
        .catch(function (error) {
        console.log(error);
      });
        //let data = require("../container/pages/data/dashboard");
        //return data
        this.forceUpdate()
    }

    loadMore = (page) => {
        setTimeout(() => {
            let hasMorePosts = true;
            let allPosts = this.state.data;
            let visiblePosts = this.state.visiblePosts;
            let newPosts = allPosts.slice(page * 8, (page + 1) * 8);
            visiblePosts.push(...newPosts);
            if (visiblePosts.length >= allPosts.length) {
                hasMorePosts = false;
            }
            this.setState({visiblePosts, hasMorePosts});
        }, 1000);
    };

    async componentWillMount() {
        await this.loadData();
    }

    componentDidMount() {
        let backgroundImage = backgroundImageList[Math.floor(Math.random() * backgroundImageList.length)];
        this.setState({backgroundImage});
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
        const {visiblePosts, follows, searches, backgroundImage} = this.state;
        const [postPart1, postPart2] = splitArray(visiblePosts, 2);
        const backgroundStyle = getJumbotronBackgroundStyle(backgroundImage);
        return (
            <div>
                <Grid container justify={"center"} alignItems={"center"} className={"jumbotron"} style={{background: backgroundStyle}}>
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
                                            return <PostContainer key={post.id} {...post} loadData = {this.loadData.bind(this)}/>
                                        })}
                                    </Col>
                                    <Col xs={12} md={6} style={{padding: 0}}>
                                        {postPart2.map(post => {
                                            return <PostContainer key={post.id} {...post} loadData = {this.loadData.bind(this)}/>
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