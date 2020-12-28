import React from 'react';
import container from 'src/containers/editor/TimelinePointer';

import { css } from 'src/styles/old';
import styles from './styles';

/* eslint-disable*/
export class TimelinePointer extends React.Component {
    render() {
        const { currentTimelineTime, pixelsPerSecond, width, isDropWarningVisible } = this.props;
        const offset = currentTimelineTime * pixelsPerSecond;
        return (
            <div
                className={css(styles.svgContainer)}
                css={{ width: `${width}px`, zIndex: isDropWarningVisible ? 1 : 10 }}
            >
                <svg height="100%" width={`${width}px`}>
                    <line x1={offset} y1="0%" x2={offset} y2="100%" css={{ stroke: '#ff4040', strokeWidth: '2' }} />
                </svg>
            </div>
        );
    }
}

export default container(TimelinePointer);
