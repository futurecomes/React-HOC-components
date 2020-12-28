import React from 'react';
import { fromEvent, merge } from 'rxjs';
import { mergeMap, map, takeUntil } from 'rxjs/operators';

import { css } from 'src/styles/old';
import styles from './TrimBlockStyles';

import arrowSrc from './static/svg/arrow.svg';
import scissorsSrc from './static/svg/scissors.svg';
import { secondsToMinutes } from './helpers';
import * as S from './styled';

const ARROW_WIDTH = 16;

function isColliding(arrow, position, opposedArrowPosition) {
    if (arrow === 'arrowLeft' && position > opposedArrowPosition) {
        return true;
    }

    if (arrow === 'arrowRight' && position < opposedArrowPosition) {
        return true;
    }
    return false;
}

function isOutsideOfClip(position, width) {
    if (position <= 0 || position >= width) {
        return true;
    }

    return false;
}

class TrimBlock extends React.Component {
    componentDidMount() {
        const { arrowLeftRef, arrowRightRef } = this;

        this.mouseup = fromEvent(document, 'mouseup');
        this.mousemove = fromEvent(document, 'mousemove');
        const mousedownLeft = fromEvent(arrowLeftRef.current, 'mousedown');
        const mousedownRight = fromEvent(arrowRightRef.current, 'mousedown');

        const composed = merge(mousedownLeft, mousedownRight);
        const mousedrag = composed.pipe(mergeMap(this.onMouseDrag));
        mousedrag.subscribe(this.onSubscribe);
    }

    arrowLeftRef = React.createRef();
    arrowRightRef = React.createRef();

    onMouseDrag = md => {
        const { arrow } = md.currentTarget.dataset;
        const currentArrow = arrow === 'left' ? 'arrowLeft' : 'arrowRight';
        const opposedArrowDirection = arrow === 'left' ? 'arrowRight' : 'arrowLeft';
        const startX = md.clientX + window.scrollX;
        const arrowX = this.props.trim[currentArrow];

        return this.mousemove.pipe(
            map(mm => {
                mm.preventDefault();

                const position = arrowX + mm.clientX - startX;

                return {
                    position,
                    arrowDirection: arrow,
                    currentArrow,
                    opposedArrowDirection,
                };
            }),
            takeUntil(this.mouseup),
        );
    };

    onSubscribe = data => {
        const { trim, width } = this.props;
        const { position, opposedArrowDirection, currentArrow } = data;

        const opposedArrowPosition = trim[opposedArrowDirection];

        if (isOutsideOfClip(position, width)) {
            this.props.setTrim({
                ...trim,
                [currentArrow]: currentArrow === 'arrowLeft' ? 0 : width,
            });
        } else if (isColliding(currentArrow, position, opposedArrowPosition)) {
            this.props.setTrim({
                ...trim,
                [currentArrow]: opposedArrowPosition,
                higher: currentArrow,
            });
        } else {
            this.props.setTrim({
                ...trim,
                [currentArrow]: position,
                higher: currentArrow,
            });
        }
    };

    imageDragStart = e => e.preventDefault();

    imageClick = e => e.stopPropagation();

    render() {
        const { width, timelineOffset, pixelsPerSecond, trim, playDuration } = this.props;
        const { higher, arrowLeft, arrowRight } = trim;

        const isDividerVisible = arrowLeft === arrowRight;
        const isTrimPartVisible = !isDividerVisible && (arrowLeft !== 0 || arrowRight !== playDuration);

        return (
            <React.Fragment>
                <div
                    ref={this.arrowLeftRef}
                    style={{ left: arrowLeft - ARROW_WIDTH / 2, zIndex: higher === 'arrowLeft' && 1 }}
                    className={css(styles.arrow, styles.leftArrow)}
                    data-arrow="left"
                >
                    <img
                        onClick={this.imageClick}
                        src={arrowSrc}
                        alt="left arrow"
                        style={{ width: ARROW_WIDTH }}
                        onDragStart={this.imageDragStart}
                    />
                    <S.TrimTime position="left">
                        {secondsToMinutes(timelineOffset + trim.arrowLeft / pixelsPerSecond)}
                    </S.TrimTime>
                </div>
                <div
                    ref={this.arrowRightRef}
                    style={{ left: arrowRight - ARROW_WIDTH / 2, zIndex: higher === 'arrowRight' && 1 }}
                    className={css(styles.arrow, styles.rightArrow)}
                    data-arrow="right"
                >
                    <img
                        onClick={this.imageClick}
                        src={arrowSrc}
                        alt="right arrow"
                        style={{ width: ARROW_WIDTH }}
                        onDragStart={this.imageDragStart}
                    />
                    <S.TrimTime position="right">
                        {secondsToMinutes(timelineOffset + trim.arrowRight / pixelsPerSecond)}
                    </S.TrimTime>
                </div>
                <div className={css(styles.box)}>
                    <div
                        style={isDividerVisible ? { visibility: 'visible', left: arrowLeft } : {}}
                        className={css(styles.divider)}
                    />
                    <div
                        style={{
                            left: arrowLeft,
                            right: width - arrowRight,
                            visibility: isTrimPartVisible ? 'visible' : 'hidden',
                        }}
                        className={css(styles.trimPart)}
                    >
                        <img style={{ width: '100%', maxWidth: 25 }} src={scissorsSrc} alt="scissors" />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default TrimBlock;
