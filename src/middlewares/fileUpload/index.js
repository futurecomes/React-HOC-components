import { clearMessages, setErrors } from 'src/actions/old/messages';

const imageTypeRE = /image.*/;
const audioTypeRE = /audio.*/;

function readFile(files) {
    const file = files[0];

    return new Promise((resolve, reject) => {
        if (imageTypeRE.test(file.type)) {
            const reader = new FileReader();
            const img = new Image();

            img.onload = function onUploadedFileLoad() {
                resolve({
                    file,
                    source: reader.result,
                    size: {
                        height: this.height,
                        width: this.width,
                    },
                });
            };

            reader.onload = function onFileReaderLoad() {
                img.src = reader.result;
            };

            reader.readAsDataURL(file);
        } else if (audioTypeRE.test(file.type)) {
            resolve({
                file,
            });
        } else {
            reject('File type not supported');
        }
    });
}

export default function fileReaderMiddleware({ dispatch }) {
    return next => action => {
        if (action.payload instanceof FileList) {
            dispatch(clearMessages('form'));

            return readFile(action.payload)
                .then(payload =>
                    dispatch({
                        ...action,
                        payload,
                    }),
                )
                .catch(error => {
                    dispatch(setErrors('form', error));

                    return dispatch({
                        ...action,
                        payload: {
                            error,
                        },
                    });
                });
        }

        return next(action);
    };
}
