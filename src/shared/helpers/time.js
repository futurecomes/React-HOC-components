function padLeadingZero(num) {
    return '00'.substring(0, 2 - num.toString().length) + num;
}

export function formatTime(ms) {
    const sec = parseInt((ms / 1000) % 60, 10);
    const min = parseInt((ms / (1000 * 60)) % 60, 10);
    const hour = parseInt((ms / (1000 * 60 * 60)) % 60, 10);

    return `${padLeadingZero(hour)}:${padLeadingZero(min)}:${padLeadingZero(sec)}`;
}

export function formatTimeElapsed(start, stop) {
    const fullTime = (stop || Date.now()) - start;
    return formatTime(fullTime < 5 ? 5 : fullTime);
}

export function formatDate(timestamp) {
    if (!timestamp) {
        return ' N/A';
    }

    const date = new Date(timestamp);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear() % 1000}`;
}

export function formatDateWithLongMonth(timestamp) {
    const date = new Date(timestamp);

    return `${date.toLocaleString('en-us', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
}

export function formatTimeWithHiddenLeadingZeroHours(ms) {
    const sec = parseInt((ms / 1000) % 60, 10);
    const min = parseInt((ms / (1000 * 60)) % 60, 10);
    const hour = parseInt((ms / (1000 * 60 * 60)) % 60, 10);

    const cutTwoLeadZeros = hour => hour === "00" ? "" : hour + ':';

    const padLeadZeroHour = padLeadingZero(hour);

    return `${cutTwoLeadZeros(padLeadZeroHour)}${padLeadingZero(min)}:${padLeadingZero(sec)}`;
}
