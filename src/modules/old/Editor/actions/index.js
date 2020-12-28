export const EDITOR_UPDATE_DRAFT = 'EDITOR_UPDATE_DRAFT'
export const editorUpdateDraft = payload => ({
    type: EDITOR_UPDATE_DRAFT,
    payload,
})

export const EDITOR_UPDATE_DRAFT_FULFILLED = 'EDITOR_UPDATE_DRAFT_FULFILLED'
export const editorUpdateDraftFulfilled = payload => ({
    type: EDITOR_UPDATE_DRAFT_FULFILLED,
    payload,
})

export const EDITOR_UPDATE_DRAFT_REJECTED = 'EDITOR_UPDATE_DRAFT_REJECTED'
export const editorUpdateDraftRejected = payload => ({
    type: EDITOR_UPDATE_DRAFT_REJECTED,
    payload,
})

export const EDITOR_REVERT_DRAFT = 'EDITOR_REVERT_DRAFT'
export const editorRevertDraft = () => ({
    type: EDITOR_REVERT_DRAFT,
})

export const SET_DRAFT_FOR_SAVE = 'SET_DRAFT_FOR_SAVE'
export const setDraftForSave = () => ({
    type: SET_DRAFT_FOR_SAVE,
})

export const CLEAR_EPISODE_EDITION = 'CLEAR_EPISODE_EDITION'
export const clearEpisodeEdition = () => ({
    type: CLEAR_EPISODE_EDITION,
})

export const ENABLE_TRIM = 'ENABLE_TRIM'
export const enableTrim = payload => ({
    type: ENABLE_TRIM,
    payload,
})

export const ON_RELEASE_CHANGE = 'ON_RELEASE_CHANGE'
export const onReleaseChange = payload => ({
    type: ON_RELEASE_CHANGE,
    payload,
})

export const ON_DATE_CHANGE = 'ON_DATE_CHANGE'
export const onDateChange = payload => ({
    type: ON_DATE_CHANGE,
    payload,
})

export const SHOW_DROP_WARNING = 'SHOW_DROP_WARNING'
export const showDropWarning = payload => ({
    type: SHOW_DROP_WARNING,
    payload,
})
