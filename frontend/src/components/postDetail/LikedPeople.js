import React from "react";

export default ({likes}) => {
    if (likes) {
        return (
            <p>
                <a href={"#"}>{likes.length} people</a> liked this
            </p>
        )
    }
    return null;
};

