import styled from 'react-emotion'

import { colors, mobile } from 'src/styles/old'

const mobileBP2 = mobile.high('max-width');

export const CirleButtonWithIcon = styled.button({
    backgroundColor: colors.transparent,
    padding: 0,
    [mobileBP2]: {
        marginTop: 0,
        marginBottom: 'auto'
    }
});

export const CirleButtonIcon = styled.img({
    width: 23,
    height: 23,
});
