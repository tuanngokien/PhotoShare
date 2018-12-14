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
import {formatNumber} from "../../utils";

const CommentField = ({avatar}) => {
    return (
        <ListItem style={{
            paddingLeft: 'unset',
            paddingRight: 'unset',
            paddingBottom: 'unset',
            marginBottom: "8px",
        }}>
            <Grid container spacing={40} alignItems={"center"}>
                <Grid item xs={1}>
                    <Avatar src={avatar}/>
                </Grid>
                <Grid item xs={10} md={11}>
                    <Grid container>
                        <Grid item xs={11}>
                            <Input placeholder="Write your comment" multiline={true} className={"comment-field"}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ListItem>
    );
};

export default class postContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openImgBox: false,
            expanded: true,
            liked: this.props.liked,
        };
        this.openImgBox = this.openImgBox.bind(this);
        this.closeImgBox = this.closeImgBox.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
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

    onHandleLike = () => {
        this.setState({liked: !this.state.liked})
    };

    handleExpandClick = () => {
        this.setState(state => ({expanded: !state.expanded}));
    };

    render() {
        const {postId, userId, fullName, username, avatar, photos, comment} = this.props;
        var link = "#/pts/profile/" + userId
        return (
            <div className={"dashboard-post"}>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" style={{width: "2.3em", height: "2.3em"}}>
                                <img src={avatar} style={{width: '100%', height: '100%'}}/>
                            </Avatar>
                        }
                        action={
                            <IconButton>
                                <MoreVertIcon/>
                            </IconButton>
                        }
                        title={
                            <a href={link} style={{textDecoration: 'none', color: 'black'}}>
                                <p style={{margin: 0, fontWeight: "bold", fontSize: "1.15em"}}>
                                    {fullName}
                                </p>
                            </a>}
                        subheader={"September 14, 2018"}
                        style={{paddingBottom: "10px"}}
                        className={"md-line-height dashboard-post-content"}
                    />
                    <Carousel
                        showStatus={false}
                        showArrows={true}
                        infiniteLoop={true}
                        showThumbs={false}
                        showIndicators={photos.length === 1 ? false : true}
                        dynamicHeight={false}>
                        {photos.map(photo => (
                            <ListItem key={photo.id} dense button style={{padding: 'unset'}}
                                      onClick={(e) => this.openImgBox(e, photo.id)}>
                                <img src={photo.src} style={{
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
                        // currentImage={this.state.currentImage}
                        images={photos}
                    />
                    <CardActions disableActionSpacing style={{
                        borderBottom: "1px solid #D2D2D2",
                        padding: "2px 30px 2px 12px",
                        justifyContent: "space-between"
                    }}>
                        <div>
                            <IconButton aria-label="Like" onClick={this.onHandleLike}>
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
                            <span>{formatNumber(32489)} views</span>
                            <span>{formatNumber(225)} likes</span>
                        </div>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <List style={{paddingTop: 'unset', paddingBottom: 'unset', paddingLeft: '15px'}}>
                            {comment.map((cmt, i) => (
                                <ListItem key={i} style={{
                                    paddingLeft: 'unset',
                                    paddingRight: 'unset',
                                    paddingBottom: 'unset',
                                    marginBottom: "8px"
                                }}>
                                    <Grid container spacing={40}>
                                        <Grid item xs={1}>
                                            <Avatar src={cmt.avatar}/>
                                        </Grid>
                                        <Grid item xs={10} className={"comment-text"}>
                                            <Grid container direction={"column"}>
                                                <Grid item>
                                                    <div style={{
                                                        backgroundColor: "#F3F3F3",
                                                        width: "fit-content",
                                                        padding: "8px 10px",
                                                        borderRadius: "18px"}}>
                                                        <span style={{
                                                            fontWeight: '600',
                                                            fontSize: "0.9em"
                                                        }}>{cmt.fullName}</span>
                                                        <span style={{
                                                            marginLeft: "7px",
                                                            fontSize: "0.9em",
                                                        }}>{cmt.content}</span>
                                                    </div>
                                                </Grid>
                                                <Grid item>
                                                    <span style={{
                                                        color: "rgba(0, 0, 0, 0.54)",
                                                        fontSize: "0.85em",
                                                        paddingLeft: "10px"
                                                    }}>2 hours ago</span>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            ))}
                            <CommentField
                                avatar={"https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/29597226_601217733565084_99387188199077288_n.jpg?_nc_cat=1&_nc_ht=scontent.fhan2-3.fna&oh=5447367bdf5e22e371ddc90574e776fc&oe=5C446BCC"}/>
                        </List>
                    </Collapse>
                </Card>
            </div>
        )
    }
}
