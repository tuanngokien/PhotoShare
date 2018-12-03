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
            <div style={{background: "linear-gradient(to right, #40e0d0, #ff8c00, #ff0080)", borderRadius: "50%", padding: "2.5px"}}>
                <Avatar src={avatarSrc} style={{border: "2px solid white", width: "2.3em", height: "2.3em"}}/>
            </div>
            <Card style={{boxShadow: "none"}}>
                <CardHeader title={<span style={{fontSize: "0.65em", fontWeight: "bold"}}>{username}</span>}
                            subheader={<span style={{fontSize: "0.9em"}}>{fullName}</span>}
                            style={{paddingLeft: "8px",paddingTop: "0", paddingBottom: "0"}}
                            className={"sm-line-height"}
                />
            </Card>
            <ListItemSecondaryAction>
                <IconButton style={{backgroundColor: "#128fdc", borderRadius: "5px", padding: "7px 15px", marginRight: "15px"}}>
                    <span style={{color: "white", fontSize: "0.57em", fontWeight: "bold", marginRight: "3px"}}>Follow</span>
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