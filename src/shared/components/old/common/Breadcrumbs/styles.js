import { StyleSheet, colors, mobile } from 'src/styles/old'

const mobileBP = mobile.high('min-width')

export default StyleSheet.create({
    container: {
        padding: '10px 12px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: colors.lightGray,
    },
    linkContainer: {
        margin: '0 auto',
    },
    link: {
        margin: '0px 3px',
        color: colors.azure,
        maxWidth: 150,

        ':after': {
            content: '">"',
            marginLeft: 6,
            color: colors.black38,
        },

        [mobileBP]: {
            maxWidth: 'initial',
        },
    },
    activeLink: {
        color: colors.black38,

        ':after': {
            content: '',
        },
    },
})
