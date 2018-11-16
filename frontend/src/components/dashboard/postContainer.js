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
        const {postId, fullName, username, avatar, photos} = this.props;
        return (
            <div style={{marginBottom: '10%', marginLeft: '5%', marginRight: '5%'}}>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" style={{width: "2.3em", height: "2.3em"}}>
                                <img src={avatar} style={{width: '100%', height: '100%'}}/>
                            </Avatar>
                        }
                        title={
                            <a href="#/profile/{user_id}"
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
                    {photos.map(photo => (
                        <ListItem key={photo.id} dense button style={{padding: 'unset', marginBottom: '1%'}}
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
                        <ListItem style={{borderTop: "1px solid #E1E1E1", paddingLeft: 'unset', paddingRight: 'unset', paddingBottom:'unset'}}>
                          <Grid container spacing={8}>
                            <Grid item xs={1} >
                              <Avatar src={avatar}/>
                            </Grid>
                            <Grid item xs={11}>
                              <ListItemText primary={<span style={{fontWeight: 'bold'}}>{fullName}</span>} secondary="Jan 7, 2014" style={{marginLeft: '25px'}}/>
                            </Grid>
                            <Grid item xs={1} >
                            </Grid>
                            <Grid item xs={11}>
                              <CardContent style={{paddingTop:'unset', paddingBottom:'unset'}}>
                              <Typography paragraph>Ảnh đẹp quá</Typography>
                              </CardContent>
                            </Grid>
                          </Grid>
                        </ListItem>
                        <ListItem style={{borderTop: "1px solid #E1E1E1", paddingLeft: 'unset', paddingRight: 'unset', paddingBottom:'unset'}}>
                          <Grid container spacing={8}>
                            <Grid item xs={1} >
                              <Avatar src={avatar}/>
                            </Grid>
                            <Grid item xs={11}>
                              <ListItemText primary={<span style={{fontWeight: 'bold'}}>{fullName}</span>} secondary="Jan 7, 2014" style={{marginLeft: '25px'}}/>
                            </Grid>
                            <Grid item xs={1} >
                            </Grid>
                            <Grid item xs={11}>
                              <CardContent style={{paddingTop:'unset', paddingBottom:'unset'}}>
                              <Typography paragraph>Ảnh đẹp quá</Typography>
                              </CardContent>
                            </Grid>
                          </Grid>
                        </ListItem>
                      </List>
                    </Collapse>
                </Card>
            </div>
        )
    }
}
