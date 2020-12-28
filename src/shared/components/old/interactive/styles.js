import { StyleSheet, colors, mobile } from 'src/styles/old';

const mobileBP = mobile.high('max-width');
const mobileBP2 = mobile.high('max-width');

const defaultActive = {
    color: colors.azure,
};

const defaultAltActive = {
    color: colors.black87,
};

const darkPurple = '#5B60BA';
const purpleActive = {
    border: `2px solid ${darkPurple}`,
    backgroundColor: darkPurple,
    color: colors.white,
};

const purpleAltActive = {
    backgroundColor: colors.periwinkle,
    color: colors.white,
};

const darkBlue = colors.cerulean;
const blueActive = {
    border: `2px solid ${darkBlue}`,
    backgroundColor: darkBlue,
    color: colors.white,
};

const blueAltActive = {
    border: `2px solid ${colors.azure}`,
    backgroundColor: colors.azure,
    color: colors.white,
};

const greenActive = {
    border: `2px solid ${colors.lightTeal}`,
    backgroundColor: colors.lightTeal,
    color: colors.white,
};

const greenAltActive = {
    border: `2px solid ${colors.lightTeal}`,
    backgroundColor: colors.lightTeal,
    color: colors.white,
};

const redActive = {
    border: `2px solid ${colors.coral}`,
    backgroundColor: colors.coral,
    color: colors.white,
};

const redAltActive = {
    backgroundColor: colors.coral,
    border: `2px solid ${colors.coral}`,
    color: colors.white,
};

const orangeActive = {
    backgroundColor: colors.salmon,
    border: `2px solid ${colors.salmon}`,
    color: colors.white,
};

const orangeAltActive = {
    backgroundColor: colors.salmon,
    border: `2px solid ${colors.salmon}`,
    color: colors.white,
};

const whiteActive = {
    border: `2px solid ${colors.azure}`,
    backgroundColor: colors.lightGray,
    color: colors.azure,
};

const whiteAltActive = {
    border: `1px solid ${colors.lightGray}`,
    backgroundColor: colors.lightGray,
    color: colors.azure,
};

const blueActiveUpdated = {
    backgroundColor: '#2f74d8',
    color: colors.white,
};

export default StyleSheet.create({
    container: {
        fontWeight: 500,
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textAlign: 'center',
        color: colors.black87,
        textDecoration: 'none',
        transition: 'color 0.25s',
        backgroundColor: 'transparent',
        ':active': defaultActive,
        ':hover': defaultActive,
        ':focus': defaultActive,
    },

    'default-alternate': {
        color: colors.azure,
        ':active': defaultAltActive,
        ':hover': defaultAltActive,
        ':focus': defaultAltActive,
    },

    navLink: {
        margin: '0px 18px',

        [mobileBP]: {
            padding: 20,
        },
    },
    authorLink: {
        textDecoration: 'underline',
    },

    navButton: {
        margin: '0px 18px',

        [mobileBP]: {
            margin: '10px 18px 0px',
        },
    },

    button: {
        padding: '8px 15px',
        transition: 'background-color 0.25s, border 0.25s',
        cursor: 'pointer',
    },

    alternate: {
        backgroundColor: 'transparent',
    },

    logo: {
        margin: 0,
        padding: 0,
        zIndex: 2,
    },

    link: {
        color: colors.azure,
        fontSize: '0.85rem',
    },

    'link-alternate': {
        color: colors.azure,
        fontSize: '0.85rem',
    },

    purple: {
        border: `2px solid ${colors.periwinkle}`,
        backgroundColor: colors.periwinkle,
        color: colors.white,
        ':hover': purpleActive,
        ':focus': purpleActive,
    },

    'purple-alternate': {
        border: `2px solid ${colors.periwinkle}`,
        color: colors.periwinkle,
        ':hover': purpleAltActive,
        ':focus': purpleAltActive,
    },

    blue: {
        border: `2px solid ${colors.azure}`,
        backgroundColor: colors.azure,
        color: colors.white,
        ':hover': blueActive,
        ':focus': blueActive,
    },
    blueUpdated: {
        background: '#3C82E7',
        borderRadius: '3px',

        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '25px',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#FFFFFF',

        padding: '12px 33px',
        ':hover': blueActiveUpdated,
        ':focus': blueActiveUpdated,

    },

    gray: {
        border: `2px solid ${colors.lightGray}`,
        backgroundColor: colors.lightGray,
        color: colors.black54,
    },

    'blue-alternate': {
        border: `2px solid ${colors.azure}`,
        color: colors.azure,
        ':hover': blueAltActive,
        ':focus': blueAltActive,
    },

    green: {
        border: `2px solid ${colors.shamrockGreen}`,
        backgroundColor: colors.shamrockGreen,
        color: colors.white,
        ':hover': greenActive,
        ':focus': greenActive,
    },

    'green-alternate': {
        border: `2px solid ${colors.shamrockGreen}`,
        color: colors.shamrockGreen,
        ':hover': greenAltActive,
        ':focus': greenAltActive,
    },

    red: {
        backgroundColor: colors.coral,
        border: `2px solid ${colors.coral}`,
        color: colors.white,
        ':hover': redActive,
        ':focus': redActive,
    },

    'red-alternative': {
        backgroundColor: colors.white,
        border: `2px solid ${colors.coral}`,
        color: colors.coral,
        ':hover': redAltActive,
        ':focus': redAltActive,
    },

    orange: {
        backgroundColor: colors.tangerine,
        border: `2px solid ${colors.tangerine}`,
        color: colors.white,
        ':hover': orangeActive,
        ':focus': orangeActive,
    },

    'orange-alternative': {
        backgroundColor: colors.tangerine,
        border: `2px solid ${colors.tangerine}`,
        color: colors.white,
        ':hover': orangeAltActive,
        ':focus': orangeAltActive,
    },

    white: {
        border: `2px solid ${colors.azure}`,
        backgroundColor: colors.white,
        color: colors.azure,
        ':hover': whiteActive,
        ':focus': whiteActive,
        ':active': whiteActive,
    },

    'white-alternate': {
        border: `1px solid ${colors.white}`,
        color: colors.azure,
        ':hover': whiteAltActive,
        ':focus': whiteAltActive,
    },

    icon: {
        [mobileBP]: {
            transform: 'scale(0.85)',
        },
    },

    smallIcon: {
        height: 20,
        width: 20,
        [mobileBP2]: {
            height: 30,
            width: 30,
        },
    },

    buttonIcon: {
        marginRight: 10,
    },

    disabled: {
        backgroundColor: 'rgba(0, 0, 0, 0.12)',
        color: 'white',
        border: '2px solid rgba(0, 0, 0, 0.03)',
        cursor: 'not-allowed',
    },
});
