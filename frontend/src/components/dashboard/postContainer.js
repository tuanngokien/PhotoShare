import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ImageBox from './../imageBox/ImageBox.js';
import {FaRegHeart, FaHeart, FaRegComment, FaRegPaperPlane} from "react-icons/fa";

export default class postContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openImgBox: false,
            currentImage: 0,
        };
        this.openImgBox = this.openImgBox.bind(this);
        this.closeImgBox = this.closeImgBox.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
    }

    openImgBox = (e, index) => {
        this.setState({openImgBox: true});
        this.setState({currentImage: index})
    };

    closeImgBox() {
        this.setState({openImgBox: false});
    }

    gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1
        });
    }

    gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1
        });
    }

    render() {
        const {postId, fullName, username, avatar, photos} = this.props;
        return (
            <div style={{marginBottom: '10%', marginLeft: '5%', marginRight: '5%'}}>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" style={{width: "2.3em", height: "2.3em"}}>
                                <img src={avatar} style={{width: '100%', height: '100%'}}/>
                            </Avatar>
                        }
                        title={<p style={{margin: 0, fontWeight: "bold", fontSize: "1.15em"}}>{fullName}</p>}
                        subheader={"September 14, 2018"}
                        style={{paddingBottom: "10px"}}
                    />
                    {photos.map(photo => (
                        <ListItem dense button style={{padding: 'unset', marginBottom: '1%'}}
                                  onClick={(e) => this.openImgBox(e, photo.id)}>
                            <img src={photo.src} style={{
                                width: '100%',
                                height: '100%',
                                maxHeight: "600px",
                                objectFit: "cover",
                            }}/>
                        </ListItem>
                    ))
                    }
                    <ImageBox
                        isOpen={this.state.openImgBox}
                        isClose={this.closeImgBox.bind(this)}
                        gotoPrevious={this.gotoPrevious.bind(this)}
                        gotoNext={this.gotoNext.bind(this)}
                        currentImage={this.state.currentImage}
                        images={this.props.photo}
                    />
                    <CardActions disableActionSpacing style={{paddingTop: "3px"}}>
                        <IconButton aria-label="Add to favorites" onClick={this.onHandleLike}>
                            <FaRegHeart/>
                            {/*<FaHeart style={{color: "#dc3545"}}/>*/}
                        </IconButton>
                        <IconButton aria-label="Share">
                            <FaRegComment/>
                        </IconButton>
                        <IconButton aria-label="Share">
                            <FaRegPaperPlane/>
                        </IconButton>
                    </CardActions>
                </Card>
            </div>
        )
    }
}
