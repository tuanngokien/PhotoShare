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
import Icon from "@material-ui/core/Icon/Icon";
import Input from '@material-ui/core/Input';
import StickyBox from "react-sticky-box";

const posts = [
    {
        postId: 1,
        username: "",
        fullName: "Ngô Kiên Tuấn",
        liked: true,
        avatar: "https://scontent-hkg3-2.cdninstagram.com/vp/6f96e7097d8163ee1fefb6a9b3db7c53/5C64433E/t51.2885-19/10957309_939315289448043_1331377706_a.jpg",
        photos: [
            {
                id: 1,
                src: 'https://images.unsplash.com/photo-1521993117367-b7f70ccd029d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=683c7e0153887541062433dfe0677dd3&auto=format&fit=crop&w=1324&q=80'
            }
        ]
    },
    {
        postId: 2,
        username: "",
        fullName: "Đỗ Tuấn Anh",
        liked: false,
        avatar: "https://scontent-hkg3-2.xx.fbcdn.net/v/t1.0-1/p160x160/43092133_1151422405012777_734286631334313984_n.jpg?_nc_cat=108&_nc_ht=scontent-hkg3-2.xx&oh=ba6ed1280d0a2b39a3c7210f9b8ae58d&oe=5C69FE1F",
        photos: [
            {
                id: 2,
                src: 'https://images.unsplash.com/photo-1541985304080-a5e4c227922b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=97c57e7a67165df000ee5b23eba86159&auto=format&fit=crop&w=634&q=80'
            }
        ]
    },
    {
        postId: 3,
        username: "",
        fullName: "Trần Mạnh Tùng",
        liked: true,
        avatar: "https://scontent-hkg3-2.xx.fbcdn.net/v/t1.0-1/p160x160/43405773_309164506549982_2639100151754391552_n.jpg?_nc_cat=103&_nc_ht=scontent-hkg3-2.xx&oh=adfb71a1c496b12136bd3f6b00d41799&oe=5C864EBC",
        photos: [
            {
                id: 3,
                src: 'https://images.unsplash.com/photo-1540206395-a40899915755?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=994dfe6a3da7a7caf0f0ee49fb20214b&auto=format&fit=crop&w=2081&q=80'
            }
        ]
    },
    {
        postId: 4,
        username: "",
        fullName: "Nguyễn Minh Phương",
        liked: false,
        avatar: "https://scontent-hkg3-2.xx.fbcdn.net/v/t1.0-1/p160x160/40790094_1481480935330880_8436778046794498048_n.jpg?_nc_cat=100&_nc_ht=scontent-hkg3-2.xx&oh=53b0576df76a4f8b4e44fc905c9b4d91&oe=5C81CEFA",
        photos: [
            {
                id: 4,
                src: 'https://c1.staticflickr.com/4/3007/5839421567_c436038175_b.jpg',
            }
        ]
    },
    {
        postId: 5,
        username: "",
        fullName: "Nguyễn Trung Hiếu",
        liked: true,
        avatar: "https://scontent-hkg3-2.xx.fbcdn.net/v/t1.0-1/p160x160/44813388_1439705432829822_1911499573319172096_n.jpg?_nc_cat=110&_nc_ht=scontent-hkg3-2.xx&oh=9ae2273c3ac052c7a2f4532802233be0&oe=5C80BC03",
        photos: [
            {
                id: 5,
                src: 'https://c1.staticflickr.com/3/2397/32747864111_4a354d2d7a_b.jpg',
            }
        ]
    },
    {
        postId: 6,
        username: "",
        fullName: "Phương Ly",
        liked: true,
        avatar: "https://scontent-hkg3-2.xx.fbcdn.net/v/t1.0-9/23517516_534566840230174_2745494573450495754_n.jpg?_nc_cat=106&_nc_ht=scontent-hkg3-2.xx&oh=be9257a19b9371a1ff182c6fd28a49df&oe=5C831339",
        photos: [
            {
                id: 5,
                src: 'https://scontent-hkg3-2.cdninstagram.com/vp/03110991ef1e9ae1a18df1934429bb53/5C66FBE8/t51.2885-15/e35/45607214_1161744457310562_4084931356889979267_n.jpg',
            }
        ]
    },
];

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

const keywordList = ["animals", "travel", "nature", "house", "love", "business",];

const splitArray = (array) => {
    const part1 = [];
    const part2 = [];
    let track = true;
    array.map(e => {
        if (track) {
            part1.push(e);
        } else {
            part2.push(e);
        }
        track = !track;
    });
    return [part1, part2];
};

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

    scrollEvent = () => {
        if (window.scrollY > window.innerHeight / 4) {
            this.headerClassList.add('header');
            this.topSearchBar.style.display = "flex";
        } else {
            this.headerClassList.remove('header');
            this.topSearchBar.style.display = "none";
        }
    };

    componentDidMount() {
        this.headerClassList = document.getElementById("header").classList;
        this.headerClassList.remove("header");
        this.headerClassList.add("header-transparent");
        this.topSearchBar = document.getElementById("top-searchbar");
        this.topSearchBar.style.display = "none";
        window.addEventListener("scroll", this.scrollEvent);
    }

    componentWillUnmount() {
        this.headerClassList.remove("header-transparent");
        this.headerClassList.add("header");
        this.topSearchBar.style.display = "flex";
        window.removeEventListener("scroll", this.scrollEvent)
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
        const [postPart1, postPart2] = splitArray(posts);
        return (
            <div className='dashboard-background'>
                <Grid container justify={"center"} alignItems={"center"} className={"jumbotron"}>
                    <div>
                        <Grid container direction={"column"} alignItems={"center"}>
                            <h1 style={{fontWeight: "900", margin: 0, fontSize: "3em"}}>PHOTOSHARE</h1>
                            <h3 style={{margin: "10px 0 30px 0"}}>Gifted by the world’s most generous community of
                                photographers</h3>
                        </Grid>
                        <Grid container justify={"flex-start"} alignItems={"center"} className={"dashboard-searchbar"}>
                            <Grid item style={{color: "rgba(21,21,23,.95)", background: "transparent",}}>
                                <Icon>search</Icon>
                            </Grid>
                            <Grid>
                                <Input
                                    disableUnderline={true}
                                    style={{
                                        background: "transparent",
                                        width: "40vw",
                                        marginRight: "10px"
                                    }} placeholder={"Photos, people"}/>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <div className='container'>
                    <Row>
                        <Col xs={12} md={9.2}>
                            <Row>
                                <Col xs={12} md={6} style={{padding: 0}}>
                                    {postPart1.map(post => {
                                        return <PostContainer key={post.postId} {...post}/>
                                    })}
                                </Col>
                                <Col xs={12} md={6} style={{padding: 0}}>
                                    {postPart2.map(post => {
                                        return <PostContainer key={post.postId} {...post}/>
                                    })}
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} md={2.8} style={{padding: 0}}>
                            <StickyBox offsetTop={100}>
                                <FollowSidebar followList={followList}/>
                                <SearchTrendingSidebar keywordList={keywordList}/>
                            </StickyBox>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}