import React from "react";
import {Dropdown, Icon} from 'semantic-ui-react';
import Avatar from "@material-ui/core/Avatar";

const HeaderAvatar = () => {
    return (
        <Avatar style={{border: "3px solid white", width: "38px", height: "38px"}}>
            <img
                src={localStorage.getItem('avatar')}
                style={{height: '100%', width: 'auto'}}
                alt="avatar"/>
        </Avatar>
    );
};

export default class DropdownAvatar extends React.Component {

    logout = () => {
        window.localStorage.clear()
    }

    render() {
        let linkProfile = "/#/pts/profile/" + localStorage.getItem('id');
        return (
            <Dropdown trigger={<HeaderAvatar/>} className={"dropdown-avatar"} direction={"left"} floating>
                <Dropdown.Menu>
                    <Dropdown.Item
                        as={"a"}
                        href={linkProfile}
                        text={<div>
                            <h5><strong style={{fontSize: "1.2em"}}>{localStorage.getItem('name')}</strong></h5>
                            <p>@{localStorage.getItem('username')}</p>
                        </div>}
                        id={"avatar-header"}
                    />
                    <Dropdown.Item as={"a"} href={"/#/pts/edit"}text={"Settings"} icon={"setting"}/>
                    <Dropdown.Item as={"a"} href={"/#/form"} text={"Sign Out"} icon={"sign out"} onClick={this.logout}/>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}
