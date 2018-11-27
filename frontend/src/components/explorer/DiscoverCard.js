import Grid from "@material-ui/core/Grid/Grid";
import React from "react";

export default function ({name, photoCount, previewImages}) {
    return (
        <Grid item md={4}>
            <a href={"javascript:void(0)"} style={{textDecoration: "none", color: "#000000"}}>
                <Grid container>
                    <Grid item xs={12} style={{lineHeight: "0.8"}}>
                        <img alt={"preview card"}
                             src={previewImages[0]}
                             style={{
                                 width: "100%",
                                 maxHeight: "20vh",
                                 objectFit: "cover",
                                 borderTopRightRadius: "10px",
                                 borderTopLeftRadius: "10px"
                             }}/>
                        <Grid container spacing={0} className={"discover-album-small-cards"}>
                            <Grid item xs={4} style={{paddingRight: "1.5px"}}>
                                <img
                                    alt={"preview card"}
                                    src={previewImages[1]}
                                    style={{
                                        width: "100%",
                                        maxHeight: "8vh",
                                        borderBottomLeftRadius: "10px",
                                        objectFit: "cover"
                                    }}/>
                            </Grid>
                            <Grid item xs={4} style={{paddingLeft: "1.5px", paddingRight: "1.5px"}}>
                                <img
                                    alt={"preview card"}
                                    src={previewImages[2]}
                                    style={{width: "100%", maxHeight: "8vh", objectFit: "cover"}}/>
                            </Grid>
                            <Grid item xs={4} style={{paddingLeft: "1.5px"}}>
                                <img
                                    alt={"preview card"}
                                    src={previewImages[3]}
                                    style={{
                                        width: "100%",
                                        maxHeight: "8vh",
                                        borderBottomRightRadius: "10px",
                                        objectFit: "cover"
                                    }}/>
                            </Grid>
                        </Grid>
                        <Grid container direction={"column"} alignItems={"center"}>
                            <h2>{name}</h2>
                            <span style={{fontSize: "1.15em"}}>{photoCount} photos</span>
                        </Grid>
                    </Grid>
                </Grid>
            </a>
        </Grid>
    );
}