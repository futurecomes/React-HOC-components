import { Input } from 'antd';
import React, { FunctionComponent } from 'react';
import styled from 'react-emotion';

import { Button } from 'src/shared/components/Button';

const Container = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const PasswordInput = styled(Input)({
    '&.ant-input': {
        marginBottom: '1rem',
    },
});

interface Props {
    changePasswordValue: React.Dispatch<React.SetStateAction<string>>;
    onSubmit: () => void;
    isLoading: boolean;
    isIncorrect: boolean;
}

export const PasswordProtection: FunctionComponent<Props> = ({
    changePasswordValue,
    isLoading,
    onSubmit,
    isIncorrect,
}) => (
    <Container>
        <h3>The Show is password protected. Input password to continue.</h3>
        <PasswordInput placeholder="Password" type="password" onChange={e => changePasswordValue(e.target.value)} />
        {isIncorrect && <h4>Incorrect Password.</h4>}
        <Button disabled={isLoading} onClick={onSubmit}>
            Submit
        </Button>
    </Container>
);
