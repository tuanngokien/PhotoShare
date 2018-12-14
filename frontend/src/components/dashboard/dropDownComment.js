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

    // deleteRequest = async (postId) => {
    //     let data = {
    //         "type": '2'
    //     };
    //     this.setState({private: false})
    //     this.setState({friend: true})
    //     this.setState({public: false})
    //     await axios.patch('/api/posts/' + postId + '/privacy', data, {headers: headers})
    //     .then(res => {
    //         console.log(res.data);
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }

    render() {
        const current_user_id = localStorage.getItem('id');
        const {userCommentId, userId} = this.props;
        return (
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
        )
    }
}
