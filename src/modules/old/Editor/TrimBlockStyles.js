import { StyleSheet } from 'src/styles/old';

export default StyleSheet.create({
    box: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '100%',
        opacity: 0.8,
        width: '100%',
        position: 'absolute',
        zIndex: 35,
    },

    trimPart: {
        visibility: 'hidden',
        background: 'tomato',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },

    arrow: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        width: 16,
        height: 22,
        cursor: 'pointer',
    },

    leftArrow: {
        left: -8,
        bottom: -20,
    },

    rightArrow: {
        right: -8,
        bottom: -20,
    },

    divider: {
        position: 'absolute',
        background: 'tomato',
        visibility: 'hidden',
        width: 2,
        height: '100%',
    },
});
