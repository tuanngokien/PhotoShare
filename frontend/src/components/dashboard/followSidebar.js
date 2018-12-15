import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginBottom: "2em"
    },
});

class UserFollowListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fl: false
        };
    }

    follow = async (id) => {
        var headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        var com = this;
        this.setState({fl: true})
        await axios.post('/api/' + id + '/follows', null, {headers: headers})
        .then(function(res) {
            console.log(res.data);
        }).catch(function(err) {
            console.log(err);
        })

    }

    unfollow = async (id) => {
        var headers = {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
        var com = this;
        this.setState({fl: false})
        await axios.delete('/api/' + id + '/follows', {headers: headers})
        .then(function(res) {
            console.log(res.data);
        }).catch(function(err) {
            console.log(err);
        })
    }
    render(){
        const {avatarSrc, username, fullName, user_id} = this.props;
        let link = "#/pts/profile/" + user_id;
        return (
        <ListItem style={{borderBottom: "1px solid #E1E1E1"}}>
            <div style={{background: "linear-gradient(to right, #40e0d0, #ff8c00, #ff0080)", borderRadius: "50%", padding: "2.5px"}}>
                <Avatar src={avatarSrc} style={{border: "2px solid white", width: "2.3em", height: "2.3em"}}/>
            </div>
            <Card style={{boxShadow: "none"}}>
                <CardHeader title={<a href={link} style={{color: "black"}}>
                                <span style={{fontSize: "0.65em", fontWeight: "bold"}}>{fullName}</span>
                            </a>}
                            subheader={<span style={{fontSize: "0.9em"}}>@{username}</span>}
                            style={{paddingLeft: "8px",paddingTop: "0", paddingBottom: "0"}}
                            className={"sm-line-height"}
                />
            </Card>
            {this.state.fl?
                <ListItemSecondaryAction>
                    <IconButton style={{backgroundColor: "#128fdc", borderRadius: "5px", padding: "7px 15px", marginRight: "15px"}} onClick={()=>{this.unfollow(user_id)}}>
                        <span style={{color: "white", fontSize: "0.57em", fontWeight: "bold", marginRight: "3px"}}>
                            Following
                        </span>
                    </IconButton>
                </ListItemSecondaryAction>:
                <ListItemSecondaryAction>
                    <IconButton style={{backgroundColor: "#128fdc", borderRadius: "5px", padding: "7px 15px", marginRight: "15px"}} onClick={()=>{this.follow(user_id)}}>
                        <span style={{color: "white", fontSize: "0.57em", fontWeight: "bold", marginRight: "3px"}}>
                            Follow
                        </span>
                    </IconButton>
                </ListItemSecondaryAction>
            }
        </ListItem>
    );
    }
};

class FollowSideBar extends React.Component {
    render() {
        const {classes, followList} = this.props;

        return (
            <Card className={classes.root}>
                <List
                    component="nav"
                    subheader={<ListSubheader component="div"><span style={{fontWeight: "bold"}}>RECOMMEND TO FOLLOW</span></ListSubheader>}
                    style={{paddingBottom: 0}}>
                    {followList.map((user, i) =>
                        <UserFollowListItem
                            key={i}
                            avatarSrc={user.avatar}
                            username={user.username}
                            fullName={`${user.firstName} ${user.lastName}`}
                            user_id={user.id}
                        />
                    )}
                </List>
            </Card>
        );
    }
}

export default withStyles(styles)(FollowSideBar);