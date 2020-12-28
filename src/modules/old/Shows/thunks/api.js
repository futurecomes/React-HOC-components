import showsAPI from 'src/api/shows'
import { closeUnprotectPodcastModal, editShow } from '../actions'

export const submitUnprotectPodcast = show => (dispatch, getState) => () => {
    const {
        auth: { token },
    } = getState()
    return showsAPI.unProtect(token, show).then(() => {
        dispatch(closeUnprotectPodcastModal())
        dispatch(editShow(show, { protected: false }))
    })
}

export const submitProtectPodcast = (token, showID, stripeToken, password) => (
    dispatch,
    getState,
    api,
) => () => {
    dispatch(editShow(showID, { protected: true }))
    return showsAPI.protect(token, showID, stripeToken, password)
}
