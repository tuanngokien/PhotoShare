import React, { Component } from 'react';
import { render } from 'react-dom';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';

export default class Hover extends Component {
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = {
      isHovering: false,
    };
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    };
  }

  render() {
    return (
      <div>
        <div
          onMouseEnter={this.handleMouseHover}
          onMouseLeave={this.handleMouseHover}
        >
          {this.state.isHovering ?
            <IconButton>
              <MoreHorizIcon style={{opacity: 1}}/>
            </IconButton>
            :
            <IconButton>
              <MoreHorizIcon style={{opacity: 0.1}}/>
            </IconButton>}
        </div>

      </div>
    );
  }
}