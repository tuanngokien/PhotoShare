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

export default class Dashboard extends Component{
  constructor(props) {
    super(props);

    this.state = {
      favourite: false,
    };
    this.onHandleLike = this.onHandleLike.bind(this);
  }
  onHandleLike = () => {
    this.setState({ favourite: !this.state.favourite });
  }
  render(){
    const favourite = this.state.favourite;
    return(
      <div className='container'>
        <Grid container spacing={40}>
          <Grid item xs={12} sm={6}>
            <Paper>
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
                <CardMedia
                  image={IMG_3958}
                  style={{paddingTop: '60%', height: '100%'}}
                />
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe">
                      H
                    </Avatar>
                  }
                  title="Nguyễn Trung Hiếu"
                  subheader="September 14, 2018"
                />
                <CardMedia
                  image="/static/images/cards/paella.jpg"
                  style={{paddingTop: '50%'}}
                />
                <CardContent>
                  <Typography component="p">
                    Mưa rồi ae ơi
                  </Typography>
                </CardContent>
                <CardActions disableActionSpacing>
                  <IconButton aria-label="Add to favorites">
                    <FavoriteIcon />
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe">
                      T
                    </Avatar>
                  }
                  title="Trần Mạnh Tùng"
                  subheader="September 14, 2018"
                />
                <CardMedia
                  image="/static/images/cards/paella.jpg"
                  style={{paddingTop: '40%'}}
                />
                <CardContent>
                  <Typography component="p">
                    Mát quá
                  </Typography>
                </CardContent>
                <CardActions disableActionSpacing>
                  <IconButton aria-label="Add to favorites">
                    <FavoriteIcon />
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe">
                      T
                    </Avatar>
                  }
                  title="Ngô Kiên Tuấn"
                  subheader="September 14, 2018"
                />
                <CardMedia
                  image="/static/images/cards/paella.jpg"
                  style={{paddingTop: '40%'}}
                />
                <CardContent>
                  <Typography component="p">
                    Trời nóng quá
                  </Typography>
                </CardContent>
                <CardActions disableActionSpacing>
                  <IconButton aria-label="Add to favorites">
                    <FavoriteIcon />
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe">
                      P
                    </Avatar>
                  }
                  title="Nguyễn Minh Phương"
                  subheader="September 14, 2018"
                />
                <CardMedia
                  image="/static/images/cards/paella.jpg"
                  style={{paddingTop: '40%'}}
                />
                <CardContent>
                  <Typography component="p">
                    Nắng to quá
                  </Typography>
                </CardContent>
                <CardActions disableActionSpacing>
                  <IconButton aria-label="Add to favorites">
                    <FavoriteIcon />
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
          </Grid>
        </Grid>
      </div>
    )
  }
}