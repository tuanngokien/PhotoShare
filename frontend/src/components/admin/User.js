import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

const data = [
  {
    id: 1 ,
    username: '@tuananh' ,
    email: 'tuananh@gmail.com',
    joined: '2018',
    post: '5',
    link: 'photoshare/tuananh',
  },
  {
    id: 2 ,
    username: '@tuananh1' ,
    email: 'tuananh@gmail123.com',
    joined: '2018',
    post: '51',
    link: 'photoshare/tuananh1',
  },
  {
    id: 3 ,
    username: '@tuananh3' ,
    email: 'tuananh@gmail321.com',
    joined: '2018',
    post: '15',
    link: 'photoshare/tuananh3',
  },
  {
    id: 4 ,
    username: '@tuananh13' ,
    email: 'tuananh@gmail13.com',
    joined: '2018',
    post: '10',
    link: 'photoshare/tuananh1123',
  },
  {
    id: 5 ,
    username: '@tuananh2786' ,
    email: 'tuananh@gmail1234d.com',
    joined: '2018',
    post: '5',
    link: 'photoshare/tuananh2786',
  },
  {
    id: 6 ,
    username: '@tuananh323223' ,
    email: 'tuananh@gmail32323.com',
    joined: '2018',
    post: '0',
    link: 'photoshare/tuananh32323',
  },
  {
    id: 7 ,
    username: '@tuananh' ,
    email: 'tuananh@gmail.com',
    joined: '2018',
    post: '5',
    link: 'photoshare/tuananh',
  },
  {
    id: 8 ,
    username: '@tuananh1111' ,
    email: 'tuananh@gmail1111.com',
    joined: '2018',
    post: '1',
    link: 'photoshare/tuananh1111',
  },
  {
    id: 9,
    username: '@tuananh12323136' ,
    email: 'tuananh@gmail54335.com',
    joined: '2018',
    post: '99',
    link: 'photoshare/tuananh53453454',
  },
  {
    id: 10 ,
    username: '@tuananh124564457' ,
    email: 'tuananh12456@gmail.com',
    joined: '2018',
    post: '2',
    link: 'photoshare/tuananh1232221',
  },
  {
    id: 11 ,
    username: '@tuananh12335' ,
    email: 'tuananh@gmail134234.com',
    joined: '2018',
    post: '7',
    link: 'photoshare/tuananh12345',
  }
]

export default class Users extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      selected: {},
      selectAll: 0
    };
    this.toggleRow = this.toggleRow.bind(this);
  }

    toggleRow(username) {
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[username] = !this.state.selected[username];
    this.setState({
      selected: newSelected,
      selectAll: 2
    });
  }

  toggleSelectAll() {
    let newSelected = {};

    if (this.state.selectAll === 0) {
      data.map(x => {
        newSelected[x.username] = true;
      });
    }

    this.setState({
      selected: newSelected,
      selectAll: this.state.selectAll === 0 ? 1 : 0
    });
  }

  render(){
    return(
      <ReactTable
        data={data}
        columns={[
          {
            Header: "ID",
            accessor: "id",
            maxWidth: 80
          },
          {
            Header: "User Name",
            accessor: "username",
            maxWidth: 200
          },
          {
            Header: "Email",
            accessor: "email",
            maxWidth: 300
          },
          {
            Header: "Joined",
            accessor: "joined",
            maxWidth: 80
          },
          {
            Header: "Post",
            accessor: "post",
            maxWidth: 80
          },
          {
            Header: "Link to profile",
            accessor: "link",
          },
          {
            id: "checkbox",
            accessor: "",
            filterable: false,
            Cell: ({ original }) => {
              return (
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={this.state.selected[original.username] === true}
                  onChange={() => this.toggleRow(original.username)}
                />
              );
            },
            Header: x => {
              return (
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={this.state.selectAll === 1}
                  ref={input => {
                    if (input) {
                      input.indeterminate = this.state.selectAll === 2;
                    }
                  }}
                  onChange={() => this.toggleSelectAll()}
                />
              );
            },
            sortable: false,
            width: 45,
            maxWidth: 100
          },
        ]}
        defaultSorted={[
          {
            id: "age",
            desc: true
          }
        ]}
        defaultPageSize={10}
        filterable
        className="-striped -highlight"
      />
    )
  }
}