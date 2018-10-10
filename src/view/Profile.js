import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import 'react-tabs/style/react-tabs.css';
import IMG_3958 from '../assets/img/IMG_3958.JPG';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default class Profile extends Component{
  render(){
    return(
      <div>
        <Grid container spacing={40}>
          <Grid items xs={12}>
            <Card>
              <CardMedia
                  image={IMG_3958}
                  style={{paddingTop: '20%', height: '30%'}}
              >
              <Avatar style={{marginLeft: '10%', marginBottom: '1%', width: '10%'}}>
                <img/>
              </Avatar>
              </CardMedia>
            </Card>
          </Grid>
          <Grid items xs={12}>
            <AppBar position="static" color="default">
              <Tabs
                value="fdmck"
                indicatorColor="primary"
                textColor="primary"
                fullWidth
              >
                <Tab label="Post" />
                <Tab label="Album" />
                <Tab label="Saved" />
                <Tab label="Tagged" />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </div>
    )
  }
}
