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
    var link = "#/pts/edit/" + props.current_user_id
    return (
        <Grid item xs={12}>
            <Card>
                <CardMedia
                    image='http://farm2.staticflickr.com/1861/coverphoto/60475224@N05_h.jpg?1537188632#60475224@N05'
                    style={{padding: '10vh 0 0 0'}}>
                    <Grid container direction="row" justify="flex-start" alignItems="center"
                          className={classes.timeline}>
                        <Avatar alt="Remy Sharp"
                                src="https://c2.staticflickr.com/6/5495/buddyicons/12673279@N07_r.jpg?1483401053#12673279@N07"
                                className={classNames(classes.avatar, classes.bigAvatar)}/>
                        <div>
                            <Grid container direction={"row"} justify={"flex-start"} alignItems={"center"}>
                                <h1 style={{marginRight: "15px"}}>Tuan Ngo Kien</h1>
                                <IconButton styles={{color: 'white'}} >
                                    <a href={link}>
                                        <Icon style={{color: 'white'}}>edit</Icon>
                                    </a>
                                </IconButton>
                            </Grid>
                            <Grid container direction="row"
                                  justify="space-between"
                                  alignItems="center">
                                <span style={{marginRight: "20px",}}>@ngokientuan</span>
                                <span style={{marginRight: "20px"}}>
                                  <a href='#/pts/followers' style={{textDecoration:'none', color:'white'}}>12.5K Followers</a>
                                </span>
                                <span><a href='#/pts/following' style={{textDecoration:'none', color:'white'}}>6K Following</a></span>
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
        id: null
    };

    componentWillMount(){
        this.setState({id: localStorage.getItem('id') || 1});
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
                                <StyleTab label="Saved"/>
                                <StyleTab label="Tagged"/>
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
                                        joined = {this.setJoined.bind(this)}/>
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
