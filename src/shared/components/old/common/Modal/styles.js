import { StyleSheet, colors } from 'src/styles/old'

export const modalStyles = {
    content: {
        width: 475,
        height: 'auto',
        margin: '40px auto 0px',
        borderRadius: 0,
        border: 'none',
        position: 'relative',
        top: 'unset',
        bottom: 'unset',
        left: 'unset',
        right: 'unset',
        overflow: 'visible',
    },
    overlay: {
        zIndex: 10,
        backgroundColor: colors.black38,
    },
}

export default StyleSheet.create({
    title: {
        display: 'block',
        marginBottom: 30,
        color: colors.azure,
        fontSize: '1.75rem',
    },
    close: {
        position: 'absolute',
        top: 18,
        right: 12,
        backgroundColor: 'transparent',
        paddingBottom: 0,
        paddingTop: 0,
        ':hover': {
            cursor: 'pointer',
            transform: 'scale(1.25)',
        },
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    btnConfirm: {
        flex: 1,
        marginRight: 12,
    },
    btnCancel: {
        flex: 1,
    },
})
