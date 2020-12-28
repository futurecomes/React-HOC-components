import { createSelector } from 'reselect'

export const xPositionSelector = createSelector(
    state => state.editor.present.pixelsPerSecond,
    (_state, item) => item.timelineOffset,
    (pixelsPerSecond, timelineOffset) => pixelsPerSecond * timelineOffset,
)

export const maxWidthSelector = createSelector(
    state => state.editor.present.pixelsPerSecond,
    (_state, item) => item.duration,
    (pixelsPerSecond, duration) => duration / 1000 * pixelsPerSecond,
)

export const canFadeSelector = createSelector(
    item => item.isAd,
    item => item.playDuration,
    (isAd, playDuration) => !isAd && playDuration >= 10,
)

export const widthSelector = createSelector(
    state => state.editor.present.pixelsPerSecond,
    (_state, item) => item.playDuration,
    (pixelsPerSecond, playDuration) => playDuration * pixelsPerSecond,
)

export const linePointsSelector = createSelector(
    (_state, item) => item.points,
    widthSelector,
    (points, width) =>
        points.map(point => {
            const xCoord = width * point.xPercent
            return `${xCoord} ${point.yPoint}`
        }),
)

export const canTrimSelector = createSelector(
    state => state.editorMeta.isTrimMode,
    (_state, item) => item.trim,
    (_state, item) => item.isAd,
    (isTrimMode, trim, isAd) => isTrimMode && trim && trim.isTrimming && !isAd,
)
