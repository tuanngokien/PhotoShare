import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Comment from '@material-ui/icons/Comment';
import IconButton from '@material-ui/core/IconButton';
import IMG_3958 from '../assets/img/IMG_3958.JPG';
import back from '../assets/img/back.png';
import Dialog from '../components/dialogImage/Dialog.js';
import { NavLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ImageBox from '../components/imageBox/ImageBox.js';
import {Col, Row} from 'react-grid-system';

export default class Dashboard extends Component{
  constructor(props) {
    super(props);

    this.state = {
      favourite: false,
      isOpenImgBox: false,
      currentImage: 0,
    };
    this.onHandleLike = this.onHandleLike.bind(this);
    this.openImgBox = this.openImgBox.bind(this);
    this.closeImgBox = this.closeImgBox.bind(this);
  }
  onHandleLike = () => {
    this.setState({ favourite: !this.state.favourite });
  }
  openImgBox = () => {
    this.setState({
      isOpenImgBox: true,
      currentImage: 0,
    });
  }
  closeImgBox = () => {
    this.setState({ isOpenImgBox: false });
  }
  render(){
    const favourite = this.state.favourite;
    return(
      <div className='container'>
      <Row>
        <Col xs={12} sm={6} >
          <Paper style={{margin: '4%'}}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe">
                      <img src={IMG_3958} style={{width: '100%', height: '100%'}}/>
                    </Avatar>
                  }
                  title="Đỗ Tuấn Anh"
                  subheader="September 14, 2018"
                />
                <ListItem dense button style={{padding: 'unset'}} onClick={this.openImgBox}>
                <img src={IMG_3958} style={{width: '100%', height: '100%'}}/>
                  <ImageBox isOpen={this.state.isOpenImgBox}
                            isClose={this.closeImgBox.bind(this)}
                            currentImage={this.state.currentImage}
                  />
                </ListItem>
                <ListItem dense button style={{padding: 'unset'}} onClick={this.openImgBox}>
                <img src={IMG_3958} style={{width: '100%', height: '100%'}}/>
                  <ImageBox isOpen={this.state.isOpenImgBox}
                            isClose={this.closeImgBox.bind(this)}
                            currentImage={this.state.currentImage}
                  />
                </ListItem>
                <CardContent>
                  <Typography component="p">
                    Rét quá
                  </Typography>
                </CardContent>
                <CardActions disableActionSpacing>
                  <IconButton aria-label="Add to favorites" onClick= {this.onHandleLike}>
                    <FavoriteIcon style = {{color : favourite ? ('red'): null}}/>
                  </IconButton>
                  <IconButton aria-label="Share">
                    <Comment />
                  </IconButton>
                  <IconButton aria-label="Share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Paper>

            <Paper style={{margin: '4%'}}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe">
                      <img src={IMG_3958} style={{width: '100%', height: '100%'}}/>
                    </Avatar>
                  }
                  title="Đỗ Tuấn Anh"
                  subheader="September 14, 2018"
                />
                <ListItem dense button style={{padding: 'unset'}} onClick={this.openImgBox}>
                  <img src={IMG_3958} style={{width: '100%', height: '100%'}}/>
                  <ImageBox isOpen={this.state.isOpenImgBox}
                            isClose={this.closeImgBox.bind(this)}
                            currentImage={this.state.currentImage}
                  />
                </ListItem>
                <CardContent>
                  <Typography component="p">
                    Rét quá
                  </Typography>
                </CardContent>
                <CardActions disableActionSpacing>
                  <IconButton aria-label="Add to favorites" onClick= {this.onHandleLike}>
                    <FavoriteIcon style = {{color : favourite ? ('red'): null}}/>
                  </IconButton>
                  <IconButton aria-label="Share">
                    <Comment />
                  </IconButton>
                  <IconButton aria-label="Share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Paper>
        </Col>
        <Col >
          <Paper style={{margin: '4%'}}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe">
                      <img src={IMG_3958} style={{width: '100%', height: '100%'}}/>
                    </Avatar>
                  }
                  title="Đỗ Tuấn Anh"
                  subheader="September 14, 2018"
                />
                <ListItem dense button style={{padding: 'unset'}} onClick={this.openImgBox}>
                  <img src={back} style={{width: '100%', height: '100%'}}/>
                  <ImageBox isOpen={this.state.isOpenImgBox}
                            isClose={this.closeImgBox.bind(this)}
                            currentImage={this.state.currentImage}
                  />
                </ListItem>
                <CardContent>
                  <Typography component="p">
                    Rét quá
                  </Typography>
                </CardContent>
                <CardActions disableActionSpacing>
                  <IconButton aria-label="Add to favorites" onClick= {this.onHandleLike}>
                    <FavoriteIcon style = {{color : favourite ? ('red'): null}}/>
                  </IconButton>
                  <IconButton aria-label="Share">
                    <Comment />
                  </IconButton>
                  <IconButton aria-label="Share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Paper>

            <Paper style={{margin: '4%'}}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe">
                      <img src={IMG_3958} style={{width: '100%', height: '100%'}}/>
                    </Avatar>
                  }
                  title="Đỗ Tuấn Anh"
                  subheader="September 14, 2018"
                />
                <ListItem dense button style={{padding: 'unset'}} onClick={this.openImgBox}>
                  <img src={IMG_3958} style={{width: '100%', height: '100%'}}/>
                  <ImageBox isOpen={this.state.isOpenImgBox}
                            isClose={this.closeImgBox.bind(this)}
                            currentImage={this.state.currentImage}
                  />
                </ListItem>
                <CardContent>
                  <Typography component="p">
                    Rét quá
                  </Typography>
                </CardContent>
                <CardActions disableActionSpacing>
                  <IconButton aria-label="Add to favorites" onClick= {this.onHandleLike}>
                    <FavoriteIcon style = {{color : favourite ? ('red'): null}}/>
                  </IconButton>
                  <IconButton aria-label="Share">
                    <Comment />
                  </IconButton>
                  <IconButton aria-label="Share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Paper>
        </Col>
        </Row>
      </div>
    )
  }
}