import { StyleSheet, colors } from 'src/styles/old'

export default StyleSheet.create({
    title: {
        color: colors.black87,
        fontSize: '1.25rem',
        fontWeight: 400,
    },
    barContainer: {
        position: 'relative',
        height: 60,
    },
    actionBarContainer: {
        position: 'absolute',
        left: 0,
        width: 250,
    },
    searchBarContainer: {
        position: 'absolute',
        right: 0,
        width: 250,
    },
})
