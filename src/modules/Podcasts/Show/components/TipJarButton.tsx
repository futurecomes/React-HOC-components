import React, { FunctionComponent } from 'react';
import styled from 'react-emotion';

import { color, font } from 'src/styles/variables';

const SupportText = styled.p({
    fontSize: font.size.small,
    marginBottom: '0.5rem',
    textAlign: 'center',
});

const Button = styled.button({
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: `1px solid ${color.tundora}`,
    borderRadius: '0.25rem',
    color: color.tundora,
    padding: '0.25rem 2rem',
    margin: '0.25rem',
});

interface Props {
    onClick: (e: React.MouseEvent) => void;
}

export const TipJarButton: FunctionComponent<Props> = ({ onClick }) => (
    <div>
        <SupportText>Support This Show</SupportText>
        <Button onClick={onClick}>Tip Jar</Button>
    </div>
);
