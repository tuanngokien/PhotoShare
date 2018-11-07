import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import {MdAddBox} from "react-icons/md";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginBottom: "2em"
    },
});

const UserFollowListItem = ({avatarSrc, username, fullName}) => {
    return (
        <ListItem style={{borderBottom: "1px solid #E1E1E1"}}>
            <Avatar
                src={avatarSrc}/>
            <Card style={{boxShadow: "none"}}>
                <CardHeader title={<span style={{fontSize: "0.6em", fontWeight: "bold"}}>{username}</span>}
                            subheader={<span style={{fontSize: "0.85em"}}>{fullName}</span>}
                            style={{paddingTop: "0px", paddingBottom: "0px"}}
                />
            </Card>
            <ListItemSecondaryAction>
                <IconButton aria-label="Comments">
                    <MdAddBox style={{fontSize: "1.1em"}}/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
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
                            fullName={user.fullName}
                        />
                    )}
                </List>
            </Card>
        );
    }
}

export default withStyles(styles)(FollowSideBar);