export const CHANGE_ART_BACKGROUND = 'CHANGE_ART_BACKGROUND'
export const changeArtBackground = payload => ({
    type: CHANGE_ART_BACKGROUND,
    payload,
})

export const OPEN_COLOR_PICKER = 'OPEN_COLOR_PICKER'
export const openColorPicker = payload => ({
    type: OPEN_COLOR_PICKER,
    payload,
})

export const SELECT_FONT_COLOR = 'SELECT_FONT_COLOR'
export const selectFontColor = payload => ({
    type: SELECT_FONT_COLOR,
    payload,
})

export const SET_TEXT_VALUE = 'SET_TEXT_VALUE'
export const setTextValue = payload => ({
    type: SET_TEXT_VALUE,
    payload,
})

export const CLOSE_COLOR_PICKERS = 'CLOSE_COLOR_PICKERS'
export const closeColorPickers = () => ({
    type: CLOSE_COLOR_PICKERS,
})

export const ADD_GENERATED_ART = 'ADD_GENERATED_ART'
export const addGeneratedArt = payload => ({
    type: '@@redux-form/CHANGE',
    payload,
    meta: {
        form: 'createShow',
        field: 'coverArt',
        touch: false,
        persistentSubmitErrors: false,
    },
})

export const RESET_ART_CREATOR = 'RESET_ART_CREATOR'
export const resetArtCreator = () => ({
    type: RESET_ART_CREATOR,
})
