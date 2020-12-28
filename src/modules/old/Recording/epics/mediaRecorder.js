import { combineEpics, ofType } from 'redux-observable';
import { map, filter, mergeMap, switchMap, takeUntil, mapTo, startWith } from 'rxjs/operators';
import { defer, interval } from 'rxjs';
import { orderBy as _orderBy } from 'lodash';

import * as actions from '../actions/actions';
import { noopAction } from 'src/actions/old/shared';
import request from 'src/api/core';
import { RECORDING_START } from 'src/actions/old/recording';

export const RECORDING_TIME_COUNTER = 3;
export const isMediaRecorderAvailable = !!window.MediaRecorder;

function uploadChunk(formData, token) {
    return defer(() =>
        request
            .auth(token)
            .formPost('multipart/uploadchunk', formData)
            .then(res => actions.uploadBlobFulfilled(res.data))
            .catch(() => actions.uploadBlobRejected("Couldn't upload a file, do you have internet connection?")),
    );
}

export function mediaRecorderEpicFactory() {
    const instantiateMultiPartEpic = (action$, store) =>
        action$.pipe(
            ofType(actions.INSTANTIATE_MULTIPART),
            mergeMap(() => {
                const { auth } = store.getState();
                const fileKey = `${auth.user.id}-${Date.now()}`;
                return request
                    .auth(auth.user.token)
                    .post('multipart/instantiateupload', { fileKey })
                    .then(res => actions.instantiateMultiPartFulfiiled({ ...res.data, fileKey }))
                    .catch(() => actions.instantiateMultiPartRejected("Couldn't instantiate upload :("));
            }),
        );

    const stopTimeCounter = (action$, store) =>
        action$.pipe(
            ofType(actions.INCREMENT_TIME_COUNTER),
            filter(() => store.getState().recording.timeCounter === RECORDING_TIME_COUNTER),
            mapTo(actions.stopTimeCounter()),
        );

    const startCounterEpic = action$ =>
        action$.pipe(
            ofType(actions.INSTANTIATE_MULTIPART_FULFILLED, RECORDING_START),
            switchMap(() =>
                interval(1000).pipe(
                    startWith(0),
                    takeUntil(action$.pipe(ofType(actions.STOP_TIME_COUNTER))),
                    mapTo(actions.incrementTimeCounter()),
                ),
            ),
        );

    const emitChunkEpic = (action$, store) =>
        action$.pipe(
            ofType(actions.EMIT_CHUNK),
            map(() => {
                const { recording } = store.getState();
                const blob = new Blob(recording.multiPart.chunksToUpload);
                if (blob.size >= 1024 * 1024 * 5 || !recording.isRecording) {
                    return actions.uploadBlob(blob);
                }
                return noopAction();
            }),
        );

    const uploadBlobEpic = (action$, store) =>
        action$.pipe(
            ofType(actions.UPLOAD_BLOB),
            mergeMap(action => {
                const state = store.getState();
                const { multiPart } = state.recording;
                const { token } = state.auth.user;
                const formData = new FormData();
                formData.append('blob', action.payload);
                formData.append(
                    'data',
                    JSON.stringify({
                        PartNumber: multiPart.numberOfChunks,
                        uploadId: multiPart.uploadId,
                        fileKey: multiPart.fileKey,
                    }),
                );
                return uploadChunk(formData, token);
            }),
        );

    const finishUploadingBlobsEpic = (action$, store) =>
        action$.pipe(
            ofType(actions.UPLOAD_BLOB_FULFILLED),
            filter(() => !store.getState().recording.isRecording),
            map(() => {
                const { multiPart } = store.getState().recording;
                if (multiPart.uploadedChunks === multiPart.numberOfChunks) {
                    return actions.completeMultiPartUpload();
                }
                return noopAction();
            }),
        );

    const completeMultiPartEpic = (action$, store) =>
        action$.pipe(
            ofType(actions.COMPLETE_MULTIPART_UPLOAD),
            mergeMap(() => {
                const { multiPart } = store.getState().recording;
                return request
                    .auth(store.getState().auth.user.token)
                    .post('multipart/completeupload', {
                        map: {
                            Parts: _orderBy(multiPart.map.Parts, 'partNumber'),
                        },
                        uploadId: multiPart.uploadId,
                        fileKey: multiPart.fileKey,
                    })
                    .then(res => actions.completeMultiPartUploadFulfilled(res.data))
                    .catch(() => actions.completeMultiPartUploadRejected("Couldn't complete the upload"));
            }),
        );

    const saveFileEpic = (action$, store) =>
        action$.pipe(
            ofType(actions.COMPLETE_MULTIPART_UPLOAD_FULFILLED),
            map(action => {
                const { recording, auth } = store.getState();
                const duration = recording.recording.stoppedAt - recording.recording.startedAt;
                const blob = new Blob(recording.multiPart.allChunks, { type: 'audio/webm; codecs="vorbis"' });
                return actions.saveRecordingFile({
                    duration,
                    fileupload: {
                        s3Url: `https://messybun.s3-accelerate.amazonaws.com/${action.payload.key}`,
                        userId: auth.user.id,
                    },
                    name: recording.recording.name,
                    recordedSize: blob.size,
                    sessionId: recording.session.id,
                });
            }),
        );

    const abortMultiPartEpic = (action$, store) =>
        action$.pipe(
            ofType(actions.ABORT_MULTIPART_UPLOAD),
            mergeMap(action =>
                request
                    .auth(store.getState().auth.user.token)
                    .post('multipart/abortupload', action.payload)
                    .then(actions.abortMultipartUploadFulfilled)
                    .catch(() => actions.showRecordingErrorMessage("Couldn't abort the upload")),
            ),
        );

    return combineEpics(
        emitChunkEpic,
        uploadBlobEpic,
        finishUploadingBlobsEpic,
        instantiateMultiPartEpic,
        completeMultiPartEpic,
        saveFileEpic,
        abortMultiPartEpic,
        startCounterEpic,
        stopTimeCounter,
    );
}
