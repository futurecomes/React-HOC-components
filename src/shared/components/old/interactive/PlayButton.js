import React, { Component } from 'react';

import OnHoverButton from './OnHoverButton';

import playSrc from '../shared/static/svg/play-circle.svg';
import playActiveSrc from '../shared/static/svg/play-circle-active.svg';

import { css } from 'src/styles/old';
import styles from './styles';

class PlayButton extends Component {
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
                    src={isHover || isActive ? playActiveSrc : playSrc}
                    alt="Play"
                    style={{ cursor: 'pointer' }}
                    className={css(styles.icon, this.props.isSmall && styles.smallIcon)}
                />
            </OnHoverButton>
        );
    }
}

PlayButton.defaultProps = {
    isSmall: false,
    className: '',
};

export default PlayButton;
