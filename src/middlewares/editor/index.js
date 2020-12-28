import { handlers } from './handlers'

export default function editorMiddleware({ dispatch }) {
    return next => action => {
        const handler = handlers[action.type]
        if (handler) {
            dispatch(handler(action))
        }
        return next(action)
    }
}
