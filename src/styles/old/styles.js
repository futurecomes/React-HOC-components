import * as aphrodite from 'aphrodite/no-important'

const GLOBALS = '__GLOBAL_STYLES__'

const globalExtension = {
    selectorHandler: (selector, baseSelector, generateSubtreeStyles) =>
        baseSelector.includes(GLOBALS) ? generateSubtreeStyles(selector) : null,
}

const extended = aphrodite.StyleSheet.extend([globalExtension])

const styles = extended.StyleSheet.create({
    [GLOBALS]: {
        body: {
            margin: 0,
            padding: 0,
            fontFamily: "'Lato', sans-serif",
        },
        button: {
            outline: 'none',
            borderWidth: 'inherit',
            borderStyle: 'none',
            borderColor: 'none',
        },

        td: {
            border: 'none',
        },

        '.em': {
            marginTop: -5,
        },

        '.dropdown': {
            display: 'inline-block',
        },

        '.dropdown__content': {
            display: 'none',
            position: 'absolute',
        },

        '.dropdown--active .dropdown__content': {
            display: 'block',
        },

        // Styles for tables
        '.ReactTable .rt-td': {
            borderRight: '0 !important',
            padding: '9px 7px !important',
        },
        '.ReactTable .rt-thead .rt-th': {
            padding: '9px 7px !important',

        },
        '.ReactTable .rt-th, .ReactTable .rt-td': {
            whiteSpace: 'unset !important',

        },
        '.ReactTable .rt-thead .rt-tr': {
            backgroundColor: '#F2F4F9',
        },
        '.ReactTable .rt-thead .rt-th, .ReactTable .rt-thead .rt-td': {
            borderRight: '0 !important',
            fontWeight: 'bold',
            fontSize: '14px ! important'
        },
        '.ReactTable': {
            border: '0 !important',
            fontSize: '12px ! important'
        },
        '.ReactTable .rt-tbody .rt-tr-group:last-child': {
            borderBottom: 'solid 1px rgba(0,0,0,0.05) !important',

        },
        '.ReactTable.-highlight .rt-tbody .rt-tr:not(.-padRow):hover': {
            background: 'rgba(0, 0, 0, 0.02) !important'
        }

    },
})

extended.css(styles[GLOBALS])

export const StyleSheet = extended.StyleSheet
export const css = extended.css

export function merge(...sheets) {
    return Object.assign({}, ...sheets)
}
