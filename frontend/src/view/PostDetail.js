import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import 'react-tabs/style/react-tabs.css';
import IconButton from '@material-ui/core/IconButton';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
import {Link} from "react-router-dom";
import {MdArrowBack} from "react-icons/md";
import {MdAllInclusive, MdLockOpen} from "react-icons/md";
import {FaRegHeart, FaHeart} from "react-icons/fa";
import Button from '@material-ui/core/Button';
import {Comment, CommentField, PostAggrItem, FollowButton, LikedPeople, Privacy} from "../components/postDetail";
import {humanPrivacyMode} from "../utils";
import Moment from 'react-moment';
import axios from "axios";


const {token} = localStorage;
const http = axios.create({
    headers: {
        "Authorization": `Bearer ${token}`
    }
});

class PostDetail extends Component {
    state = {
        loading: false,
        postOwner: false,
        user: {},
        post: {},
        privacy: "1",
        images: [{src: ""}],
        currentTags: [],
        liked: false,
        isFollowing: false,
        postId: undefined,
    };

    updateLayout() {
        let header = document.getElementById("header");
        let postDetailContainer = document.getElementById("post-detail-container");
        postDetailContainer.style.marginTop = header.clientHeight + "px";
        this.setState({
            loading: true
        });
        setTimeout(() => {
            document.body.style.overflow = "auto";
            document.body.style.paddingRight = "0";
        }, 1);
    }

    nextImage = (activeImage, index) => {
        const currentTags = activeImage.tags;
        this.setState({currentTags})
    };

    changePrivacy = async (privacy) => {
        const {postId} = this.state;
        http.patch(`/api/posts/${postId}/privacy`, {type: privacy}).then(res => {
            const data = res.data;
            if (data.success) {
                this.setState({privacy});
            }
        })
    };

    likePost = async () => {
        const {post, postId} = this.state;
        http.post(`/api/posts/${postId}/likes`).then(res => {
            const data = res.data;
            if (data.success) {
                const liked = true;
                post.likes.push({});
                this.setState({post, liked});
            }
        })
    };

    commentPost = async (e) => {
        e.preventDefault();
        let text = e.target[0].value;
        const {post, postId} = this.state;
        http.post(`/api/posts/${postId}/comments`, {text}).then(res => {
            const data = res.data;
            if (data.success) {
                post.comments.push(data.comment);
                this.setState({post});
            }
        });
        e.target.reset();
    };

    async loadData() {
        let postId = this.props.match.params.id;
        let authUserId = parseInt(localStorage.getItem("id"));
        http.get(`/api/posts/${postId}`).then(res => {
            const {user, post} = res.data;
            const images = post.photos.map(p => ({src: p.originalImage, tags: p.tags.map(t => t["name"])}));
            const liked = post.likes.findIndex(user => user.id === authUserId) > -1;
            const postOwner = user.id === authUserId;
            this.setState({
                images,
                user,
                post,
                liked,
                postId: post.id,
                isFollowing: user.isFollowing,
                currentTags: images[0].tags,
                postOwner,
                privacy: post.privacy
            })
        }).catch(err => {
            console.log(err);
            window.location.href = "/#/pts"
        });
    }

    componentDidMount() {
        this.loadData();
        this.updateLayout();
    }

    render() {
        const {images, user, post, liked, isFollowing, currentTags, postOwner, privacy} = this.state;
        console.log(currentTags);
        return (
            <div id={"post-detail-container"}>
                <div className={"viewer"}>
                    <div className={"post-detail-action"}>
                        <a href={"#/pts/"}><MdArrowBack/> <span>Back to photostream</span></a>
                    </div>
                    <div id="viewer-container"/>
                </div>
                <Viewer
                    onChange={this.nextImage}
                    visible={true}
                    noClose={true}
                    noImgDetails={true}
                    attribute={false}
                    zoomSpeed={0.2}
                    defaultScale={1.2}
                    images={images}
                    container={document.getElementById("viewer-container")}
                />
                <div className={"post-info-container"}>
                    <Grid container className={"post-header"}>
                        <Grid item xs={9}>
                            <Grid container spacing={8} alignItems={"center"}>
                                <Grid item xs={"auto"}>
                                    <div style={{
                                        background: "linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%)",
                                        borderRadius: "50%",
                                        padding: "3px",
                                        width: "fit-content"
                                    }}>
                                        <Avatar
                                            src={user.avatar}
                                            style={{border: "2px solid white", width: "3em", height: "3em"}}/>
                                    </div>
                                </Grid>
                                <Grid item xs={"auto"}>
                                    <div className={"name-inline"}>
                                        <h2 style={{margin: 0}}>{user.firstName} {user.lastName}</h2>
                                        <FollowButton isFollowing={isFollowing}/>
                                    </div>
                                    <p style={{margin: 0, color: "rgba(0, 0, 0, 0.54)"}}>@{user.username}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <Grid container style={{height: "100%"}} alignItems={"center"} justify={"flex-end"}>
                                <PostAggrItem count={post.viewCount} type={"views"}/>
                                <PostAggrItem count={post.likes && post.likes.length} type={"likes"}/>
                                <PostAggrItem count={post.comments && post.comments.length} type={"comments"}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container justify={"space-between"}>
                        <Grid item xs={6}>
                            <Grid className={"tab-divider"}></Grid>
                            <Grid container className={"liked-users"}>
                                <Grid item xs={"auto"}>
                                    <IconButton aria-label="Like" onClick={this.onHandleLike}>
                                        {liked ? <FaHeart style={{color: "#dc3545"}}/> :
                                            <FaRegHeart onClick={this.likePost}/>}
                                    </IconButton>
                                </Grid>
                                <Grid item xs={"auto"} className={"liked-list"}>
                                    <LikedPeople likes={post.likes}/>
                                </Grid>
                            </Grid>
                            <Grid className={"tab-divider"}></Grid>
                            <Grid container className={"comments"}>
                                {post.comments && post.comments.map(c => <Comment key={c.id} {...c}/>)}
                                <CommentField onSubmit={this.commentPost}/>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid className={"tab-divider"}></Grid>
                            <Grid container direction={"column"}>
                                <Grid item className={"additional-info"}>
                                    <h3>Additional info</h3>
                                    <Grid container justify={"space-between"} alignItems={"center"}>
                                        <Grid item><span><MdAllInclusive/>Uploaded</span></Grid>
                                        <Grid item><span><Moment fromNow>{post.createdAt}</Moment></span></Grid>
                                    </Grid>
                                    <Grid container justify={"space-between"} alignItems={"center"}>
                                        <Grid item><span><MdLockOpen/>Viewing privacy</span></Grid>
                                        <Grid item><Privacy privacy={privacy} disabled={!postOwner} onChangePrivacy={this.changePrivacy}/></Grid>
                                    </Grid>
                                </Grid>
                                <Grid className={"tab-divider"}></Grid>
                                <Grid item className={"tags"}>
                                    <h3>Tags</h3>
                                    <Grid container>
                                        <Grid item xs={12} md={10} xl={8}>
                                            {currentTags.map(t => <Button key={t} onClick={() => {window.location.href=`/#/pts/search?q=${t}`}}>{t}</Button>)}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>

            </div>
        );
    }
}


export default PostDetail;
