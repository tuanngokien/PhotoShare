import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import IconButton from '@material-ui/core/IconButton';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import {IoMdShare, IoIosKeypad, IoIosShareAlt} from 'react-icons/io';
import Grid from '@material-ui/core/Grid';
import tileData from './tileData';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        // backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100%',
        height: '100%',
    },
    gridItem: {
        border: "5px solid #ddd",
        borderRadius: "15px",
        padding: "5px!important",
    },
    subheader: {
        width: '100%',
    },
});

function ImageGridList(props) {
    const {classes} = props;

    return (
        <div className={classes.root}>
            <GridList cellHeight={320} className={classes.gridList} cols={4}>
                {tileData.map(tile => (
                    <GridListTile key={tile.img} cols={tile.cols || 1} className={classes.gridItem}>
                        <img src={tile.img} alt={tile.title}/>
                        <GridListTileBar
                            style={{fontFamily: "Niramit"}}
                            title={<p style={{margin: "0 0 4px 0"}}>{tile.title}</p>}
                            subtitle={
                                <Grid container spacing={16} alignItems={"center"}>
                                    <Grid item xs={4}>
                                        <Grid container alignItems={"center"}>
                                            <IoIosKeypad/>
                                            <span>{tile.photoCount} photos</span>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Grid container alignItems={"center"}>
                                            <IoIosShareAlt/>
                                            <span>{tile.shareCount} shares</span>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            }
                            actionIcon={
                                <IconButton>
                                    <IoMdShare color={"white"}/>
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

ImageGridList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageGridList);
