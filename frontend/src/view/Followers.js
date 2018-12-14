import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Card from '@material-ui/core/Card';
import axios from 'axios';

// const followList = [
//     {
//         avatar: "https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-9/15940961_1305387346150830_9109933383207995776_n.jpg?_nc_cat=103&_nc_ht=scontent.fhan2-1.fna&oh=a427c411f4c168d4fd57b4d88743dfc8&oe=5C42A370",
//         username: "buibichphuong",
//         fullName: "Bùi Bích Phương",
//         following: true
//     },
//     {
//         avatar: "https://scontent.fhan2-2.fna.fbcdn.net/v/t1.0-9/17795903_10155370309058159_7161832026438883050_n.jpg?_nc_cat=111&_nc_ht=scontent.fhan2-2.fna&oh=8fbc21bb1bcfc1664ddb818797d6b637&oe=5C7DF757",
//         username: "haanhtuan",
//         fullName: "Hà Anh Tuấn",
//         following: false
//     },
//     {
//         avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/29597226_601217733565084_99387188199077288_n.jpg?_nc_cat=1&_nc_ht=scontent.fhan2-3.fna&oh=5447367bdf5e22e371ddc90574e776fc&oe=5C446BCC",
//         username: "phuongly",
//         fullName: "Phương Ly",
//         following: true
//     },
//     {
//         avatar: "https://scontent.fhan2-2.fna.fbcdn.net/v/t31.0-8/24172981_1743826118962867_1356190298731916020_o.jpg?_nc_cat=108&_nc_ht=scontent.fhan2-2.fna&oh=b279fe04d349cade6ae304521ff432f3&oe=5C73C70F",
//         username: "justatee",
//         fullName: "JustaTee",
//         following: false
//     },
//     {
//         avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/44939825_2074692405926187_4650992562687967232_n.jpg?_nc_cat=1&_nc_ht=scontent.fhan2-3.fna&oh=5e9812a7978aba332c11ff48bca0eb55&oe=5C70EBC0",
//         username: "junvu95",
//         fullName: "Vũ Phương Anh",
//         following: true
//     },
// ];

export default class Followers extends Component{
    constructor(props) {
      super(props);

      this.state = {
        following: true,
        followList: []
      };
    }

    componentWillMount(){
      this.getFollowers();
    }

    getFollowers = () => {
      var headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      };
      var com = this
      axios.get('/api/' + this.props.match.params.id + '/follows', {headers: headers})
      .then(function(res){
        console.log(res.data);
        com.setState({followList: res.data.followers})
      })
      .catch(function(err){
        console.log(err)
      })
    }

    followChangeState = () => {
      this.setState({following: !this.state.following})
    }

    render(){
      const followList = this.state.followList
      return(
        <div className="container" style={{paddingTop:'6%'}}>
          <Card
            justify={"center"}
            alignItems={"center"}
            >
              <List subheader={<ListSubheader><span style={{fontWeight: "bold"}}>FOLLOWERS</span></ListSubheader>}
                    style={{padding: 'unset'}}
              >
                {followList.map(value =>(
                  <ListItem dense style={{borderBottom: "1px solid #E1E1E1"}}>
                    <Avatar aria-label="Recipe">
                      <img src={value.avatar} style={{width: '100%', height: '100%'}}/>
                    </Avatar>
                    <ListItemText primary={value.username} secondary={value.fullName}/>
                    <Button variant="outlined"
                            style={{borderColor: "black", color: "black", padding: "0 15px"}}
                            onClick= {()=>this.followChangeState()}>
                      {value.following?
                        (
                          <div>
                            <span>Following</span>
                          </div>):
                        (
                          <div>
                            <span>Follow</span>
                          </div>
                        )}
                    </Button>
                </ListItem>
                ))}
              </List>
          </Card>
        </div>
      )
    }
}
