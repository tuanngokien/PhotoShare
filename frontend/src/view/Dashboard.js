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
import {NavLink} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ImageBox from '../components/imageBox/ImageBox.js';
import {Col, Row} from 'react-grid-system';
import PostContainer from '../components/dashboard/postContainer.js';
import FollowSidebar from '../components/dashboard/followSidebar';
import SearchTrendingSidebar from '../components/dashboard/searchTrendingSidebar';

const photo = [
    {index: 0, src: 'https://source.unsplash.com/I1ASdgphUH4/800x599'},
]
const photo1 = [
    {index: 1, src: 'https://source.unsplash.com/qDkso9nvCg0/600x799'}
]
const photo2 = [
    {index: 0, src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599'}
]
const photo3 = [
    {index: 0, src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799'},
]

const followList = [
    {
        avatar: "https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-9/15940961_1305387346150830_9109933383207995776_n.jpg?_nc_cat=103&_nc_ht=scontent.fhan2-1.fna&oh=a427c411f4c168d4fd57b4d88743dfc8&oe=5C42A370",
        username: "buibichphuong",
        fullName: "Bùi Bích Phương"
    },
    {
        avatar: "https://scontent.fhan2-2.fna.fbcdn.net/v/t1.0-9/17795903_10155370309058159_7161832026438883050_n.jpg?_nc_cat=111&_nc_ht=scontent.fhan2-2.fna&oh=8fbc21bb1bcfc1664ddb818797d6b637&oe=5C7DF757",
        username: "haanhtuan",
        fullName: "Hà Anh Tuấn"
    },
    {
        avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/29597226_601217733565084_99387188199077288_n.jpg?_nc_cat=1&_nc_ht=scontent.fhan2-3.fna&oh=5447367bdf5e22e371ddc90574e776fc&oe=5C446BCC",
        username: "phuongly",
        fullName: "Phương Ly"
    },
    {
        avatar: "https://scontent.fhan2-2.fna.fbcdn.net/v/t31.0-8/24172981_1743826118962867_1356190298731916020_o.jpg?_nc_cat=108&_nc_ht=scontent.fhan2-2.fna&oh=b279fe04d349cade6ae304521ff432f3&oe=5C73C70F",
        username: "justatee",
        fullName: "JustaTee"
    },
    {
        avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/44939825_2074692405926187_4650992562687967232_n.jpg?_nc_cat=1&_nc_ht=scontent.fhan2-3.fna&oh=5e9812a7978aba332c11ff48bca0eb55&oe=5C70EBC0",
        username: "junvu95",
        fullName: "Vũ Phương Anh"
    },
];

const keywordList = [
    "The Walking Dead",
    "Miss Earth 2018",
    "League Of Legends",
    "Rihana",
    "Apple Iphone Xs",
    "Chelsea FC"
];

export default class Dashboard extends Component {
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
        this.setState({favourite: !this.state.favourite});
    }
    openImgBox = () => {
        this.setState({
            isOpenImgBox: true,
            currentImage: 0,
        });
    }
    closeImgBox = () => {
        this.setState({isOpenImgBox: false});
    }

    render() {
        const favourite = this.state.favourite;
        return (
            <div className='dashboard-background'>
                <div className='container'>
                    <Row>
                        <Col xs={12} sm={9}>
                            <Row>
                                <Col xs={12} sm={6} style={{padding: 0}}>
                                    <PostContainer photo={photo}/>
                                    <PostContainer photo={photo1}/>
                                </Col>
                                <Col xs={12} sm={6} style={{padding: 0}}>
                                    <PostContainer photo={photo2}/>
                                    <PostContainer photo={photo3}/>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} sm={3} style={{padding: 0}}>
                            <FollowSidebar followList={followList}/>
                            <SearchTrendingSidebar keywordList={keywordList}/>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}