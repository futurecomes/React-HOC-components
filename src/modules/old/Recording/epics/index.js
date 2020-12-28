import { combineEpics, ofType } from 'redux-observable'
import { mergeMap, map } from 'rxjs/operators'

import request from 'src/api/core'
import { START_UPLOADING } from 'src/actions/old/recording'
import {
    setRecordingProgress,
    saveRecordingFile,
    SAVE_RECORDING_FILE,
    saveRecordingFileFulfilled,
    saveRecordingFileRejected,
} from '../actions/actions'
import { uploadRecording } from '../helpers/xhrUpload'

export function fileUploadEpicFactory() {
    const uploadWithProgressEpic = action$ =>
        action$.pipe(
            ofType(START_UPLOADING),
            mergeMap(action =>
                uploadRecording(action.payload).pipe(
                    map(
                        response =>
                            response.isProgress
                                ? setRecordingProgress(response.value)
                                : saveRecordingFile(response.value),
                    ),
                ),
            ),
        )

    const saveFileEpic = (action$, { getState }) =>
        action$.pipe(
            ofType(SAVE_RECORDING_FILE),
            mergeMap(action =>
                request
                    .auth(getState().auth.token)
                    .post('recording', {
                        name: action.payload.name,
                        url: action.payload.fileupload.s3Url,
                        owner: action.payload.fileupload.userId,
                        session: action.payload.sessionId,
                        recordedSize: action.payload.recordedSize,
                        duration: action.payload.duration,
                    })
                    .then(res => saveRecordingFileFulfilled(res.data))
                    .catch(saveRecordingFileRejected),
            ),
        )

    return combineEpics(uploadWithProgressEpic, saveFileEpic)
}
