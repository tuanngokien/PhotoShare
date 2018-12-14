import React from 'react'
import {Dropdown} from 'semantic-ui-react'
import {humanPrivacyMode} from "../../utils";

const stateOptions = [
    {key: '1', value: '1', text: 'Private'},
    {key: '2', value: '2', text: 'Friend'},
    {key: '3', value: '3', text: 'Public'}
];

export default class Privacy extends React.Component {
    onChange = (e, data) => {
        const value = data.value;
        this.props.onChangePrivacy(value);
    };
    render() {
        const {privacy, disabled} = this.props;
        if (disabled) {
            return (
                <span>{humanPrivacyMode(privacy)}</span>
            )
        } else {
            return (
                <Dropdown placeholder='State' value={privacy} selection options={stateOptions} onChange={this.onChange}/>
            )
        }
    }
}
