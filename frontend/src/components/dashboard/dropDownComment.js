import React from "react";
import {Dropdown, Icon} from 'semantic-ui-react';
import Avatar from "@material-ui/core/Avatar";
import Done from '@material-ui/icons/Done';
import HoverIcon from './hoverIcon.js'
import axios from 'axios';

const headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token')
};
export default class DropdownComment extends React.Component {
    constructor(props) {
      super(props);
    }
    deleteRequest = async () => {
        await axios.delete('/api/posts/' + this.props.postId + '/comments/' + this.props.commentId, {headers: headers})
        .then(res => {
            //console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
        this.props.loadFeed();
    }

    render() {
        const current_user_id = localStorage.getItem('id');
        const {userCommentId, userId} = this.props;
        return (
            <div>
                {current_user_id != userCommentId.toString() && userCommentId != userId.toString() ? null:
                    <Dropdown trigger={<HoverIcon/>} className={"dropdown-avatar"} direction={"left"}>
                        <Dropdown.Menu>
                            {current_user_id===userCommentId.toString()?
                                <Dropdown.Item
                                    //onClick={() => this.privateRequest(postId)}
                                    text={"Edit"}
                                    icon={"edit"}
                                />:null
                            }
                            {current_user_id===userCommentId.toString() || current_user_id===userId.toString()?
                                <Dropdown.Item
                                    onClick={() => this.deleteRequest()}
                                    text={"Delete"}
                                    icon={"delete"}
                                />:null
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                }
            </div>
        )
    }
}
