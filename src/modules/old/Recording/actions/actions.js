export const SHOW_RECORDING_ERROR_MESSAGE = 'SHOW_RECORDING_ERROR_MESSAGE'
export const showRecordingErrorMessage = (message, error = '') => ({
    type: SHOW_RECORDING_ERROR_MESSAGE,
    payload: message,
    error,
})

export const SET_RECORDING_PROGESS = 'SET_RECORDING_PROGESS'
export const setRecordingProgress = payload => ({
    type: SET_RECORDING_PROGESS,
    payload,
})

export const SAVE_RECORDING_FILE = 'SAVE_RECORDING_FILE'
export const saveRecordingFile = payload => ({
    type: SAVE_RECORDING_FILE,
    payload,
})

export const SAVE_RECORDING_FILE_FULFILLED = 'SAVE_RECORDING_FILE_FULFILLED'
export const saveRecordingFileFulfilled = payload => ({
    type: SAVE_RECORDING_FILE_FULFILLED,
    payload,
})

export const SAVE_RECORDING_FILE_REJECTED = 'SAVE_RECORDING_FILE_REJECTED'
export const saveRecordingFileRejected = () => ({
    type: SAVE_RECORDING_FILE_REJECTED,
})

export const SET_UP_RECORDER = 'SET_UP_RECORDER'
export const setUpRecorder = payload => ({
    type: SET_UP_RECORDER,
    payload,
})

export const INSTANTIATE_MULTIPART = 'INSTANTIATE_MULTIPART'
export const instantiateMultiPart = payload => ({
    type: INSTANTIATE_MULTIPART,
    payload,
})

export const INSTANTIATE_MULTIPART_FULFILLED = 'INSTANTIATE_MULTIPART_FULFILLED'
export const instantiateMultiPartFulfiiled = payload => ({
    type: INSTANTIATE_MULTIPART_FULFILLED,
    payload,
})

export const INSTANTIATE_MULTIPART_REJECTED = 'INSTANTIATE_MULTIPART_REJECTED'
export const instantiateMultiPartRejected = payload => ({
    type: INSTANTIATE_MULTIPART_REJECTED,
    payload,
})

export const ABORT_MULTIPART_UPLOAD = 'ABORT_MULTIPART_UPLOAD'
export const abortMultipartUpload = payload => ({
    type: ABORT_MULTIPART_UPLOAD,
    payload,
})

export const ABORT_MULTIPART_UPLOAD_FULFILLED = 'ABORT_MULTIPART_UPLOAD_FULFILLED'
export const abortMultipartUploadFulfilled = payload => ({
    type: ABORT_MULTIPART_UPLOAD_FULFILLED,
    payload,
})

export const EMIT_CHUNK = 'EMIT_CHUNK'
export const emitChunk = payload => ({
    type: EMIT_CHUNK,
    payload,
})

export const UPLOAD_BLOB = 'UPLOAD_BLOB'
export const uploadBlob = payload => ({
    type: UPLOAD_BLOB,
    payload,
})

export const UPLOAD_BLOB_FULFILLED = 'UPLOAD_BLOB_FULFILLED'
export const uploadBlobFulfilled = payload => ({
    type: UPLOAD_BLOB_FULFILLED,
    payload,
})

export const UPLOAD_BLOB_REJECTED = 'UPLOAD_BLOB_REJECTED'
export const uploadBlobRejected = payload => ({
    type: UPLOAD_BLOB_REJECTED,
    payload,
})

export const COMPLETE_MULTIPART_UPLOAD = 'COMPLETE_MULTIPART_UPLOAD'
export const completeMultiPartUpload = () => ({
    type: COMPLETE_MULTIPART_UPLOAD,
})

export const COMPLETE_MULTIPART_UPLOAD_FULFILLED = 'COMPLETE_MULTIPART_UPLOAD_FULFILLED'
export const completeMultiPartUploadFulfilled = payload => ({
    type: COMPLETE_MULTIPART_UPLOAD_FULFILLED,
    payload,
})

export const COMPLETE_MULTIPART_UPLOAD_REJECTED = 'COMPLETE_MULTIPART_UPLOAD_REJECTED'
export const completeMultiPartUploadRejected = () => ({
    type: COMPLETE_MULTIPART_UPLOAD_REJECTED,
})

export const STOP_TIME_COUNTER = 'STOP_TIME_COUNTER'
export const stopTimeCounter = () => ({
    type: STOP_TIME_COUNTER,
})

export const INCREMENT_TIME_COUNTER = 'INCREMENT_TIME_COUNTER'
export const incrementTimeCounter = () => ({
    type: INCREMENT_TIME_COUNTER,
})
