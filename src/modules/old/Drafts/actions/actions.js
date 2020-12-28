export const FETCH_DRAFTS = 'FETCH_DRAFTS'
export const fetchDrafts = () => ({
    type: FETCH_DRAFTS,
})

export const FETCH_DRAFTS_FULFILLED = 'FETCH_DRAFTS_FULFILLED'
export const fetchDraftsFulfilled = payload => ({
    type: FETCH_DRAFTS_FULFILLED,
    payload,
})

export const FETCH_DRAFTS_REJECTED = 'FETCH_DRAFTS_REJECTED'
export const fetchDraftsRejected = payload => ({
    type: FETCH_DRAFTS_REJECTED,
    payload,
})

export const DRAFT_REHYDRATE = 'DRAFT_REHYDRATE'
export const draftRehydrate = payload => ({
    type: DRAFT_REHYDRATE,
    draft: payload,
})

export const DELETE_DRAFT = 'DELETE_DRAFT'
export const deleteDraft = payload => ({
    type: DELETE_DRAFT,
    payload,
})

export const DELETE_DRAFT_FULFILLED = 'DELETE_DRAFT_FULFILLED'
export const deleteDraftFulfilled = payload => ({
    type: DELETE_DRAFT_FULFILLED,
    payload,
})

export const DELETE_DRAFT_REJECTED = 'DELETE_DRAFT_REJECTED'
export const deleteDraftRejected = payload => ({
    type: DELETE_DRAFT_REJECTED,
    payload,
})

export const START_LOADING_FETCH_DRAFTS = 'START_LOADING_FETCH_DRAFTS'
export const startLoadingFetchDrafts = () => ({
    type: START_LOADING_FETCH_DRAFTS,
})

export const CLOSE_MODAL_DRAFT = 'CLOSE_MODAL_DRAFT'
export const closeModalDraft = () => ({
    type: CLOSE_MODAL_DRAFT,
})
