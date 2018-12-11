import React from "react";
import {Dropdown} from 'semantic-ui-react';
import CameraIcon from "../../assets/img/icons8-instagram-old-24.png";

let results = [
    {
        text: 'Jenny Hess',
        value: '1',
        description: "@jenny",
        image: {
            avatar: true,
            src: 'https://scontent-hkg3-2.cdninstagram.com/vp/6f96e7097d8163ee1fefb6a9b3db7c53/5C64433E/t51.2885-19/10957309_939315289448043_1331377706_a.jpg'
        },
    },
    {
        text: 'Tuan Pham',
        value: '2',
        description: "@tuanngokien",
        image: {
            avatar: true,
            src: 'https://instagram.fhan2-4.fna.fbcdn.net/vp/06568b44d9b25eb2ac6e952367a3a705/5CACEF06/t51.2885-19/s150x150/44535573_2084481671573328_5592610708647837696_n.jpg'
        },
    },
    {
        text: 'Trang Le',
        value: '3',
        description: "@trangle",
        image: {
            avatar: true,
            src: 'https://instagram.fhan2-4.fna.fbcdn.net/vp/c0a813cbf113bb12505d14b6a82ba063/5CB2714E/t51.2885-19/s150x150/44731199_947005522162053_4429453171693191168_n.jpg'
        },
    },
    {
        text: 'Pham Huong',
        value: '4',
        description: "@huongpham",
        image: {
            avatar: true,
            src: 'https://instagram.fhan2-4.fna.fbcdn.net/vp/b923f6fd88f10ed630833746e2fbc242/5CB10A43/t51.2885-19/s150x150/47138374_306632983519052_7650790712274845696_n.jpg'
        },
    },
];

export default class SearchBar extends React.Component {
    state = {
        query: "",
        searchResults: [],
        inputFocus: false
    };

    componentDidMount() {
        // this.dropdownMenu.style
    }

    onFocus = () => {
        this.setState({inputFocus: true})
    };

    onBlur = () => {
        this.setState({inputFocus: false})
    };

    onChange = (event, data) => {
        let searchQuery = data.searchQuery;
        this.setState({query: searchQuery});
        if (searchQuery.length > 1) {
            setTimeout(() => {
                let searchResults = [{
                    text: `#${searchQuery}`,
                    value: `${searchQuery}`,
                    image: {
                        avatar: true,
                        src: CameraIcon
                    }
                }, ...results];
                this.setState({searchResults});
            }, 200);
        }
    };

    onItemClick = (event, data) => {
        let {text, value} = data;
        if (text[0] === "#") {
            window.location.href = `/#/pts/search?q=${value}`;
        } else {
            window.location.href = `/#/pts/profile/${value}`;
        }
        this.setState({inputFocus: false, searchResults: [], query: ""})
    };

    render() {
        return (
            <Dropdown button className='icon search-input' labeled icon='search' fluid floating search
                      text='Photos, people' open={this.state.inputFocus && this.state.searchResults.length > 0}
                      onSearchChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} id={"top-searchbar"}
                      searchQuery={this.state.query}>
                <Dropdown.Menu>
                    {this.state.searchResults.map(option => <Dropdown.Item key={option.value} {...option} onClick={this.onItemClick}/>)}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
};