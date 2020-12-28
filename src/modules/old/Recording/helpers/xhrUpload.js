import { Observable } from 'rxjs'

export function uploadRecording(payload) {
    return Observable.create(observer => {
        const xhr = new XMLHttpRequest()
        const body = new FormData()
        const filename = `${payload.userId}${Date.now()}.wav`
        body.append('file', payload.blob, filename)

        // eslint-disable-next-line
        xhr.open('POST', `${location.origin}/api/fileupload`, true)
        xhr.setRequestHeader('Authorization', payload.token)

        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState === 4) {
                const response = JSON.parse(xhr.response)
                observer.next({
                    isProgress: false,
                    value: {
                        ...response,
                        sessionId: payload.sessionId,
                        recordedSize: payload.blob.size,
                        duration: payload.duration,
                        name: payload.name,
                    },
                })
                observer.complete()
            }
        })

        xhr.upload.addEventListener('loadstart', () => {
            observer.next({ isProgress: true, value: 0 })
        })

        xhr.upload.addEventListener('progress', e => {
            const value = Math.floor((e.loaded / e.total) * 100)
            observer.next({ isProgress: true, value: value === 100 ? 99 : value })
        })

        xhr.send(body)
    })
}
