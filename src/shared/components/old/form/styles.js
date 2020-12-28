import { StyleSheet, merge, colors } from 'src/styles/old';
import { color, font } from 'src/styles/variables';

import sharedStyles from '../shared/styles';

import checkSvgSrc from './static/svg/check.svg';
import cameraSvgSrc from './static/svg/camera.svg';

export default merge(
    sharedStyles,
    StyleSheet.create({
        container: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
            marginBottom: 15,
            minWidth: '48%',
        },
        label: {
            fontFamily: 'Roboto',
            fontSize: '14px',
            lineHeight: '25px',
            color: '#000000',
        },
        input: {
            padding: 10,
            fontSize: '14px',
            lineHeight: '21px',
            letterSpacing: '0.5px',
            color: '#444444',
            background: '#F2F4F9',
            border: `solid 1px white`,
            ':focus': {
                border: `solid 1px #3C82E7`,
                outline: 'none',
            },
        },
        inputGray: {
            padding: '1rem',
            border: `solid 1px ${color.alabaster}`,
            fontSize: font.size.base,
            color: colors.black87,
            backgroundColor: color.alabaster,
            ':hover': {
                border: `solid 1px ${color.gallery}`,
            },
            ':focus': {
                border: `solid 1px ${color.gallery}`,
                backgroundColor: color.gallery,
                outline: 'none',
            },
        },
        textArea: {
            resize: 'vertical',
            padding: 10,
            border: `solid 1px ${colors.black12}`,
            fontSize: '1rem',
            color: colors.black87,
            ':focus': {
                border: `solid 1px ${colors.azure}`,
                outline: 'none',
            },
        },
        activeInput: {
            border: `solid 1px ${colors.azure}`,
        },
        error: {
            color: colors.coral,
            marginTop: 5,
            marginBottom: 0,
        },
        errorsWrapper: {
            marginTop: 15,
        },

        formMessage: {
            backgroundColor: colors.coral,
            padding: '5px 28px',
            fontSize: '0.9rem',
            fontWeight: 500,
            flex: 1,
        },
        warning: {
            color: colors.warning,
            marginTop: 5,
            marginBottom: 0,
            textAlign: 'left',
        },
        formSuccess: {
            backgroundColor: colors.azure,
            color: colors.white,
        },
        formError: {
            backgroundColor: colors.coral,
            color: colors.white,
        },
        checkWrapper: {
            flexDirection: 'row',
        },
        checkLabels: {
            display: 'flex',
            flexDirection: 'column',
        },
        checkBox: {
            marginTop: 4,
            marginRight: 10,
            appearance: 'none',
            width: '0.95rem',
            height: '0.95rem',
            padding: 2,
            border: `1px solid #434343`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: colors.azure,
            ':focus': {
                outline: 'none',
            },
            ':checked, [value="true"]': {
                border: `1px solid ${colors.azure}`,
                ':after': {
                    content: `url(${checkSvgSrc})`,
                },
            },
        },
        checkBoxLabel: {
            color: '#383A48',
        },
        grayText: {
            marginLeft: '5px',
        },
        tag: {
            fontSize: '0.75rem',
        },
        imagePickerContainer: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
            marginBottom: 10,
        },
        fileWrapper: {
            position: 'relative',
            width: 200,
            height: 200,
            border: `1px solid #F2F4F9`,
            background: '#F2F4F9',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            ':hover': {
                border: `1px solid #3C82E7`,
            },
        },
        file: {
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
        },
        fileContent: {
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        cameraLogo: {
            marginBottom: 10,
            maxHeight: 50,
            maxWidth: 50,
            content: `url(${cameraSvgSrc})`,
        },
        errorBorder: {
            border: `1px solid ${colors.coral}`,
        },
        warningBorder: {
            border: `1px solid ${colors.warning}`,
        },
        uploadTags: {
            marginBottom: 0,
            fontSize: '14px',
            lineHeight: '21px',
            letterSpacing: '0.5px',
            color: '#444444',

        },
        imageInputLabel: {
            maxWidth: '100%',
            marginTop: '0.5rem',
            fontSize: '0.75em',
            textAlign: 'center',
            whiteSpace: 'pre-wrap',
        },
        profileImg: {
            maxHeight: '100%',
            maxWidth: '100%',
        },

        dropdown: {
            position: 'relative',
            backgroundColor: colors.white,
        },
        dropdownTrigger: {
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        dropdownContent: {
            backgroundColor: colors.white,
            minWidth: 200,
            border: `solid 1px ${colors.black12}`,
            marginTop: 17,
            left: 0,
            maxHeight: 210,
            overflowY: 'scroll',
            zIndex: 5,
        },
        dropdownItem: {
            color: colors.black87,
            padding: '12px 16px',
            textDecoration: 'none',
            display: 'block',
            transition: 'background-color 0.2s, color 0.2s',
            borderBottom: `1px solid ${colors.black12}`,
            fontSize: '0.9rem',

            ':last-of-type': {
                borderBottom: 'none',
            },

            ':hover': {
                cursor: 'pointer',
                backgroundColor: colors.azure,
                color: colors.white,
            },
        },
        'dropdown-red': {
            color: colors.coral,
        },

        placeholder: {
            color: colors.black38,
        },

        cardWrapper: {
            display: 'flex',
            position: 'relative',
        },
        cardNumber: {
            flex: 1,
        },
        cardIcon: {
            position: 'absolute',
            top: '50%',
            right: 7,
            transform: 'translateY(-50%)',
        },
        spaceBelow: {
            marginBottom: 16,
        },
        clearButton: {
            backgroundColor: 'white',
            marginRight: 5,
        },
    }),
);
