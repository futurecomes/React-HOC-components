function buildQuery(query, size) {
    return `@media (${query}: ${size})`
}

function createBuilder({ low, high }) {
    return {
        low: query => buildQuery(query, low),
        high: query => buildQuery(query, high),
    }
}

const mobileBP = {
    low: '670px',
    high: '670px',
}

export const mobile = createBuilder(mobileBP)

const tabletBP = {
    low: '671px',
    high: '830px',
}

export const tablet = createBuilder(tabletBP)

const desktopBP = {
    low: '831px',
    high: '999px',
}

export const desktop = createBuilder(desktopBP)

const lgDesktopBP = {
    low: '100px',
    high: '1280px',
}

export const lgDesktop = createBuilder(lgDesktopBP)

const xlgDesktopBP = {
    low: '1281px',
    high: null,
}

export const xlgDesktop = createBuilder(xlgDesktopBP)
