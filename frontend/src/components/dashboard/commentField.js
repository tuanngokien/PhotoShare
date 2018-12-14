import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/es/Input/Input";
import Avatar from '@material-ui/core/Avatar';
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";

export default class CommentField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: null,
        };
    }

    handleOnChange = (event) => {
        this.setState({
            content: event.target.value,
        })
    }


    comment = async (postId, e) => {
        var headers = {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        };
        if (this.state.content !== null) {
            let data = {
                "text": this.state.content
            };
            await axios.post('/api/posts/' + postId + '/comments', data, {headers: headers})
                .then(res => {
                    console.log(res.data);
                }).catch(err => {
                    console.log(err);
                })
        }
        //document.getElementById("field").reset();
        this.props.loadFeed();
        this.setState({content: ''});
    }

    render() {
        const {avatar, postId} = this.props;
        return (
            <ListItem style={{
                paddingLeft: 'unset',
                paddingRight: 'unset',
                marginBottom: "10px",
                paddingBottom: "10px",
                marginTop: "12px"
            }}>
                <Grid container spacing={40} alignItems={"center"}>
                    <Grid item xs={1}>
                        <Avatar src={avatar}/>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Input
                                    id="field"
                                    placeholder="Write your comment"
                                    multiline={true}
                                    className={"comment-field"}
                                    value={this.state.content}
                                    onChange={this.handleOnChange}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid items xs={2} className={"comment-button"}>
                        <Button
                            onClick={() => this.comment(postId)}
                            className={"comment-action"}>
                            Post
                        </Button>
                    </Grid>
                </Grid>
            </ListItem>
        );
    }
};
