import React from 'react';
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
import IMG_3958 from '../../assets/img/IMG_3958.JPG';
import ListItem from '@material-ui/core/ListItem';

export default class postContainer extends React.Component{
	constructor(props){
		super(props);
	}
	render (){
		console.log(this.props.photo);
		return(
			<Paper style={{marginBottom: '15%', marginLeft: '7%', marginRight:'7%'}}>
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
	        {this.props.photo.map( photo =>(                
	        <ListItem dense button style={{padding: 'unset', marginBottom:'1%'}}>
	          <img src={photo.url} style={{width: '100%', height: '100%'}}/>
	        </ListItem>))}
	        <CardContent>
	          <Typography component="p">
	            Rét quá
	          </Typography>
	        </CardContent>
	        <CardActions disableActionSpacing>
	          <IconButton aria-label="Add to favorites" onClick= {this.onHandleLike}>
	            <FavoriteIcon/>
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
		)
	}
}
