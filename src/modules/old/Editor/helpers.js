export const calculateEpisodeDuration = (snippets = []) =>
    snippets.reduce((acc, val) => {
        const endTime = val.timelineOffset + val.playDuration
        if (endTime > acc) {
            return endTime
        }
        return acc
    }, 0)

export function secondsToMinutes(time) {
    const min = Math.floor(time / 60)
    const sec = Math.floor(time % 60)
    return (min < 10 ? `0${min}` : min) + ':' + (sec < 10 ? `0${sec}` : sec)
}
