import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IMG_3958 from '../assets/img/IMG_3958.JPG';

export default class Chat extends Component{
    render(){
      return(
        <div className='container'>
          <Grid container spacing={40}>
            <Grid item xs={12} sm={4}>
              <List>
                {[0,1,2,3,5,6,7,8,9,1,1,1,1].map(value =>(
                  <ListItem dense button>
                  <Avatar aria-label="Recipe">
                    <img src={IMG_3958} style={{width: '100%', height: '100%'}}/>
                  </Avatar>
                  <ListItemText primary="Nguyễn Trung Hiếu" secondary="Active now"/>
                </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} sm={8}>
              Chat box
            </Grid>
          </Grid>
        </div>
      )
    }
}