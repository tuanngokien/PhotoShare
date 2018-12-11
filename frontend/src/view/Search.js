import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import 'react-tabs/style/react-tabs.css';
import SearchContainer from "../container/pages/SearchContainer";
const queryString = require('query-string');

class Search extends Component {
    state = {
        value: 0,
    };

    componentDidMount() {
        let header = document.getElementById("header");
        let searchContainer = document.getElementById("search-page-container");
        searchContainer.style.marginTop = header.clientHeight + "px";
    }

    render() {
        let query = queryString.parse(this.props.location.search).q;
        return (
            <div>
                <Grid container id={"search-page-container"}>
                    <Grid item xs={12} className={"search-container"}>
                        <SearchContainer query={query}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Search;
