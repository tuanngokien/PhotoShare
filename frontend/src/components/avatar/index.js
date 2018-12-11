import React from "react";
import {Dropdown, Icon} from 'semantic-ui-react';
import Avatar from "@material-ui/core/Avatar";

const HeaderAvatar = () => {
    return (
        <Avatar style={{border: "3px solid white", width: "35px", height: "35px"}}>
            <img
                src={"https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/29597226_601217733565084_99387188199077288_n.jpg?_nc_cat=1&_nc_ht=scontent.fhan2-3.fna&oh=5447367bdf5e22e371ddc90574e776fc&oe=5C446BCC"}
                style={{height: '100%', width: 'auto'}}
                alt="avatar"/>
        </Avatar>
    );
};

export default class DropdownAvatar extends React.Component {
    render() {
        let {fullName, username}= {fullName: "Ngô Kiên Tuấn", username: "ngokientuan"};
        return (
            <Dropdown trigger={<HeaderAvatar/>} className={"dropdown-avatar"} direction={"left"} floating>
                <Dropdown.Menu>
                    <Dropdown.Item
                        as={"a"}
                        href={"/#/pts/profile/1"}
                        text={<div>
                            <h5><strong style={{fontSize: "1.2em"}}>{fullName}</strong></h5>
                            <p>@{username}</p>
                        </div>}
                        id={"avatar-header"}
                    />
                    <Dropdown.Item as={"a"} href={"/#/pts/profile/1"} text={"Profile"} icon={"user outline"}/>
                    <Dropdown.Item as={"a"} href={"/#/pts/settings"}text={"Settings"} icon={"setting"}/>
                    <Dropdown.Item as={"a"} href={"/#/pts/signout"}text={"Sign Out"} icon={"sign out"}/>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}
