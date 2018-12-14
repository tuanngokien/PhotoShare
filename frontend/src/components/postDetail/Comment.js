import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import Moment from 'react-moment';

export default ({user, createdAt, text}) => {
    return (
        <Grid container spacing={16}>
            <Grid item xs={"auto"}>
                <Avatar
                    src={user.avatar}
                    style={{border: "2px solid white", width: "2em", height: "2em"}}/>
            </Grid>
            <Grid item xs={10}>
                <div className={"comment-user"}>
                    <a href={"#"}>{user.firstName} {user.lastName}</a>
                    <span><Moment fromNow>{createdAt}</Moment></span>
                </div>
                <div>
                    <span>{text}</span>
                </div>
            </Grid>
        </Grid>
    )
};