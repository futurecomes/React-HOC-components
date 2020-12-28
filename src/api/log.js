import request from './core'

const createLog = (log, token) =>
    request
        .auth(token)
        .post('log', log)
        .then(({ data }) => data)

export const LogApi = {
    createLog,
}
