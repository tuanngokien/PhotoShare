import React from "react";
import {PeopleCard} from "../../components/explorer";

export default class PeopleContainer extends React.Component{
    state = {
        peoples: []
    };

    componentDidMount() {
        let peoples = require("./data/people");
        this.setState({peoples});
    }

    render() {
        return (
            <div className={"explorer-container page-container"}>
                <h1>Photographer Leaderboard</h1>
                <p>Users with the most views of photos uploaded in the last 30 days.</p>
                <div style={{margin: "30px 0"}} className={"main-content"}>
                    {this.state.peoples.map((p, i) => <PeopleCard key={i} rank={i} {...p}/>)}
                </div>
            </div>
        );
    }
}