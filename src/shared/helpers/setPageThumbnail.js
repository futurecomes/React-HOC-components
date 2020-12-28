/* eslint-disable no-restricted-globals */

export const setPageThumbnail = imageUrl => {
    document.querySelector('[property="og:image"]').content = imageUrl
    document.querySelector('[name="twitter:image:src"]').content = imageUrl
    document.querySelector('[property="og:url"]').content = location.href
}
