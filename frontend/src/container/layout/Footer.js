import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import {FaFacebook, FaTwitter, FaInstagram} from 'react-icons/fa';

export default class Footer extends Component {
    render() {
        return (
            <AppBar position='static' className='footer'>
                <Toolbar>
                    <Grid container justify={"space-between"} alignItems={"center"} style={{margin: "0 10%"}}>
                        <span>© 2018 PHOTOSHARE</span>
                        <div>
                            <Grid container spacing={32} justify={"flex-start"} alignItems={"center"}>
                                <Grid item>
                                    <a href={"/"}><FaFacebook size="1.3rem" color="white"/></a>
                                </Grid>
                                <Grid item>
                                    <a href={"/"}><FaInstagram size="1.3rem" color="white"/></a>
                                </Grid>
                                <Grid item>
                                    <a href={"/"}><FaTwitter size="1.3rem" color="white"/></a>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    }
}