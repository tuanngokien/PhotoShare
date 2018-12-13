import React from "react";
import {Dropdown, Icon} from 'semantic-ui-react';
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Done from '@material-ui/icons/Done';
import axios from 'axios';

const headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token')
};
export default class DropdownPostContainer extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        private: false,
        friend: false,
        public: false,
        privacy: this.props.privacy
      };
    }

    async componentWillReceiveProps(nextProps) {
        await this.setState(state => ({
            privacy: nextProps.privacy,
        }));
    }
    privateRequest = async (postId) => {
        let data = {
            "type": '1'
        };
        this.setState({private: true})
        this.setState({friend: false})
        this.setState({public: false})
        await axios.patch('/api/posts/' + postId + '/privacy', data, {headers: headers})
        .then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
        this.props.loadFeed();
    }

    friendRequest = async (postId) => {
        let data = {
            "type": '2'
        };
        this.setState({private: false})
        this.setState({friend: true})
        this.setState({public: false})
        await axios.patch('/api/posts/' + postId + '/privacy', data, {headers: headers})
        .then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
        this.props.loadFeed();
    }

    publicRequest = async (postId) => {
        let data = {
            "type": '3'
        };
        this.setState({public: true})
        this.setState({private: false})
        this.setState({friend: false})
        await axios.patch('/api/posts/' + postId + '/privacy', data, {headers: headers})
        .then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
        this.props.loadFeed();
    }

    render() {
        const postId = this.props.postId
        //console.log(this.props)
        let {fullName, username}= {fullname:localStorage.getItem('name'), username:localStorage.getItem('username')};
        return (
            <Dropdown trigger={<MoreVertIcon/>} className={"dropdown-avatar"} direction={"left"} floating>
                <Dropdown.Menu>
                    <Dropdown.Item
                        as={"a"}
                        href={"/#/pts/profile/1"}
                        text={<div>
                            <h5><strong style={{fontSize: "1em"}}>Privacy</strong></h5>
                        </div>}
                        id={"avatar-header"}
                    />
                    <Dropdown.Item
                        onClick={() => this.privateRequest(postId)}
                        as={"a"}
                        text={"Private"}
                        description={this.state.privacy==='1'?<Done style={{height: '20px', marginLeft: '15px'}}/>: null}
                        icon={"privacy"}
                    />
                    <Dropdown.Item
                        onClick={() => this.friendRequest(postId)}
                        as={"a"}
                        text={"Friends"}
                        description={this.state.privacy==='2'?<Done style={{height: '20px', marginLeft: '15px'}}/>: null}
                        icon={"users"}
                    />
                    <Dropdown.Item
                        onClick={() => this.publicRequest(postId)}
                        as={"a"}
                        description={this.state.privacy==='3'?<Done style={{height: '20px', marginLeft: '15px'}}/>: null}
                        text={"Public"}
                        icon={"eye"}
                    />
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}
