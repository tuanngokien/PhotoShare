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
import { NavLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ImageBox from '../components/imageBox/ImageBox.js';
import {Col, Row} from 'react-grid-system';
import PostContainer from '../components/dashboard/postContainer.js';

const photo = [
  {index: 0, src: 'https://source.unsplash.com/I1ASdgphUH4/800x599'},
  {index: 1,src: IMG_3958},
  {index: 2,src: 'https://source.unsplash.com/PpOHJezOalU/800x599'}
]
const photo1 = [
  {index: 0, src: back}
]
const photo2 = [
  {index: 0, src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599'}
]
const photo3 = [
  {index: 0, src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799'},
  {index: 1, src: 'https://source.unsplash.com/qDkso9nvCg0/600x799'}
]
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
      <div className='dashboard-background'>
        <div className='container'>
        <Row>
          <Col xs={12} sm={6} >
            <PostContainer photo={photo}/>
            <PostContainer photo={photo1}/>
          </Col>
          <Col xs={12} sm={6}>
            <PostContainer photo={photo2}/>
            <PostContainer photo={photo3}/>
          </Col>
          </Row>
        </div>
      </div>
    )
  }
}