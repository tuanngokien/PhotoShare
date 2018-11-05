import React from 'react';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const SearchKeyword = ({keyword, color}) => {
    return (
        <Grid item xs={5} style={{marginRight: "10px", marginBottom: "10px"}}>
            <Button variant="contained" fullWidth style={{
                padding: "0px 10px",
                fontSize: "0.8em",
                backgroundColor: color,
                color: "white",
                fontWeight: "bold",
                textTransform: "lowercase"
            }}>
                {keyword}
            </Button>
        </Grid>
    );
};

class SearchTrendingSidebar extends React.Component {
    render() {
        const {keywordList} = this.props;
        const colors = ["#56bc8a", "#d54c2b", "#f18d16", "#3e93c6", "#748089", "#9b6cba"];
        return (
            <Card>
                <List
                    component="nav"
                    subheader={<ListSubheader component="div"><span
                        style={{fontWeight: "bold"}}>TRENDING SEARCHES</span></ListSubheader>}>
                    <ListItem>
                        <Grid container justify={"center"}>
                            {keywordList.map((keyword, i) =>
                                <SearchKeyword key={i} keyword={keyword} color={colors[i]}/>
                            )}
                        </Grid>
                    </ListItem>
                </List>
            </Card>
        );
    }
}

export default SearchTrendingSidebar;