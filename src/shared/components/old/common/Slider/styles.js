import { StyleSheet, colors, mobile } from 'src/styles/old'

const mobileBP = mobile.high('min-width')

export default StyleSheet.create({
    activeTrack: {
        backgroundColor: colors.azure,
        height: 4,
    },
    altColor: {
        backgroundColor: '#8A8A8A',
    },
    inputRange: {
        flex: 1,
        padding: '5px 0px',
    },
    labelContainer: {
        display: 'none',
    },
    label: {
        display: 'none',
    },
    slider: {
        backgroundColor: colors.azure,
        cursor: 'pointer',
        transition: 'height 0.1s, width 0.1s, margin-top 0.1s',
        height: 20,
        width: 3,
        marginTop: -4,
        marginLeft: -1,

        [mobileBP]: {
            height: 0,
            width: 0,
            marginTop: 0,
            marginLeft: -7,
            borderRadius: 7,
        },
    },
    activeSlider: {
        [mobileBP]: {
            height: 14,
            width: 14,
            marginTop: -9,
        },
    },
    track: {
        height: 4,
        backgroundColor: colors.black12,
        position: 'relative',
    },
})
