import IconButton from "@material-ui/core/IconButton";
import React from "react";

export default ({isFollowing}) => {
    if(isFollowing === undefined || isFollowing === null){
        return null;
    }
    return (
        <IconButton className={"action-button"}>
            <span>{isFollowing ? "Following" : "Follow"}</span>
        </IconButton>
    );
}