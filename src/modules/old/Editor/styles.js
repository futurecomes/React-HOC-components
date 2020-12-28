import { StyleSheet, colors } from 'src/styles/old';

export default StyleSheet.create({
    container: {
        alignItems: 'stretch',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },

    center: {
        textAlign: 'center',
    },

    grayText: {
        color: colors.black38,
    },

    fadeIcon: {
        height: 16,
        width: 16,
    },
    buttonBlock: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        padding: '0px 20px',
    },
    keepEditingButton: {
        padding: '7px 50px',
        fontSize: '0.9rem',
        marginTop: '15px',
        marginBottom: '10px',
    },

    previewElement: {
        position: 'absolute',
        width: 270,
        zIndex: -1,
        backgroundColor: 'white',
    },

    inverted: {
        filter: 'invert(100%)',
    },

    fadeIn: {
        '-moz-transform': 'scaleX(-1)',
        '-o-transform': 'scaleX(-1)',
        '-webkit-transform': 'scaleX(-1)',
        transform: 'scaleX(-1)',
        filter: 'FlipH',
        '-ms-filter': 'FlipH',
    },

    topRow: {
        marginBottom: 5,
        backgroundColor: colors.white,
        padding: '19px 25px',
        position: 'relative',
    },

    episodeName: {
        fontSize: 20,
        height: 20,
        outline: 'none',
        border: 'none',
        borderBottom: `1px solid ${colors.black12}`,
        maxWidth: 300,
        // overflowX: 'scroll',
        overflow: 'hidden',
        paddingBottom: 5,
        marginRight: 15,
    },
    namePlaceholder: {
        fontStyle: 'italic',
        color: colors.black54,
        paddingRight: 1,
    },

    empty: {
        borderBottom: `1px solid ${colors.azure}`,
    },

    timelineContainer: {
        flex: 1,
        overflowX: 'scroll',
    },
    recordingsContainer: {
        width: 312,
        height: 'auto',
        borderBottom: 'none',
        position: 'relative',
    },
    listHeader: {
        backgroundColor: colors.lightBlueGrey,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    blueText: {
        color: colors.azure,
    },
    blackText: {
        fontSize: '0.9rem',
        color: colors.black87,
    },
    greyText: {
        fontSize: '0.9rem',
        color: colors.black54,
    },
    button: {
        fontSize: '0.9rem',
        marginLeft: '20px',
    },
    smallButton: {
        padding: '6px 8px',
        fontSize: 12,
    },
    list: {
        backgroundColor: colors.white,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        position: 'relative',
    },
    listWrapper: {
        maxHeight: 400,
        overflowY: 'scroll',
    },
    accordionItem: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        padding: '8px 11px',
        borderBottom: `1px solid ${colors.black12}`,
    },
    spaceAround: {
        margin: '0px 6px',
    },
    arrow: {
        transition: 'transform 0.25s',
        transform: 'rotate(-90deg)',
    },
    isOpen: {
        transform: 'rotate(0deg)',
    },
    redDot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: colors.coral,
        marginRight: 8,
    },
    spaceRight: {
        marginRight: 8,
    },
    recording: {
        width: '100%',
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 0,
    },
    flex1: {
        flex: 1,
    },
    modalTitle: {
        marginTop: 0,
    },
    modalBody: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    stretch: {
        alignItems: 'stretch',
    },
    iconButton: {
        backgroundColor: 'transparent',
        ':hover': {
            transform: 'scale(1.2)',
        },
    },
    addMore: {
        fontSize: '0.9rem',
        alignSelf: 'flex-end',
        marginTop: 12,
    },
    form: {
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
    },
    submit: {
        alignSelf: 'center',
        fontSize: '0.9rem',
        padding: '7px 50px',
        marginTop: 15,
        marginBottom: 10,
    },
    fileList: {
        maxHeight: 250,
        overflowY: 'scroll',
    },
    verticalCenter: {
        alignItems: 'center',
    },
    timelineBackground: {
        width: '100%',
        height: '100%',
        backgroundColor: '#EFEFEF',
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
        position: 'relative',
    },
    timelineCanvas: {
        width: 'calc(100% - 150px)',
        height: '100%',
        cursor: 'crosshair',
        borderLeft: '1px solid rgba(0, 0, 0, 0.07)',
        position: 'relative',
        backgroundColor: '#EFEFEF',
        display: 'flex',
        left: '150px',
        overflow: 'visible',
        overflowX: 'scroll',
        overflowY: 'hidden',
    },

    backgroundLine: {
        borderLeft: '1px solid rgba(0, 0, 0, 0.07)',
        height: '100%',
        pointerEvents: 'none',
        position: 'absolute',
        backgroundColor: 'transparent',
    },
    layers: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        overflow: 'visible',
        backgroundColor: 'transparent',
        paddingBottom: 150,
    },
    layer: {
        height: '120px',
        marginTop: '30px',
        cursor: 'crosshair',
        zIndex: 5,
        position: 'relative',
        overflow: 'visible',
    },
    addLayer: {
        width: '100%',
        position: 'absolute',
        bottom: 15,
        margin: '0px',
        cursor: 'default',
        backgroundColor: 'rgba(128,128,128, 0.2)',
        display: 'flex',
    },
    addLayerText: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: '16px',
    },
    addLayerAudio: {
        position: 'static',
        left: '0px',
        marginTop: '0px !important',
        minWidth: '150px',
    },
    layerAudio: {
        width: '150px',
        position: 'absolute',
        height: '120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    audioBar: {
        width: '80%',
        marginBottom: '10px',
    },
    layerAudioBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '85%',
        height: '90%',
        backgroundColor: 'white',
    },
    layerAudioLabel: {
        width: '80%',
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: '14px',
        marginTop: '5px',
    },
    layerAudioAd: {
        color: '#aaa',
        fontSize: '10px',
    },
    muted: {
        color: 'rgba(0, 0, 0, 0.54)',
        backgroundColor: 'rgba(255,255,255,0.8)',
    },
    layerItem: {
        position: 'absolute',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        transition: 'all .5s'
    },
    layerItemSmall: {
        justifyContent: 'center',
    },
    layerItemResizable: {
        width: '100%',
        height: '100%',
        cursor: 'grab',
        zIndex: 10,
    },
    layerItemFlex: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },

    snapRecord: {
        background: 'beige',
        transform: 'scale(.95)',
        transition: 'all .5s',
    },

    layerItemLabel: {
        display: 'flex',
        justifyContent: 'space-between',
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: '14px',
        zIndex: 10,
        height: '100%',
        margin: '0',
        padding: '0 10px',
        borderLeft: '1px solid #059BFF',
        borderRight: '1px solid #059BFF',
    },
    layerItemHandle: {
        zIndex: 9,
        backgroundColor: 'rgba(5, 155, 255, 0)',
        ':hover': {
            backgroundColor: 'rgba(5, 155, 255, 1)',
        },
    },
    controlButton: {
        border: 'solid 1px rgba(0, 0, 0, 0.12)',
    },
    svgContainer: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 1,
        pointerEvents: 'none',
    },
    draggable: {
        cursor: 'grab',
    },
    timeLabel: {
        backgroundColor: 'white',
        width: '100%',
        fontSize: '14px',
        color: 'rgba(0, 0, 0, 0.54)',
    },
    audioIcon: {
        cursor: 'pointer',
        height: 24,
        width: 24,
    },
    zoomToolTip: {
        background: 'red',
    },
    timelineZoom: {
        width: 150,
        height: 15,
        backgroundColor: '#EFEFEF',
        position: 'relative',
    },
    zoomLine: {
        position: 'absolute',
        borderRight: '2px solid #059bff',
        height: '100%',
    },
    deleteButton: {
        backgroundColor: 'transparent',
        border: 'none',
        padding: 4,
        borderRadius: 4,
        cursor: 'pointer',
        margin: '1px 0 0 1px',
        float: 'right',
        color: 'rgba(0, 0, 0, 0.54)',
    },
    fadeButton: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: 4,
        margin: 1,
        borderRadius: 4,
        float: 'right',
        color: 'rgba(0, 0, 0, 0.54)',
        ':hover': {
            border: 'none'
        }
    },
    activeButton: {
        backgroundColor: colors.white,
        color: colors.azure,
    },
    modalPadding: {
        padding: 20,
    },
    modalTop: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 19,
    },
    blueTitle: {
        color: colors.azure,
        fontSize: '1.4rem',
        margin: '0px 0px 9px',
    },
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    modalButtons: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
    },
    publishInput: {
        padding: 10,
        border: `solid 1px ${colors.black12}`,
        fontSize: '1rem',
        color: colors.black87,
    },
    trimModePanel: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '5px',
        height: '50px',
        color: 'rgba(0, 0, 0, 0.54)',
        backgroundColor: 'white',
        alignItems: 'center',
        fontWeight: 'bold',
    },
    trimButtons: {
        display: 'flex',
        justifyContent: 'space-around',
        marginLeft: '20px',
    },
    trimSelection: {
        color: '#ff4040',
        fontSize: '14px',
        cursor: 'pointer',
    },
    doneTrimming: {
        color: '#059bff',
        fontSize: '14px',
        marginLeft: '30px',
        cursor: 'pointer',
    },
    helpPopup: {
        marginTop: '5px',
        fontSize: '12px',
        color: 'rgba(0, 0, 0, 0.54)',
    },
    subHeader: {
        fontSize: '14px',
        marginTop: '5px',
        marginBottom: '5px',
    },
    paragraph: {
        fontSize: '14px',
        marginTop: '5px',
        marginBottom: '5px',
        color: 'rgba(0, 0, 0, 0.54)',
    },
    error: {
        backgroundColor: '#ff4040',
        color: 'white',
        padding: 5,
    },
    errorPanel: {
        paddingBottom: '10px',
        paddingTop: '10px',
        marginBottom: '10px',
    },

    tooltip: {
        backgroundColor: '#9e9e9e !important',
        ':after': {
            borderTop: '6px solid #9e9e9e !important',
        },
    },

    tooltipRight: {
        backgroundColor: '#9e9e9e !important',
        ':after': {
            borderRight: '6px solid #9e9e9e !important',
        },
    },
});