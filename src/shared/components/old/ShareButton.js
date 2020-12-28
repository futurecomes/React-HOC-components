import React, { Component } from 'react';

import shareButtonHover from './svg/shareButtonHover.svg';
import shareButtonIdle from './svg/shareButtonIdle.svg';

import { CirleButtonWithIcon, CirleButtonIcon } from './styled';

export default class ShareButton extends Component {
    state = {
        isHover: false,
    };
    onHover = () => {
        this.setState({ isHover: !this.state.isHover });
    };

    render() {
        return (
            <CirleButtonWithIcon onMouseEnter={this.onHover} onMouseLeave={this.onHover} onClick={this.props.onClick}>
                {this.state.isHover ? (
                    <CirleButtonIcon src={shareButtonHover} alt="Share Button Hovered" />
                ) : (
                    <CirleButtonIcon src={shareButtonIdle} alt="Share Button Idle" />
                )}
            </CirleButtonWithIcon>
        );
    }
}
