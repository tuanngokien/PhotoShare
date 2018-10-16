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
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import ImageGridList from './../components/imageGridList/ImageGridList.js';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
});

export default class Profile extends Component{
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render(){
    return(
      <div>
        <Grid container>
          <Grid items xs={12}>
            <Card>
              <CardMedia
                  image={IMG_3958}
                  style={{paddingTop: '25%', height: '100%'}}
              >
              </CardMedia>
            </Card>
          </Grid>
          <Grid items xs={12}>
            <AppBar position="static" color="default">
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
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
            <div className='containerImageList' style={{height: 'auto'}}>
              <SwipeableViews
                index={this.state.value}
                onChangeIndex={this.handleChangeIndex}
              >
                <TabContainer>
                  <ImageGridList/>
                </TabContainer>
                <TabContainer >Album</TabContainer>
                <TabContainer >Saved</TabContainer>
                <TabContainer >Tagged</TabContainer>
              </SwipeableViews>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}
