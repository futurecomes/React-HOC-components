import { isPlainObject } from 'lodash/fp';

import { uploadFileProgress } from 'src/actions/old/editor';

import { transformToCamelCase, transformToSnakeCase } from './transforms';
import { HOST, AUDIO_HOST } from 'src/config/settings';

const fullyQualifiedURLRegEx = /^https?:\/\//;

function buildURL(path) {
    if (path === 'process' || path === 'register') {
        return fullyQualifiedURLRegEx.test(path) ? path : `${AUDIO_HOST}/${path}`;
    }
    return fullyQualifiedURLRegEx.test(path) ? path : `${HOST}/${path}`;
}

function request(method, config = {}) {
    return url =>
        new Promise((resolve, reject) => {
            const respData = {};
            fetch(buildURL(url), {
                method,
                credentials: 'same-origin',
                ...config,
            })
                .then(res => {
                    respData.status = res.status;
                    respData.success = res.ok;

                    // handle custom headers
                    const totalCount = res.headers.get('X-Total-Count');
                    if (totalCount) {
                        respData.totalCount = totalCount;
                    }

                    const contentType = res.headers.get('Content-Type');
                    if (contentType.match(/application\/json/)) {
                        return res.json();
                    } else if (contentType.match(/text/)) {
                        return res.text();
                    }

                    return Promise.resolve();
                })
                .then(data => {
                    if (respData.success) {
                        const transformedData = isPlainObject(data)
                            ? transformToCamelCase(data)
                            : transformToCamelCase({ data });

                        const res = transformedData.data ? transformedData : { data: transformedData };

                        return resolve({
                            ...respData,
                            ...res,
                        });
                    } else if (respData.status === 401 && data.error.toLowerCase() === 'token expired') {
                        // this import is here due to a problem with circular dependencies
                        const { store } = require('src/config/store');
                        const { token } = store.getState().auth;
                        if (token) {
                            store.dispatch({ type: 'AUTH_SIGN_OUT' });
                        }

                        return false;
                    }

                    return reject({
                        ...respData,
                        reason: data.message || 'An unexpected error has occured',
                    });
                })
                .catch(() =>
                    reject({
                        ...respData,
                        reason: 'An unexpected error has occured',
                    }),
                );
        });
}

function buildQuery(query = {}) {
    const transformed = transformToSnakeCase(query);

    return Object.keys(transformed)
        .map(key => `${key}=${transformed[key]}`)
        .join('&');
}

function get(path, query, headers = {}) {
    let endpoint = path;
    if (query) {
        endpoint = `${endpoint}?${buildQuery(query)}`;
    }

    const config = {
        headers: new Headers({
            ...headers,
        }),
    };

    return request('GET', config)(endpoint);
}

function post(path, params, headers = {}, skipTransform = false) {
    const body = skipTransform ? params : transformToSnakeCase(params);

    if (body.filter && body.filter.show_expanded_categories) {
        body.filter['show_expanded.categories'] = body.filter.show_expanded_categories;
        delete body.filter.show_expanded_categories;
    }
    const config = {
        headers: new Headers({
            'Content-Type': 'application/json',
            ...headers,
        }),
        body: JSON.stringify(body),
    };
    return request('POST', config)(path);
}

function formPost(path, formData, headers = {}) {
    const config = {
        headers: new Headers({
            ...headers,
        }),
        body: formData,
    };

    return request('POST', config)(path);
}

function put(path, params, headers = {}, skipTransform = false) {
    const config = {
        headers: new Headers({
            'Content-Type': 'application/json',
            ...headers,
        }),
        body: skipTransform ? JSON.stringify(params) : JSON.stringify(transformToSnakeCase(params)),
    };

    return request('PUT', config)(path);
}

function deleteFn(path, params, headers = {}, skipTransform = false) {
    const config = {
        headers: new Headers({
            'Content-Type': 'application/json',
            ...headers,
        }),
        body: skipTransform ? JSON.stringify(params) : JSON.stringify(transformToSnakeCase(params)),
    };

    return request('DELETE', config)(path);
}

function fileUpload(path, { blob, filename }, headers = {}) {
    // this import is here due to a problem with circular dependencies
    const { store } = require('src/config/store');
    return new Promise((resolve, reject) => {
        const body = new FormData();

        body.append('file', blob, filename);

        const req = new XMLHttpRequest();

        req.open('POST', buildURL(path), true);

        Object.keys(headers).forEach(key => req.setRequestHeader(key, headers[key]));

        req.upload.addEventListener(
            'progress',
            progress => {
                store.dispatch(uploadFileProgress(progress.loaded / progress.total));
            },
            false,
        );

        req.onload = () => {
            if (req.status === 200) {
                const res = JSON.parse(req.response);
                resolve(transformToCamelCase({ data: res.fileupload }));
            } else {
                reject(transformToCamelCase({ error: JSON.parse(req.response) }));
            }
        };

        req.onerror = evt => {
            reject(evt);
        };

        req.send(body);
    });
}

function buildWithHeaders(action, headers) {
    return (path, data, skipTransform) => action(path, data, headers, skipTransform);
}

function auth(token, extraHeaders = {}) {
    const authHeader = {
        ...extraHeaders,
        Authorization: token,
    };

    return {
        get: buildWithHeaders(get, authHeader),
        post: buildWithHeaders(post, authHeader),
        formPost: buildWithHeaders(formPost, authHeader),
        put: buildWithHeaders(put, authHeader),
        delete: buildWithHeaders(deleteFn, authHeader),
        fileUpload: buildWithHeaders(fileUpload, authHeader),
    };
}

export default {
    get,
    post,
    formPost,
    put,
    auth,
    delete: deleteFn,
    fileUpload,
};
