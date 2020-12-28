import { StyleSheet, colors, mobile } from 'src/styles/old';

const mobileBP = mobile.high('min-width');

export default StyleSheet.create({
    container: {
        padding: '10px 0px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.lightGray,
        flexWrap: 'wrap',
    },

    link: {
        color: '#060100',
        fontSize: '16px',
        maxWidth: 150,

        [mobileBP]: {
            maxWidth: 'initial',
        },
    },
    activeLink: {
        textDecoration: 'underline',
    },
});
