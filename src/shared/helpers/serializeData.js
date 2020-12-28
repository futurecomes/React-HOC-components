import _truncate from 'lodash/truncate'

import { changeUrl } from './changeS3Url'
import { mapHtmlToString } from './mapHtmlToString'

export const serializeData = elements =>
    elements.map(changeUrl).map(element => ({
        ...element,
        description: mapHtmlToString(element.description),
        title: mapHtmlToString(element.title),
        shortDescription: _truncate(mapHtmlToString(element.description), { length: 35 }),
        shortTitle: _truncate(mapHtmlToString(element.title), { length: 35 }),
    }))
