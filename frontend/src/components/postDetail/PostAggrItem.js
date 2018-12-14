import {formatNumber} from "../../utils";
import Grid from "@material-ui/core/Grid";
import React from "react";

export default ({count, type}) => {
    let humanCount = formatNumber(count);
    return (
        <Grid item xs={3} className={"post-aggr-item"}>
            <Grid container direction={"column"} justify={"center"} style={{height: "100%"}}>
                <Grid item>
                    <span>{humanCount}</span>
                </Grid>
                <Grid item>
                    <span style={{color: "rgb(102, 102, 102)"}}>{type}</span>
                </Grid>
            </Grid>
        </Grid>
    )
};