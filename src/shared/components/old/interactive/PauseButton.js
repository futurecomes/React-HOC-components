import React, { Component } from 'react';

import OnHoverButton from './OnHoverButton';

import pauseSrc from '../shared/static/svg/pause-circle.svg';
import pauseActiveSrc from '../shared/static/svg/pause-circle-active.svg';

import { css } from 'src/styles/old';
import styles from './styles';

class PauseButton extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            isHover: false,
        };

        this.onHover = this.onHover.bind(this);
    }

    onHover(isHover) {
        this.setState({ isHover });
    }

    render() {
        const { isHover } = this.state;

        const { isActive } = this.props;
        return (
            <OnHoverButton onHover={this.onHover} onClick={this.props.onClick} className={this.props.className}>
                <img
                    src={isHover || isActive ? pauseSrc : pauseActiveSrc}
                    alt="Play"
                    style={{ cursor: 'pointer' }}
                    className={css(styles.icon, this.props.isSmall && styles.smallIcon)}
                />
            </OnHoverButton>
        );
    }
}

PauseButton.defaultProps = {
    isSmall: false,
    className: '',
};

export default PauseButton;
