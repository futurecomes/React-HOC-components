import {
    CHANGE_ART_BACKGROUND,
    OPEN_COLOR_PICKER,
    SELECT_FONT_COLOR,
    SET_TEXT_VALUE,
    CLOSE_COLOR_PICKERS,
    RESET_ART_CREATOR,
} from '../actions/actions'

const initialState = {
    backgroundColor: '#ffffff',
    texts: [
        {
            id: 1,
            label:
                'Text 1 - Click on the text in the image to change its size and location in your cover art.',
            color: 'black',
            value: '',
            displayColorPicker: false,
        },
        {
            id: 2,
            label:
                'Text 2 - Click on the text in the image to change its size and location in your cover art.',
            color: 'black',
            value: '',
            displayColorPicker: false,
        },
    ],
}

export function artCreator(state = initialState, action) {
    switch (action.type) {
        case RESET_ART_CREATOR:
            return initialState
        case CHANGE_ART_BACKGROUND:
            return {
                ...state,
                backgroundColor: action.payload.hex,
            }
        case OPEN_COLOR_PICKER:
            return {
                ...state,
                texts: state.texts.map(text =>
                    text.id !== action.payload
                        ? { ...text, displayColorPicker: false }
                        : { ...text, displayColorPicker: !text.displayColorPicker },
                ),
            }
        case SELECT_FONT_COLOR:
            return {
                ...state,
                texts: state.texts.map(text =>
                    text.id !== action.payload.id ? text : { ...text, color: action.payload.color },
                ),
            }
        case SET_TEXT_VALUE:
            return {
                ...state,
                texts: state.texts.map(text =>
                    text.id !== action.payload.id ? text : { ...text, value: action.payload.value },
                ),
            }
        case CLOSE_COLOR_PICKERS:
            return {
                ...state,
                texts: state.texts.map(text => ({ ...text, displayColorPicker: false })),
            }
        default:
            return state
    }
}
