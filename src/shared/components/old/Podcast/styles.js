import { StyleSheet, merge, colors, mobile, tablet } from 'src/styles/old'
import sharedStyles from '../shared/styles'

const mobileLow = mobile.low('max-width')

const mobileBP = mobile.high('min-width')
const mobileBP2 = mobile.high('max-width')
const tabletLow = tablet.high('max-width')

const openDescriptionKeyframesSM = {
    '0%': {
        maxHeight: 0,
    },

    '100%': {
        maxHeight: 400,
        overflow: 'visible',
    },
}

const openDescriptionKeyframesLG = {
    '0%': {
        maxHeight: 0,
    },

    '100%': {
        maxHeight: 400,
        overflow: 'visible',
    },
}

const closeDescriptionKeyframesSM = {
    '0%': {
        maxHeight: 400,
        overflow: 'visible',
    },

    '100%': {
        maxHeight: 0,
    },
}

const closeDescriptionKeyframesLG = {
    '0%': {
        maxHeight: 400,
        overflow: 'visible',
    },

    '100%': {
        maxHeight: 0,
    },
}

const openEpisodesKeyframes = {
    '0%': {
        maxHeight: 0,
    },

    '100%': {
        maxHeight: 400,
        overflow: 'visible',
    },
}

const closeEpisodesKeyframes = {
    '0%': {
        maxHeight: 400,
        overflow: 'visible',
    },

    '100%': {
        maxHeight: 0,
    },
}

export default merge(
    sharedStyles,
    StyleSheet.create({
        container: {
            flex: 1,
            [mobileLow]: {
                margin: '0px 5px',
            },
        },
        topMargin: {
            marginTop: 20,
        },
        notFound: {
            textAlign: 'center',
            color: '#444',
            backgroundColor: '#fff',
            padding: 20,
            maxWidth: '80%',
            width: 600,
            margin: '0 auto',
        },
        infoText: {
            color: '#999',
            textAlign: 'center',
            margin: 20,
            fontSize: '1.2em',
        },
        listItemContainer: {
            display: 'flex',
            minHeight: 200,
            height: 200,

            transition: 'all',

            backgroundColor: colors.white,
            margin: '0px 0px 30px',

            [mobileBP2]: {
                height: 170,
                justifyContent: 'center',
                alignItems: 'center',
            },
        },
        empty: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: 175,
            backgroundColor: colors.white,
            margin: '0px 0px 30px',
            alignItems: 'center',

            [mobileBP]: {
                minWidth: 740,
            },

            [mobileLow]: {
                padding: '0px 10px',
                textAlign: 'center',
                height: 100,
            },
        },
        emptyTitle: {
            color: colors.azure,
            fontSize: '1.25rem',
            marginTop: 0,

            [mobileLow]: {
                padding: '0px 10px',
                textAlign: 'center',
                margin: 0,
            },
        },
        emptyDesc: {
            margin: '0 !important',
        },
        firstRow: {
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            width: '80%',
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
        },
        innerLiContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
            width: '100%',
        },
        liImg: {
            height: 200,
            minWidth: 200,
        },
        liContent: {
            position: 'relative',
            padding: '20px 0px 20px 30px',
            width: 430,

            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
        },
        info: {
            display: 'flex',
            flexDirection: 'column',
            color: colors.black38,
            lineHeight: 1.36,
            fontSize: '0.65rem',

            [mobileBP2]: {
                flexDirection: 'row',
                marginTop: 20,
            },
        },
        infoItem: {
            marginTop: 2,

            [mobileBP]: {
                marginTop: 0,
            },
            [mobileBP2]: {
                marginRight: 2,
            },
        },
        actionWrapper: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0px 15px',
            flexDirection: 'column',

            [mobileBP]: {
                padding: '0px 30px',
            },
        },
        btnPlay: {
            lineHeight: 0,
            backgroundColor: 'transparent',
            padding: 0,
        },
        btnShare: {
            marginTop: '6px',
        },
        big: {
            display: 'block',
        },
        small: {
            display: 'block',
        },
        author: {
            fontSize: '20px',
            [mobileBP2]: {
                fontSize: 18,
            },
        },
        filterContainer: {
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0px 16px 16px',

            [mobileLow]: {
                padding: 0,
            },

            [tabletLow]: {
                paddingTop: 15,
            },
        },

        expandedContainer: {
            paddingLeft: '0px !important',
        },

        searchBar: {
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            padding: 10,
            marginTop: 15,
            marginRight: 16,
            backgroundColor: colors.white,
            [mobileLow]: {
                margin: '0px 0px 10px 0px',
            },
        },

        expandedInput: {
            marginRight: 0,
        },

        searchBarInput: {
            border: 'none',
            fontSize: '1rem',
            width: '100%',
            marginLeft: 5,

            ':focus': {
                outline: 'none',
            },
        },

        showContainer: {
            margin: '0 auto 50px',
            backgroundColor: colors.white,
            width: '90%',
            maxWidth: '1500px',
            boxShadow: '0px 0px 3px 2px rgba(0, 0, 0, 0.15)',
        },
        showContainerHeader : {
            borderBottom: '1px solid #e6e6e6',
            padding: '15px 60px',
            [mobileBP2] : {
                padding: '15px 10px',
            },
        },
        headerButtonWrapper: {
            display: 'flex',
        },
        showContainerBody : {
            display: 'flex',
            alignItems: 'stretch',
            flexDirection: 'row',
            padding: '30px 60px',
            '@media(max-width: 1110px)' : {
                flexWrap: 'wrap',
            },
            [mobileBP2] : {
                padding: '30px 0',
            },
        },
        showWrapper: {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            padding: '0 15px',
            justifyContent: 'center',
            width: '50%',
            borderRight: '2px solid #e6e6e6',
            [mobileBP]: {
                flexDirection: 'column',
            },
            '@media(max-width: 1110px)' : {
                width: '100%',
                borderRight: '0px solid #e6e6e6',
                borderBottom: '1px solid #e6e6e6',
            },
        },

        showInfo: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            '@media(max-width: 390px)' : {
                flexDirection: 'column',
                alignItems: 'center',
            },
        },
        infoWrapper : {
            '@media(max-width: 390px)' : {
                width: '100%',
            },
        },
        showImg: {
            maxHeight: 200,
            maxWidth: 200,
            objectFit: 'cover',
            height: '100%',
            [mobileBP2]: {
                maxHeight: 150,
                maxWidth: 150,
            },
        },
        showInteraction: {
            [mobileBP2]: {
                display: 'flex',
                flexDirection: 'column',
            },
        },
        imageWrapper: {
            maxHeight: 200,
            maxWidth: 200,
            margin: '0px 20px 0px 0px',
            [mobileBP2]: {
                maxHeight: 150,
                maxWidth: 150,
                margin: '0px 10px 0px 0px',
            },
        },
        playWrapper: {
            display: 'flex',
            justifyContent: 'center',
            padding: '0px 0px 20px 0px',
        },
        unplayed: {
            marginRight: 0,
            marginLeft: 'auto',
            fontWeight: 'bold',
            textAlign: 'right',
        },

        showTitle: {
            color: colors.black87,
            fontWeight: 500,
            margin: '2.5px 0px 0px',
            fontSize: '1.5rem',

            [mobileBP]: {
                fontSize: '2rem',
            },
        },
        actionsWrapper: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            padding: '20px 20px 20px 0px',
            [mobileBP2]: {
                padding: '10px 10px 10px 0px',
            },
        },
        listenOn: {
            marginBottom: '3px',
        },
        action: {
            flex: 1,
            color: colors.black87,
            fontSize: '0.95rem',
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            transition: 'color 0.5s',
            textDecoration: 'none',
            padding: '2px 6px 3px',
            marginRight: 16,

            ':first-of-type': {
                paddingLeft: 0,
            },
            ':hover': {
                color: colors.azure,
            },
        },
        actionIcon: {
            width: 18,
        },
        noLink: {
            color: colors.black12,
            cursor: 'default',
            ':hover': {
                color: colors.black12,
            },
        },
        spacer: {
            height: '10px',
            backgroundColor: colors.lightBlue,
        },
        showHideAction: {
            cursor: 'pointer',
            userSelect: 'none',
            backgroundColor: colors.lightBlue,
            padding: '10px 0',
            textAlign: 'center',
            color: colors.azure,
            fontSize: '14px',
            fontWeight: 600,
        },
        episodeListWrapper: {
            maxHeight: 410,
            overflow: 'auto',
            animationIterationCount: '1',
            width: '50%',
            "::-webkit-scrollbar" : {

            },
            "::-webkit-scrollbar-thumb" : {
                borderRadius: '10px',
                backgroundColor: '#cce2f8',
            },
            "::-webkit-scrollbar-track" : {
                backgroundColor: '#eaf2f9',
            },
            '@media(max-width: 1110px)' : {
                width: '100%',
                marginTop: '20px',
            },
            [mobileBP2] : {
                padding: '0px 10px',
                "::-webkit-scrollbar" : {
                    display: 'none',
                },
            },
        },
        episodesVisible: {
            animationName: [openEpisodesKeyframes],
            animationDuration: '0.5s',
        },
        episodesHidden: {
            maxHeight: 0,
            overflow: 'hidden',
            animationName: [closeEpisodesKeyframes],
            animationDuration: '0.25s',
        },
        episodeContainer: {
            marginBottom: '15px',
            ':last-of-type': {
                marginBottom: '0px',
            },
        },
        showEpisodeWrapper: {
            padding: 0,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            [mobileBP]: {
                padding: '7px 15px',
            },
            '@media(max-width: 1110px)' : {
                width: '100%',
                paddingLeft: '0',
            },
        },
        descriptionTextWrapper: {
            padding: '0px 7px 7px 20px',
            width: '90%',
            lineHeight: 1.2,
            fontSize: '15px',
            [mobileBP2] : {
                width: '100%',
                padding: '0px 0px 0px 20px',
            },
        },
        episodeTitle: {
            backgroundColor: 'transparent',
            fontSize: '1rem',
            color: colors.black87,
            transition: 'color 0.5s',
            fontWeight: 'bold',
            ':hover': {
                color: colors.azure,
            },
            [mobileBP2] : {
                marginLeft: '10px',
                marginTop: '2px',
            },
        },
        episodeContent: {
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 10,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flex: 1,
            lineHeight: 1.2,
        },
        descriptionWrapper: {
            maxHeight: 0,
            overflow: 'hidden',
            animationIterationCount: '1',
        },
        open: {
            maxHeight: 400,
            overflow: 'visible',
            animationName: [openDescriptionKeyframesSM],
            animationDuration: '0.5s',

            [mobileBP]: {
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

            [mobileBP]: {
                maxWidth: 400,
            },
        },
        flex1: {
            flex: 1,
            margin: '0px 0px 10px !important',
        },
        playedIndicator: {
            width: 9,
            height: 9,
            marginRight: 15,
            borderRadius: '50%',
            '@media(max-width: 1110px)' : {
                marginRight: '0',
            },
        },
        started: {
            border: `2px solid ${colors.azure}`,
        },
        finished: {
            backgroundColor: colors.azure,
        },
        date: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        month: {
            fontSize: '0.9rem',
            lineHeight: 1.25,
            color: colors.azure,
        },
        day: {
            fontSize: '0.9rem',
            lineHeight: 1.25,
            color: colors.black87,
        },
        btnWrapper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 43,
            [mobileBP]: {
                width: 45,
                marginLeft: 20,
            },
        },
        rowColumn: {
            display: 'flex',
            flexDirection: 'row',
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
        duration: {
            color: colors.black87,
            lineHeight: 1.36,
            fontSize: '1rem',
            margin: '10px 5px',
            [mobileBP2] : {
                margin: '0px 5px',
                lineHeight: 1.5,
            },
        },
        downArrow: {
            marginLeft: 'auto',
            marginRight: '5px',
        },
        episodeContentMobile: {
            display: 'flex',
            flexDirection: 'row',
        },
        episodeSubContentMobile: {
            display: 'flex',
            flexDirection: 'row',
            marginLeft: '40px'
        },
        showEpisodeWrapperMobile: {
            display: 'flex',
            padding: 0,
            flexDirection: 'column',
        },
    }),
)
