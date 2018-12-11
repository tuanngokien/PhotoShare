import React from "react";
import {Dropdown, Icon} from 'semantic-ui-react';
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default class DropdownPostContainer extends React.Component {
    render() {
        let {fullName, username}= {fullname:localStorage.getItem('name'), username:localStorage.getItem('username')};
        return (
            <Dropdown trigger={<MoreVertIcon/>} className={"dropdown-avatar"} direction={"left"} floating>
                <Dropdown.Menu>
                    <Dropdown.Item
                        as={"a"}
                        href={"/#/pts/profile/1"}
                        text={<div>
                            <h5><strong style={{fontSize: "1em"}}>Privacy</strong></h5>
                        </div>}
                        id={"avatar-header"}
                    />
                    <Dropdown.Item as={"a"} text={"Private"} icon={"privacy"}/>
                    <Dropdown.Item as={"a"} text={"Friends"} icon={"users"}/>
                    <Dropdown.Item as={"a"} text={"Public"} icon={"eye"}/>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}
