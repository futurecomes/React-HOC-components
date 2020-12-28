import { handlers } from './actions'

export default function audioMiddleware({ dispatch }) {
    return next => action => {
        const handler = handlers[action.type]
        if (handler) {
            return dispatch(handler(action))
        }

        return next(action)
    }
}
