import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from "@material-ui/core/IconButton";
import {Notifications, CloudUpload, Explore} from '@material-ui/icons';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import LogoSm from '../../assets/img/logo2.png';
import {MdSearch} from "react-icons/md";
import {Link} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';

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
            width: "80%!important"
        },
        [theme.breakpoints.up('md')]: {
            display: "10%!important"
        },
    },
});

class Header extends Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    logout = () => {
        this.handleClose();
        window.location.replace("#/form");
    };

    redirectProfile = () => {
        this.handleClose();
        window.location.replace("#/pts/profile/" + localStorage.getItem('id'));
    };

    render() {
        const {anchorEl} = this.state;
        const {classes} = this.props;
        return (
            <div>
                <AppBar position='fixed' id='header' className={"header"}>
                    <div className={"main"}>
                        <Grid container justify={"space-between"} alignItems={"center"}>
                            <Grid item xs={2}>
                                <Link to={"/pts/"} className="app-logo">
                                    <div style={{display: "flex"}}>
                                        <img src={LogoSm} alt="logo" className={classes.img}
                                             style={{width: "20%", height: "100%"}} id={"main-logo"}/>
                                        <div style={{padding: "5px 0", margin: "0 10px"}}>
                                            <div style={{
                                                width: "3px",
                                                height: "100%",
                                                background: "#FFFFFF",
                                                borderRadius: "15px"
                                            }}
                                                 className={classes.responsiveVisible}>
                                            </div>
                                        </div>
                                        <div style={{display: "flex", alignItems: "center"}}
                                             className={classes.responsiveVisible}>
                                            <h2 style={{margin: "0", fontFamily: "Pacifico"}}>PhotoShare</h2>
                                        </div>
                                    </div>
                                </Link>
                            </Grid>
                            <Grid item xs={3} className={classes.responsiveVisible}>
                                <Grid container justify={"flex-start"} alignItems={"flex-end"}
                                      style={{background: "white", borderRadius: "5px", padding: "3px"}}
                                      id={"top-searchbar"}>
                                    <Grid item xs={1} style={{
                                        color: "rgba(21,21,23,.95)",
                                        background: "transparent",
                                        paddingLeft: "5px",
                                        paddingRight: "5px"
                                    }}>
                                        <MdSearch style={{fontSize: "1.5em"}}/>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Input
                                            style={{
                                                background: "transparent",
                                                width: "100%",
                                                marginRight: "10px",
                                            }} placeholder={"Photos, people"}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={9} md={2} className={"nav-actions"}>
                                <IconButton href='#/pts/upload'>
                                    <CloudUpload/>
                                </IconButton>
                                <IconButton href='#/pts/explorer'>
                                    <Explore/>
                                </IconButton>
                                <IconButton>
                                    <Notifications/>
                                </IconButton>
                                <IconButton onClick={this.handleClick}
                                            style={{paddingBottom: "3px", paddingTop: "3px"}}>
                                    <Avatar style={{border: "3px solid white"}}>
                                        <img
                                            src={"https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/29597226_601217733565084_99387188199077288_n.jpg?_nc_cat=1&_nc_ht=scontent.fhan2-3.fna&oh=5447367bdf5e22e371ddc90574e776fc&oe=5C446BCC"}
                                            style={{height: '100%', width: 'auto'}}
                                            alt="avatar"/>
                                    </Avatar>
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={this.handleClose}
                                    PaperProps={{
                                        style: {
                                            width: 120,
                                            paddingTop: 0,
                                            paddingBottom: 0
                                        }
                                    }}>
                                    <MenuItem onClick={this.redirectProfile}>Profile</MenuItem>
                                    <MenuItem onClick={this.logout}>Logout</MenuItem>
                                </Menu>
                            </Grid>
                        </Grid>
                    </div>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(Header)