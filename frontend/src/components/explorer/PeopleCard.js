import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";
import {MdFullscreen} from "react-icons/md";
import {formatNumber} from "../../utils";

export default function ({rank, fullName, username, avatar, view_count, photos}) {
    return (
        <Paper className={"people-card"}>
            <Grid item xs={12}>
                <Grid container alignItems={"center"}>
                    <Grid item xs={12} md={5}>
                        <Grid container alignItems={"center"}>
                            <Grid item xs={3}>
                                <Grid container direction={"column"} alignItems={"center"}>
                                    <span style={{fontSize: "3em", fontWeight: "bold"}}>{rank + 1}</span>
                                    <span style={{
                                        fontSize: "0.85em",
                                        fontWeight: "750",
                                        color: "#666"
                                    }}>{formatNumber(view_count)}</span>
                                    <span style={{
                                        fontSize: "0.85em",
                                        color: "#666"
                                    }}>Views</span>
                                </Grid>
                            </Grid>
                            <Grid item xs={1} style={{borderLeft: "5px solid #C4C4C4", height: "10vh"}} className={"divider"}></Grid>
                            <Grid item xs={3} lg={2}>
                                <div>
                                    <div style={{
                                        background: "linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%)",
                                        borderRadius: "50%",
                                        padding: "3px",
                                        width: "fit-content"}}>
                                        <Avatar style={{width: "3.1em", height: "3.1em", border: "2px solid white"}} className={"people-avatar"} src={avatar}/>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={5} lg={6}>
                                <Grid container direction={"column"}>
                                    <Link to={"/"} style={{textDecoration: "none", color: "#333333"}}>
                                        <span style={{fontSize: "1.5em", fontWeight: "bold"}}>{fullName}</span>
                                    </Link>
                                    <span style={{fontSize: "1em", fontWeight: "bold", color: "#666"}}>@{username}</span>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={7} className={"people-image-container"}>
                        <div className={"people-image-list"}>
                            {photos.map((p, i) => <img key={i} src={p} style={{maxHeight: "150px", width: "auto"}}/>)}
                            <div className={"people-detail"}>
                                <Link to={"/test"} style={{textDecoration: "none", color: "#333"}}>
                                    <div style={{display: "table", height: "100%"}}>
                                        <MdFullscreen style={{
                                            fontSize: "2.2em",
                                            display: "table-cell",
                                            height: "100%",
                                            verticalAlign: "middle"
                                        }}/>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}