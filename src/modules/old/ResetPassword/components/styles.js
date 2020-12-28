import { StyleSheet, merge, colors } from 'src/styles/old'

import sharedStyles from 'src/shared/components/old/shared/styles'

export default merge(
    sharedStyles,
    StyleSheet.create({
        container: {
            width: '100%',
            maxWidth: 425,
        },

        submit: {
            padding: '8px 50px',
            margin: '10px auto 0px',
        },

        row: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 10,
        },

        forgotLink: {
            fontSize: '0.85rem',
        },

        switchFormWrapper: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: 20,
        },

        switchFormLabel: {
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: 1.5,
            letterSpacing: 'normal',
            color: colors.black38,
        },

        smallText: {
            fontSize: '0.85rem',
            fontWeight: 500,
        },
    }),
)
