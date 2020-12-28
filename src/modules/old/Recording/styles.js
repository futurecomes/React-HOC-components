import { StyleSheet, colors, mobile } from 'src/styles/old';

const mobileAboveBP = mobile.high('min-width');

const blink = {
    '0%': { opacity: 0 },
    '49%': { opacity: 0 },
    '50%': { opacity: 1 },
};

export default StyleSheet.create({
    blueTitle: {
        color: colors.azure,
        fontSize: '1.4rem',
        margin: '0px 0px 9px',

        [mobileAboveBP]: {
            fontSize: '2rem',
        },
    },

    topRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 19,
    },

    modalField: {
        padding: '5px 2px',
        fontSize: 16,
        marginTop: 5,
    },

    modalBody: {
        width: '100%',
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },

    inputWrapper: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
    },

    table: {
        backgroundColor: colors.white,
        position: 'relative',
    },

    warning: {
        position: 'absolute',
        top: '100%',
        marginTop: 2,
        fontSize: 12,
        color: colors.coral,
    },

    header: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: colors.lightBlue,
        padding: '9px 25px',
        fontSize: '0.9rem',
        color: colors.black87,
    },

    body: {},

    infoPadding: {
        padding: '12px 25px 16px',
    },

    infoWrapper: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 18,
    },

    info: {
        fontSize: '0.9rem',
        lineHeight: '20px',
        color: colors.black54,
    },

    infoBold: {
        fontWeight: 'bolder',
    },

    button: {
        fontSize: '0.9rem',
        cursor: 'pointer',
    },

    submitButton: {
        width: 150,
        marginTop: 30,
        fontSize: 16,
        cursor: 'pointer',
    },

    centerButton: {
        margin: '0 auto',
    },

    sessionHeader: {
        padding: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    sessionLeft: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        position: 'relative',
        paddingRight: '1rem',
    },

    headerWrapper: {
        display: 'flex',
        flexDirection: 'column',
    },

    errorMessage: {
        textAlign: 'center',
        color: colors.coral,
    },

    sessionName: {
        fontSize: 20,
        outline: 'none',
        border: 'none',
        borderBottom: `1px solid ${colors.black12}`,
        maxWidth: 300,
        // overflowX: 'none',
        marginBottom: 5,
        paddingBottom: 5,
    },

    sessionNamePlaceholder: {
        fontStyle: 'italic',
        color: colors.black54,
        paddingRight: 1,
    },

    empty: {
        borderBottom: `1px solid ${colors.azure}`,
    },

    progressBar: {
        width: '15em',
    },

    progressWrapper: {
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
    },
    progressText: {
        position: 'absolute',
        bottom: 10,
    },
    sessionRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '9px 25px',
        borderBottom: `1px solid ${colors.black12}`,
        justifyContent: 'space-between',
        ':last-of-type': {
            borderBottom: 'none',
        },
    },

    rowFont: {
        fontSize: '0.9rem',
    },

    trashDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    trash: {
        backgroundColor: 'transparent',
        paddingBottom: 0,
        paddingTop: 0,
        ':hover': {
            cursor: 'pointer',
            transform: 'scale(1.25)',
        },
    },

    label: {
        display: 'block',
        color: colors.black54,
        fontSize: 12,
    },

    modalPadding: {
        padding: 20,
    },

    disabledIcon: {
        ':hover': {
            cursor: 'default',
            transform: 'none',
        },
    },

    timer: {
        marginRight: 16,
    },

    coral: {
        color: colors.coral,
    },

    save: {
        padding: '8px 40px',
        backgroundColor: colors.azure,
        color: colors.white,
        marginLeft: 12,
    },

    alignStart: {
        textAlign: 'left',
    },

    recordButton: {
        display: 'flex',
        alignItems: 'center',
        width: 140,
        border: `2px solid ${colors.coral}`,
        backgroundColor: 'transparent',
        fontSize: '1.25rem',
        padding: '12px 24px',
        color: colors.coral,
        transition: 'color 0.2s, background-color 0.2s',
        cursor: 'pointer',
    },

    recordHover: {
        backgroundColor: colors.coral,
        color: colors.white,
    },

    stopRecord: {
        backgroundColor: colors.coral,
        color: colors.white,
    },

    stopRecordHover: {
        border: `2px solid ${colors.coral}`,
        backgroundColor: 'transparent',
        color: colors.coral,
    },

    circle: {
        display: 'inline-block',
        height: 16,
        width: 16,
        marginRight: 10,
        backgroundColor: colors.coral,
        borderRadius: 8,
        transition: 'color 0.2s, background-color 0.2s',
    },

    recordingCircle: {
        position: 'absolute',
        top: 8,
        right: 0,
        width: 10,
        height: 10,
        background: colors.coral,
        borderRadius: '50%',
        animationName: [blink],
        animationDuration: '1.2s',
        animationIterationCount: 'infinite',
    },

    sessionTitleWrapper: {
        position: 'relative',
        paddingRight: 20,
    },

    circleHover: {
        backgroundColor: colors.white,
    },

    square: {
        borderRadius: 0,
        backgroundColor: colors.white,
    },

    squareHover: {
        backgroundColor: colors.coral,
    },

    recordings: {
        display: 'flex',
        flexDirection: 'column',
    },

    named: {
        color: colors.black87,
    },

    waveContainer: {
        position: 'relative',
        height: 75,
        background: colors.softPink,
    },

    rightRow: {
        display: 'flex',
        flexDirection: 'row',
    },

    recordingName: {
        marginLeft: 16,
        fontSize: '0.9rem',
        lineHeight: '20px',
        color: colors.black54,
        outline: 'none',
        border: 'none',
    },

    form: {
        marginTop: 18,
    },

    buttonWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 18,
    },

    flexContainer: {
        display: 'flex',
    },

    flex1: {
        flex: 1,
    },
    flex3: {
        flex: 3,
    },
    modalWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 500,
        minHeight: 300,
    },
    heading: {
        color: colors.azure,
    },
});
