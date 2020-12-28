import { StyleSheet } from 'src/styles/old';

export default StyleSheet.create({
    icon: {
        background: 'transparent',
        transition: 'transform 0.05s',
        cursor: 'pointer',
        ':hover': {
            transform: 'scale(1.1)',
        },
        '[disabled]': {
            transform: 'none',
            filter: 'grayscale(100%)',
            cursor: 'not-allowed',
        },
    },
    disabled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'visible',
        flex: 1,
    },
    valMid: {
        verticalAlign: 'middle',
    },
});
