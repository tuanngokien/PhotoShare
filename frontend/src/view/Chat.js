import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IMG_3958 from '../assets/img/IMG_3958.JPG';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

export default class Chat extends Component{
    render(){
      return(
        <div className='container'>
          <Grid container spacing={40} container justify={"center"} alignItems={"center"}>
            <Grid item xs={12} sm={9} >
              <List>
                {[0,1,2,3,5,6,7,8,9,1,1,1,1].map(value =>(
                  <ListItem dense>
                  <Avatar aria-label="Recipe">
                    <img src={IMG_3958} style={{width: '100%', height: '100%'}}/>
                  </Avatar>
                  <ListItemText primary="Nguyễn Trung Hiếu" secondary="@hieuabc123"/>
                  <Button variant="outlined"
                          style={{borderColor: "black", color: "black", padding: "0 15px"}}>
                    <Icon style={{marginRight: "5px"}}>add_plus</Icon>
                    <span>Follow</span>
                  </Button>
                </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </div>
      )
    }
}