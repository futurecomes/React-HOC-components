import { createSelector } from 'reselect'

export const numSectionsSelector = createSelector(
    state => state.editor.present.totalTimeSeconds,
    state => state.editor.present.latestSnippetTime,
    state => state.editor.present.secondsPerSection,
    (totalTimeSeconds, latestSnippetTime, secondsPerSection) =>
        totalTimeSeconds > latestSnippetTime
            ? Math.ceil(totalTimeSeconds / secondsPerSection)
            : Math.ceil(latestSnippetTime / secondsPerSection),
)

export const sectionWidthSelector = createSelector(
    state => state.editor.present.pixelsPerSecond,
    state => state.editor.present.secondsPerSection,
    (pixelsPerSecond, secondsPerSection) => pixelsPerSecond * secondsPerSection,
)

export const totalWidthSelector = createSelector(
    sectionWidthSelector,
    numSectionsSelector,
    (sectionWidth, numSections) => sectionWidth * numSections,
)

export const getItemsInBasketSelector = createSelector(
    state => state.billing.freeMusicBasket.data,
    state => state.recording.freeMusic,
    (freeMusicBasket, freeMusics) =>
        freeMusicBasket.map(id => freeMusics.find(freeMusic => freeMusic.id === id)),
)
