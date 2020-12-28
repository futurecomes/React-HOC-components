// Disable no-use-before-define because we need it for the recursion used
// for the deep transform functions
/* eslint no-use-before-define:0 */

import {
    cloneDeep,
    mapKeys,
    mapValues,
    isPlainObject,
    camelCase,
    isArray,
    snakeCase,
    compose,
} from 'lodash/fp'

const keysToSnakeCase = mapKeys(snakeCase)
const keysToCamelCase = mapKeys(camelCase)

function processValForCamelCase(value) {
    if (isPlainObject(value)) {
        return transformToCamelCase(value)
    } else if (isArray(value)) {
        return value.map(v => (isPlainObject(v) ? transformToCamelCase(v) : v))
    }

    return value
}

function processValForSnakeCase(value) {
    if (isPlainObject(value)) {
        return transformToSnakeCase(value)
    } else if (isArray(value)) {
        return value.map(arrValue => processValForSnakeCase(arrValue))
    }
    return value
}

export const transformToCamelCase = compose(mapValues(processValForCamelCase), keysToCamelCase, cloneDeep)

export const transformToSnakeCase = compose(mapValues(processValForSnakeCase), keysToSnakeCase, cloneDeep)
