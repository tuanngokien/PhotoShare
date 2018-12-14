import {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import {Form} from "semantic-ui-react";
import IconButton from "@material-ui/core/IconButton";
import React from "react";

export default class CommentField extends Component {
    state = {
        focus: false
    };

    toggleFocus = (e) => {
        this.setState({focus: !this.state.focus});
    };

    render() {
        return (
            <div style={{width: "100%"}}>
                <Grid container spacing={16}>
                    <Grid item xs={"auto"}>
                        <Avatar
                            src={"https://instagram.fhan2-4.fna.fbcdn.net/vp/084e4c187f0b50baf1ff91557c316995/5C9278BD/t51.2885-19/s150x150/41555840_248415302529242_2516215115871682560_n.jpg?_nc_ht=instagram.fhan2-4.fna.fbcdn.net"}
                            style={{border: "2px solid white", width: "2em", height: "2em"}}/>
                    </Grid>
                    <Grid item xs={10}>
                        <Form className={`comment-form ${this.state.focus ? "focus" : ""}`} onSubmit={this.props.onSubmit}>
                            <textarea placeholder="Write your comment" rows={3} onFocus={this.toggleFocus}
                                      onBlur={this.toggleFocus}/>
                            <Grid container justify={"flex-end"} style={{marginTop: "10px"}}>
                                <IconButton type="submit" className={"action-button"}>
                                    <span>Comment</span>
                                </IconButton>
                            </Grid>
                        </Form>
                    </Grid>
                </Grid>
            </div>
        )
    }
}