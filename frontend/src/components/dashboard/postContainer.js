import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ImageBox from './../imageBox/ImageBox.js';
import Collapse from '@material-ui/core/Collapse';
import {FaRegHeart, FaHeart, FaRegComment, FaRegPaperPlane} from "react-icons/fa";
import List from '@material-ui/core/List';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import Grid from '@material-ui/core/Grid';
import Input from "@material-ui/core/es/Input/Input";
import Button from "@material-ui/core/Button";
import {formatNumber} from "../../utils";
import axios from 'axios';
import CommentField from './commentField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DropdownPostContainer from './dropDownPostContainer.js';
import DropdownComment from './dropDownComment.js';
import Moment from 'react-moment';


export default class postContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openImgBox: false,
            expanded: true,
            liked: this.props.liked,
            anchorEl: null,
            comments: this.props.comments,
            likes: this.props.likes,
            isHovering: false,
            currentImage: 0,
            src: '',
            width: '',
            height: ''
        };
        this.openImgBox = this.openImgBox.bind(this);
        this.closeImgBox = this.closeImgBox.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.JSClock = this.JSClock.bind(this);
    }

    async componentWillReceiveProps(nextProps) {
        if(this.props.comments !== nextProps.comments)
        {
            await this.setState(state => ({
                comments: nextProps.comments,
            }));
        }
        await this.setState(state => ({
            likes: nextProps.likes,
        }));
    }

    openImgBox = (e, index) => {
        this.setState({openImgBox: true});
        this.setState({currentImage: index})
    };

    closeImgBox() {
        this.setState({openImgBox: false});
    }

    gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1
        });
    }

    gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1
        });
    }

    onHandleLike = async (postId) => {
        this.setState({liked: !this.state.liked});
        var headers = {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        };
        if(this.state.liked){
            await axios.delete('/api/posts/' + postId + '/likes', {headers: headers})
            .then(function(res){
                //console.log("unliked")
            })
            .catch(function(err){
                console.log(err)
            })
        }
        else{
            await axios.post('/api/posts/' + postId + '/likes', null, {headers: headers})
            .then(function(res){
                //console.log("liked")
            })
            .catch(function(err){
                console.log(err)
            })
        }
        await this.props.loadData();
    };

    handleExpandClick = () => {
        this.setState(state => ({expanded: !state.expanded}));
    };

    JSClock = ( date ) =>{
        var time = new Date(date);
        var hour = time.getHours();
        var minute = time.getMinutes();
        var temp = ((hour < 10) ? '0' : ' ') + hour;
        temp += ((minute < 10) ? ':0' : ':') + minute;
        temp += ' ' +time.getDate()+'/' + time.getMonth() +'/' + time.getFullYear()
        return temp;
    };

    linkProfileCmtUser = (user_id) => {
        var link = "#/pts/profile/" + user_id
        return link;
    }
    render() {
        const {id, user, userId, photos, updatedAt, privacy, viewCount} = this.props;
        const comments = this.state.comments;
        const likes = this.state.likes;
        var link = "#/pts/profile/" + userId;
        var linkPostDetail = '#/pts/posts/' + id
        return (
            <div className={"dashboard-post"}>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" style={{width: "2.3em", height: "2.3em"}}>
                                <img src={user.avatar} style={{width: '100%', height: '100%'}}/>
                            </Avatar>
                        }
                        action={
                            <IconButton onClick={this.handleClick}>
                                <DropdownPostContainer postId={id} privacy={privacy} loadFeed={this.props.loadData}/>
                            </IconButton>
                        }
                        title={
                            <a href={link} style={{textDecoration: 'none', color: 'black'}}>
                                <p style={{margin: 0, fontWeight: "bold", fontSize: "1.15em"}}>
                                    {user.firstName} {user.lastName}
                                </p>
                            </a>}
                        subheader={<Moment fromNow>{updatedAt}</Moment>}
                        style={{paddingBottom: "10px"}}
                        className={"md-line-height dashboard-post-content"}
                    />
                    <Carousel
                        showStatus={false}
                        showArrows={true}
                        infiniteLoop={true}
                        showThumbs={false}
                        showIndicators={photos.length === 1 ? false : true}
                        dynamicHeight={true}>
                        {photos.map(photo => (
                            <ListItem key={photo.id} dense button style={{padding: 'unset'}}
                                      onClick={() => {window.location.replace(linkPostDetail)}}>
                                <img src={photo.originalImage} style={{
                                    width: '100%',
                                    height: '100%',
                                    maxHeight: "70vh",
                                    objectFit: "cover",
                                }}/>
                            </ListItem>
                        ))}
                    </Carousel>
                    <ImageBox
                        isOpen={this.state.openImgBox}
                        isClose={this.closeImgBox.bind(this)}
                        gotoPrevious={this.gotoPrevious.bind(this)}
                        gotoNext={this.gotoNext.bind(this)}
                        currentImage={this.state.currentImage}
                        images={['src': photos.postImage, 'width': photos.width, 'height':photos.height]}
                    />
                    <CardActions disableActionSpacing style={{
                        borderBottom: "1px solid #D2D2D2",
                        padding: "2px 30px 2px 12px",
                        justifyContent: "space-between"
                    }}>
                        <div>
                            <IconButton aria-label="Like" onClick={() => this.onHandleLike(id)}>
                                {this.state.liked ? <FaHeart style={{color: "#dc3545"}}/> : <FaRegHeart/>}
                            </IconButton>
                            <IconButton aria-label="Share" onClick={this.handleExpandClick}>
                                <FaRegComment/>
                            </IconButton>
                            <IconButton aria-label="Share">
                                <FaRegPaperPlane/>
                            </IconButton>
                        </div>
                        <div className={"post-summary"}>
                            <span>{formatNumber(likes)} likes</span>
                            <span>{formatNumber(viewCount)} views</span>
                        </div>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <List style={{paddingTop: 'unset', paddingBottom: 'unset', paddingLeft: '15px'}}>
                            {comments.map((cmt, i) => (
                                <ListItem key={i} style={{
                                    paddingLeft: 'unset',
                                    paddingRight: 'unset',
                                    paddingBottom: 'unset',
                                    marginBottom: "8px"
                                }}>
                                    <Grid container spacing={40}>
                                        <Grid item xs={1}>
                                            <Avatar src={cmt.user.avatar}/>
                                        </Grid>
                                        <Grid item xs={10} className={"comment-text"} style={{paddingLeft: '30px'}}>
                                            <Grid container direction={"column"}>
                                                <Grid item direction={"row"}>
                                                    <div style={{
                                                        backgroundColor: "#F3F3F3",
                                                        width: "fit-content",
                                                        padding: "8px 10px",
                                                        borderRadius: "18px"}}>
                                                        <span style={{
                                                            fontWeight: '600',
                                                            fontSize: "0.9em",
                                                            color: 'black'
                                                        }}>
                                                            <a href={this.linkProfileCmtUser(cmt.user.id)}
                                                               style={{
                                                                textDecoration: 'none',
                                                                color: 'black'
                                                                }}
                                                            >
                                                                {cmt.user.firstName} {cmt.user.lastName}
                                                            </a>
                                                        </span>
                                                        <span style={{
                                                            marginLeft: "7px",
                                                            fontSize: "0.9em",
                                                        }}>{cmt.text}</span>
                                                    </div>
                                                </Grid>
                                                <Grid item>
                                                    <span style={{
                                                        color: "rgba(0, 0, 0, 0.54)",
                                                        fontSize: "0.85em",
                                                        paddingLeft: "10px"
                                                    }}>{<Moment fromNow>{cmt.createdAt}</Moment>}</span>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <DropdownComment
                                        userCommentId= {cmt.userId}
                                        userId= {userId}
                                        commentId = {cmt.id}
                                        postId = {id}
                                        loadFeed = {this.props.loadData}
                                    />
                                </ListItem>
                            ))}
                            <CommentField
                                avatar= {localStorage.getItem("avatar")}
                                postId= {id}
                                loadFeed = {this.props.loadData}
                            />
                        </List>
                    </Collapse>
                </Card>
            </div>
        )
    }
}
