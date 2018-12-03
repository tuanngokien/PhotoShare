import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ImageBox from './../imageBox/ImageBox.js';
import Collapse from '@material-ui/core/Collapse';
import {FaRegHeart, FaHeart, FaRegComment, FaRegPaperPlane} from "react-icons/fa";
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import {Col, Row} from 'react-grid-system';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default class postContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openImgBox: false,
            expanded: false,
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
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    }

    render() {
        const {postId, userId, fullName, username, avatar, photos, comment} = this.props;
        var link = "#/pts/profile/" + userId
        return (
            <div style={{marginBottom: '10%', marginLeft: '5%', marginRight: '5%'}}>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" style={{width: "2.3em", height: "2.3em"}}>
                                <img src={avatar} style={{width: '100%', height: '100%'}}/>
                            </Avatar>
                        }
                        action={
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={
                            <a href={link}
                               style={{textDecoration: 'none', color:'black'}}
                            >
                                <p style={{margin: 0, fontWeight: "bold", fontSize: "1.15em"}}>
                                {fullName}
                                </p>
                            </a>}
                        subheader={"September 14, 2018"}
                        style={{paddingBottom: "10px"}}
                        className={"md-line-height"}
                    />
                    <Carousel
                        showStatus = {false}
                        showThumbs = {false}
                        showIndicators = {photos.length === 1 ? false : true}
                        dynamicHeight = {true}
                    >
                        {photos.map(photo => (
                            <ListItem key={photo.id} dense button style={{padding: 'unset'}}
                                      onClick={(e) => this.openImgBox(e, photo.id)}>
                                <img src={photo.src} style={{
                                    width: '100%',
                                    height: '100%',
                                    maxHeight: "60vh",
                                    objectFit: "cover",
                                }}/>
                            </ListItem>
                        ))
                        }
                    </Carousel>
                    <ImageBox
                        isOpen={this.state.openImgBox}
                        isClose={this.closeImgBox.bind(this)}
                        gotoPrevious={this.gotoPrevious.bind(this)}
                        gotoNext={this.gotoNext.bind(this)}
                        // currentImage={this.state.currentImage}
                        images={photos}
                    />
                    <CardActions disableActionSpacing style={{paddingTop: "3px"}}>
                        <IconButton aria-label="Like" onClick={this.onHandleLike}>
                            {this.state.liked ? <FaHeart style={{color: "#dc3545"}}/> : <FaRegHeart/>}
                        </IconButton>
                        <IconButton aria-label="Share" onClick={this.handleExpandClick}>
                            <FaRegComment/>
                        </IconButton>
                        <IconButton aria-label="Share">
                            <FaRegPaperPlane/>
                        </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                      <List style={{paddingTop: 'unset', paddingBottom: 'unset', paddingLeft:'15px'}}>
                        {comment.map(cmt => (
                            <ListItem style={{borderTop: "1px solid #E1E1E1", paddingLeft: 'unset', paddingRight: 'unset', paddingBottom:'unset'}}>
                              <Grid container spacing={8}>
                                <Grid item xs={1} >
                                  <Avatar src={cmt.avatar}/>
                                </Grid>
                                <Grid item xs={11}>
                                  <ListItemText primary={<span style={{fontWeight: 'bold'}}>{cmt.fullName}</span>} secondary="Jan 7, 2014" style={{marginLeft: '25px'}}/>
                                </Grid>
                                <Grid item xs={1} >
                                </Grid>
                                <Grid item xs={11}>
                                  <CardContent style={{paddingTop:'unset', paddingBottom:'unset'}}>
                                  <Typography paragraph>{cmt.content}</Typography>
                                  </CardContent>
                                </Grid>
                              </Grid>
                            </ListItem>
                        ))}
                        <TextField
                            placeholder="Write your comment..."
                            multiline="true"
                            overflow = "hidden"
                            margin="normal"
                            variant="outlined"
                            style={{width: '77%', marginRight: '2%', marginLeft: '2%', marginBottom: '3%'}}
                        />
                        <Button style={{marginTop: '6%', marginLeft: '1%'}}> Post</Button>
                      </List>
                    </Collapse>
                </Card>
            </div>
        )
    }
}
