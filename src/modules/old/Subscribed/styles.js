import { StyleSheet, colors, tablet, mobile } from 'src/styles/old'

const tabletBP = tablet.high('min-width')
const mobileBP = mobile.high('min-width')
const mobileBP2 = mobile.high('max-width')

const openDescriptionKeyframesSM = {
    '0%': {
        maxHeight: 0,
        paddingLeft: 20,
        paddingBottom: 12,
        paddingRight: 12,
    },

    '100%': {
        maxHeight: 400,
        overflow: 'visible',
        paddingLeft: 20,
        paddingBottom: 12,
        paddingRight: 12,
    },
}

const openDescriptionKeyframesLG = {
    '0%': {
        maxHeight: 0,
        paddingLeft: 90,
        paddingBottom: 16,
    },

    '100%': {
        maxHeight: 400,
        overflow: 'visible',
        paddingLeft: 90,
        paddingBottom: 16,
    },
}

const closeDescriptionKeyframesSM = {
    '0%': {
        maxHeight: 400,
        overflow: 'visible',
        paddingLeft: 20,
        paddingBottom: 12,
        paddingRight: 12,
    },

    '100%': {
        maxHeight: 0,
        paddingLeft: 20,
        paddingBottom: 12,
        paddingRight: 12,
    },
}

const closeDescriptionKeyframesLG = {
    '0%': {
        maxHeight: 400,
        overflow: 'visible',
        paddingLeft: 90,
        paddingBottom: 16,
    },

    '100%': {
        maxHeight: 0,
        paddingLeft: 90,
        paddingBottom: 16,
    },
}

export default StyleSheet.create({
    pageTitle: {
        fontSize: '2rem',
        margin: '30px auto 0px auto',
        width: '90%',
        maxWidth: '1500px',
        paddingLeft: '60px',
        [mobileBP2] : {
            paddingLeft: '10px',
        },
    },
    pageWrapper: {
        flex: 1,
        width: '100%'
    },
    showContainer: {
        display: 'flex',
        minHeight: 300,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1,
        alignItems: 'stretch',
        margin: '0px auto',
        padding: '25px 0px',

        [tabletBP]: {
            minWidth: 740,
        },
    },
    discoverMore: {
        backgroundColor: colors.white,
        padding: 24,
        textAlign: 'center',
    },
    discoverTitle: {
        display: 'block',
        marginBottom: 18,
        fontSize: '18px',
        fontWeight: 600,
    },
    discoverButton: {
        display: 'block',
        maxWidth: 150,
        margin: '0 auto',
        fontSize: '1.2rem',
    },
    unplayedEpisodeContainer: {
        backgroundColor: colors.white,
    },
    unplayedEpisodeHeader: {
        backgroundColor: colors.lightBlue,
        padding: '9px 20px',
    },
    unplayedEpisodeTitle: {
        fontSize: '14px',
        fontWeight: 600,
    },

    episodeContainer: {
        borderBottom: `1px solid ${colors.black12}`,
        ':last-of-type': {
            borderBottom: 'none',
        },
    },
    episodeWrapper: {
        padding: '7px 7px 7px 20px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        [mobileBP]: {
            padding: '7px 20px',
        },
    },
    showImg: {
        width: 50,
        height: 50,
    },
    showTitle: {
        display: 'block',
        color: colors.azure,
        fontSize: '14px',
    },
    episodeContent: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 20,
        justifyContent: 'flex-start',
        flex: 1,
    },
    episodeTitle: {
        display: 'block',
        fontSize: '14px',
    },
    duration: {
        color: colors.black38,
        fontSize: '0.75rem',
        lineHeight: 1,
        margin: '5px 0px 0px 0px',

        [mobileBP]: {
            lineHeight: 1.36,
            fontSize: '0.85rem',
            margin: '10px 10px',
        },
    },
    descriptionWrapper: {
        display: 'flex',
        flexDirection: 'row',
        maxHeight: 0,
        overflow: 'hidden',
        animationIterationCount: '1',
        paddingLeft: 90,
    },
    open: {
        maxHeight: 400,
        overflow: 'visible',
        paddingLeft: 20,
        paddingRight: 12,
        paddingBottom: 12,
        animationName: [openDescriptionKeyframesSM],
        animationDuration: '0.5s',

        [mobileBP]: {
            paddingLeft: 90,
            paddingBottom: 16,
            animationName: [openDescriptionKeyframesLG],
        },
    },
    close: {
        animationName: [closeDescriptionKeyframesSM],
        animationDuration: '0.25s',

        [mobileBP]: {
            animationName: [closeDescriptionKeyframesLG],
        },
    },
    episodeDescription: {
        margin: 0,
        overflow: 'hidden',
        color: colors.black38,
        fontWeight: 600,
        fontSize: '0.85rem',

        [mobileBP]: {
            fontSize: '0.75rem',
            maxWidth: 400,
        },
    },
    btnWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [mobileBP]: {
            marginLeft: 20,
        },
    },
    rowColumn: {
        display: 'flex',
        flexDirection: 'column',
        [mobileBP]: {
            flexDirection: 'row',
        },
    },
    orderLeft: {
        order: 3,
        [mobileBP]: {
            order: 1,
        },
    },
    orderRight: {
        order: 2,
    },
})
