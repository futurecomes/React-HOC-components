export const ADMIN_EDIT_SHOW = 'ADMIN_EDIT_SHOW'
export const adminEditShow = payload => ({
    type: ADMIN_EDIT_SHOW,
    payload,
})

export const ADMIN_EDIT_SHOW_FULFILLED = 'ADMIN_EDIT_SHOW_FULFILLED'
export const adminEditShowFulfilled = payload => ({
    type: ADMIN_EDIT_SHOW_FULFILLED,
    payload,
})

export const ADMIN_EDIT_SHOW_FAILURE = 'ADMIN_EDIT_SHOW_FAILURE'
export const adminEditShowFailure = payload => ({
    type: ADMIN_EDIT_SHOW_FAILURE,
    payload,
})

export const FETCH_ANALYTICS_FULFILLED = 'FETCH_ANALYTICS_FULFILLED'
export const fetchAnalyticsFulfilled = payload => ({
    type: FETCH_ANALYTICS_FULFILLED,
    payload,
})

export const FETCH_ANALYTICS_REJECTED = 'FETCH_ANALYTICS_REJECTED'
export const fetchAnalyticsRejected = payload => ({
    type: FETCH_ANALYTICS_REJECTED,
    payload,
})

export const CREATE_LOG = 'CREATE_LOG'
export const createLog = payload => ({
    type: CREATE_LOG,
    payload,
})

export const CREATE_LOG_FULFILLED = 'CREATE_LOG_FULFILLED'
export const createLogFulfilled = payload => ({
    type: CREATE_LOG_FULFILLED,
    payload,
})

export const CREATE_LOG_REJECTED = 'CREATE_LOG_REJECTED'
export const createLogRejected = payload => ({
    type: CREATE_LOG_REJECTED,
    payload,
})

export const logDropSnippet = snippetId =>
    createLog({
        action: 'snippetDrop',
        meta: {
            snippetId,
        },
    })

export const ADMIN_FETCH_ANALYTICS = 'ADMIN_FETCH_ANALYTICS'
export const fetchDashboardAnalytics = () => ({
    type: ADMIN_FETCH_ANALYTICS,
})

export const FETCH_USER_PAYMENT_HISTORY = '[ADMIN] FETCH_USER_PAYMENT_HISTORY'
export const fetchUserPaymentHistory = userId => ({
    type: FETCH_USER_PAYMENT_HISTORY,
    payload: userId,
})

export const FETCH_USER_PAYMENT_HISTORY_FULFILLED = '[ADMIN] FETCH_USER_PAYMENT_HISTORY_FULFILLED'
export const fetchUserPaymentHistoryFulfilled = data => ({
    type: FETCH_USER_PAYMENT_HISTORY_FULFILLED,
    payload: data,
})

export const FETCH_USER_PAYMENT_HISTORY_REJECTED = '[ADMIN] FETCH_USER_PAYMENT_HISTORY_REJECTED'
export const fetchUserPaymentHistoryRejected = error => ({
    type: FETCH_USER_PAYMENT_HISTORY_REJECTED,
    error,
})
