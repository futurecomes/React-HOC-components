let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

months = months.map((m, i) => ({ text: m, value: i + 1 }))

export const monthsList = months

const years = []

const currentYear = new Date(Date.now()).getFullYear()

let idx = 0

// eslint-disable-next-line
for (; idx < 40; idx++) {
    const newYear = currentYear + idx
    years.push({ text: `${newYear}`, value: newYear })
}

export const yearsList = years

/* eslint-disable */
export function generatePolylinePoints(maxHeightPixels, numberOfPoints) {
    let i = 0
    const points = []
    for (; i < numberOfPoints + 1; ++i) {
        points.push({
            xPercent: i / numberOfPoints,
            yPoint: Math.random() * maxHeightPixels,
        })
    }
    return points
}
