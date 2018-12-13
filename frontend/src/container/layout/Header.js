import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from "@material-ui/core/IconButton";
import {Notifications, CloudUpload, Explore} from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import LogoSm from '../../assets/img/logo2.png';
import {Link} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';
import SearchBar from "../../components/searchbar";
import DropdownAvatar from "../../components/avatar";
const styles = theme => ({
    responsiveVisible: {
        [theme.breakpoints.down('sm')]: {
            display: "none!important"
        },
        [theme.breakpoints.up('md')]: {
            display: "flex!important"
        },
    },
    img: {
        [theme.breakpoints.down('sm')]: {
            width: "2.6em!important"
        },
        [theme.breakpoints.up('md')]: {
            width: "2.6em!important"
        },
    },
});

class Header extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div>
                <AppBar position='fixed' id='header' className={"header"}>
                    <div className={"main"}>
                        <Grid container justify={"space-between"} alignItems={"center"}>
                            <Grid item xs={2}>
                                <Link to={"/pts/"} className="app-logo">
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <img src={LogoSm} alt="logo" className={classes.img}
                                             style={{height: "100%"}} id={"main-logo"}/>
                                        <div style={{
                                            width: "3px",
                                            height: "100%",
                                            background: "#FFFFFF",
                                            borderRadius: "15px",
                                            padding: "2px 0",
                                            margin: "0 10px"
                                        }}
                                             className={classes.responsiveVisible}>|
                                        </div>
                                        <div style={{display: "flex", alignItems: "center"}}
                                             className={classes.responsiveVisible}>
                                            <h2 style={{
                                                margin: "0",
                                                fontFamily: "Pacifico",
                                                fontSize: "1.5em",
                                                fontWeight: "bold"
                                            }}>PhotoShare</h2>
                                        </div>
                                    </div>
                                </Link>
                            </Grid>
                            <Grid item xs={3} className={classes.responsiveVisible}>
                                <SearchBar/>
                            </Grid>
                            <Grid item xs={9} md={2} className={"nav-actions"}>
                                <IconButton href='#/pts/upload'>
                                    <CloudUpload/>
                                </IconButton>
                                <IconButton href='#/pts/explorer'>
                                    <Explore/>
                                </IconButton>
                                <IconButton href='#/pts/'>
                                    <Notifications/>
                                </IconButton>
                                <IconButton onClick={this.handleClick}
                                            style={{paddingBottom: "2px", paddingTop: "2px"}}>
                                    <DropdownAvatar/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </div>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(Header)