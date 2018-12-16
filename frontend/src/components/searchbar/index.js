import React from "react";
import {Dropdown} from 'semantic-ui-react';
import CameraIcon from "../../assets/img/icons8-instagram-old-24.png";
import axios from 'axios';

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

    search = async (searchQuery) => {
        var headers = {Authorization: 'Bearer ' + localStorage.getItem('token')};
        const res = await axios.get(`/api/search/users?q=${searchQuery}`, {headers: headers});
        return res.data.users;
    };

    onChange = async (event, data) => {
        let searchQuery = data.searchQuery;
        this.setState({query: searchQuery});
        if (searchQuery.length > 3) {
            const results = await this.search(searchQuery);
            const userResults = results.map(r => ({text: r.name, value: r.id, description: "@" + r.username, image: {avatar: true, src: r.avatar}}));
            let searchResults = [{
                    text: `#${searchQuery}`,
                    value: `${searchQuery}`,
                    image: {
                        avatar: true,
                        src: CameraIcon
                    }
                }, ...userResults];
            this.setState({searchResults});
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
                    {this.state.searchResults.map(option => <Dropdown.Item key={option.value} {...option}
                                                                           onClick={this.onItemClick}/>)}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
};