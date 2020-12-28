export default function formatTime(time) {
    let seconds = isNaN(time) ? 0 : Math.floor(time % 60)
    seconds = seconds < 10 ? `0${seconds}` : seconds

    let minutes = isNaN(time) ? 0 : Math.floor(time / 60) % 60
    minutes = minutes < 10 ? `0${minutes}` : minutes

    let hours = isNaN(time) ? 0 : Math.floor(time / (60 * 60)) % 60
    if (hours >= 1) {
        hours = hours < 10 ? `0${hours}:` : `${hours}:`
    } else {
        hours = ''
    }

    return `${hours}${minutes}:${seconds}`
}
