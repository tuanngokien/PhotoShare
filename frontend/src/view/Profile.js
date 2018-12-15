import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import 'react-tabs/style/react-tabs.css';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import ImageGridList from './../components/imageGridList/ImageGridList.js';
import ImageLayout from '../components/imageLayout/ImageLayout.js';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { MdModeEdit } from "react-icons/md";
import axios from 'axios';

function TabContainer({children, dir}) {
    return (
        <Typography component="div" dir={dir} style={{padding: 24}}>
            {children}
        </Typography>
    );
}

class PostsOrderSelect extends React.Component {
    state = {
        order: ""
    };

    handleChange = event => {
        let order = event.target.value;
        this.setState({order})
    };

    componentDidMount() {
        this.setState({order: "recent"});
    }

    render() {
        return (
            <FormControl>
                <Select value={this.state.order}
                        onChange={this.handleChange}
                        style={{fontSize: "85%", fontWeight: "bold"}}>
                    <MenuItem value={"recent"}>Most Recent</MenuItem>
                    <MenuItem value={"top"}>Top Posts</MenuItem>
                </Select>
            </FormControl>
        )
    }
}

const styles = {
    timeline: {
        color: "white",
    },

    avatar: {
        margin: "5vh 20px 3vh 7%",
    },
    bigAvatar: {
        width: 160,
        height: 160,
    },
};

const TimelineProfile = withStyles(styles)((props) => {
    const {classes} = props;
    var link = "#/pts/edit/";
    var link1 = '#/pts/followers/' + props.user_id;
    var link2 = '#/pts/following/' + props.user_id;
    const user = props.user;
    return (
        <Grid item xs={12}>
            <Card>
                <CardMedia
                    image='http://farm5.staticflickr.com/4119/coverphoto/35928550@N02_h.jpg?1498949394#35928550@N02'
                    style={{padding: '10vh 0 0 0'}}>
                    <Grid container direction="row" justify="flex-start" alignItems="center"
                          className={classes.timeline}>
                        <Avatar alt="Remy Sharp"
                                src= {user.avatar}
                                className={classNames(classes.avatar, classes.bigAvatar)}/>
                        <div>
                            <Grid container direction={"row"} justify={"flex-start"} alignItems={"center"}>
                                <h1 style={{marginRight: "15px"}}>{user.firstName} {user.lastName}</h1>
                                {props.current_user_id === props.params.id ?
                                    (<IconButton styles={{color: 'white'}} >
                                        <a href={link}>
                                            <MdModeEdit style={{color: 'white'}}/>
                                        </a>
                                    </IconButton>):
                                    (props.fl ? (
                                        <Button variant="outlined"
                                            onClick={() => props.unfollow()}
                                            style={{borderColor: "white", color: "white", padding: "0 15px"}}>
                                            <Grid container justify={"center"} alignItems={"center"}>
                                                <span>Following</span>
                                            </Grid>
                                        </Button>
                                        ):(
                                        <Button variant="outlined"
                                            onClick={() => props.follow()}
                                            style={{borderColor: "white", color: "white", padding: "0 15px"}}>
                                            <Grid container justify={"center"} alignItems={"center"}>
                                                <span>Follow</span>
                                            </Grid>
                                        </Button>)
                                    )
                                }
                            </Grid>
                            <Grid container direction="row"
                                  justify="space-between"
                                  alignItems="center">
                                <span style={{marginRight: "20px",}}>@{user.username}</span>
                                <span style={{marginRight: "20px"}}>
                                  <a href={link1} style={{textDecoration:'none', color:'white'}}>{props.followers} Followers</a>
                                </span>
                                <span><a href={link2} style={{textDecoration:'none', color:'white'}}>{props.following} Following</a></span>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid container justify={"flex-end"} alignItems={"flex-start"}>
                        <div style={{color: "white", margin: "0 7% 20px 10px"}}>
                            <span style={{marginRight: "20px",}}>{props.posts} Posts</span>
                            <span style={{marginRight: "20px",}}>{props.photos} Photos</span>
                            <span>Joined {props.joined}</span>
                        </div>
                    </Grid>
                </CardMedia>
            </Card>
        </Grid>
    );
});

const StyleTab = props => {
    return (
        <Tab {...props} style={{fontWeight: "bold"}}/>
    )
};

class Profile extends Component {
    state = {
        value: 0,
        postsCount: 0,
        photosCount: 0,
        joined: null,
        id: null,
        firstName: null,
        lastName: null,
        following: null,
        followers: null,
        userName: null,
        user: {},
        fl: false,
        data: []
    };

    componentWillMount(){
        var headers = {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
        var com = this;
        this.setState({id: localStorage.getItem('id') || 1});
        axios.get('/api/' + localStorage.getItem('id') + '/follows', {headers: headers})
        .then(function(res) {
            res.data.following.map(fl => {
                if(fl.id.toString() === com.props.match.params.id){
                    com.setState({fl: true})
                }
            })
        }).catch(function(err) {
            console.log(err);
        })
    }

    follow = async () => {
        var headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        var com = this;
        this.setState({fl: true})
        await axios.post('/api/' + this.props.match.params.id + '/follows', null, {headers: headers})
        .then(function(res) {
            console.log(res.data);
        }).catch(function(err) {
            console.log(err);
        })
    }

    unfollow = async () => {
        var headers = {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
        var com = this;
        this.setState({fl: false})
        await axios.delete('/api/' + this.props.match.params.id + '/follows', {headers: headers})
        .then(function(res) {
            console.log(res.data);
        }).catch(function(err) {
            console.log(err);
        })
    }

    handleChange = (event, value) => {
        this.setState({value});
    };

    handleChangeIndex = index => {
        console.log(index);
    };

    setPostsCount = (postsCount) => {
        this.setState({postsCount: postsCount});
    };

    setPhotosCount = (photosCount) => {
        this.setState({photosCount: photosCount});
    };

    setUser = (user) => {
        this.setState({user});
    };

    setJoined = (joined) => {
        this.setState({joined: joined});
    };

    setFollowing = (following) => {
        this.setState({following: following});
    };

    setFollowers = (followers) => {
        this.setState({followers: followers});
    };

    setUserName = (userName) => {
        this.setState({userName: userName});
    };

    setJoined = (joined) => {
        this.setState({joined: joined});
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container className={"user-page-container"}>
                    <TimelineProfile
                        classes={classes}
                        posts = {this.state.postsCount}
                        photos = {this.state.photosCount}
                        joined = {this.state.joined}
                        current_user_id = {this.state.id}
                        following = {this.state.following}
                        followers = {this.state.followers}
                        params = {this.props.match.params}
                        user = {this.state.user}
                        user_id = {this.props.match.params.id}
                        fl = {this.state.fl}
                        follow = {this.follow.bind(this)}
                        unfollow = {this.unfollow.bind(this)}
                    />
                    <Grid item xs={12}>
                        <AppBar position="static" color="default" className={"profile-nav-bar"}>
                            <Tabs
                                className={"containerImageList"}
                                style={{margin: "0 7%", color: "black"}}
                                value={this.state.value}
                                onChange={this.handleChange}
                                indicatorColor={"primary"}>
                                <StyleTab label="Post"/>
                                <StyleTab label="Album"/>
                            </Tabs>
                        </AppBar>
                        <div className='containerImageList' style={{height: 'auto', position: "relative"}}>
                            <Grid container justify={"flex-end"}
                                  style={{paddingRight: "24px", position: "absolute", "top": "-11px"}}>
                                <PostsOrderSelect/>
                            </Grid>
                            <SwipeableViews
                                index={this.state.value}
                                onChangeIndex={this.handleChangeIndex}>
                                <TabContainer>
                                    <ImageLayout
                                        postsCount = {this.setPostsCount.bind(this)}
                                        photosCount = {this.setPhotosCount.bind(this)}
                                        joined = {this.setJoined.bind(this)}
                                        following = {this.setFollowing.bind(this)}
                                        followers = {this.setFollowers.bind(this)}
                                        userName = {this.setUserName.bind(this)}
                                        setUser={this.setUser}
                                        params = {this.props.match.params}/>
                                </TabContainer>
                                <TabContainer>
                                    <ImageGridList/>
                                </TabContainer>
                                <TabContainer>Saved</TabContainer>
                                <TabContainer>Tagged</TabContainer>
                            </SwipeableViews>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Profile;
