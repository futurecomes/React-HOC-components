import { Col } from 'antd';
import React from 'react';
import { InjectedFormProps } from 'redux-form';

import signInImg from 'src/public/img/sign-in.png';

import { Button } from 'src/shared/components/Button';
import CheckBox from 'src/shared/components/old/form/CheckBox';
import Input from 'src/shared/components/old/form/Input';
import FormMessages from 'src/shared/components/old/form/Messages';

import { authHOC } from './authHOC';
import * as S from './styles';

interface Props extends InjectedFormProps {
    authenticate: () => void;
    isFetching?: boolean;
}

const SignInContainer: React.FC<Props> = ({ handleSubmit, authenticate, isFetching }) => (
    <S.ScreenWrapper>
        <S.ContentWrapper type="flex">
            <Col md={11} lg={13}>
                <S.FormImage src={signInImg} />
            </Col>
            <Col sm={16} md={{ span: 12, offset: 1 }} lg={10}>
                <S.FormWrapper>
                    <S.FormHeader>Sign In</S.FormHeader>
                    <S.Form onSubmit={handleSubmit(authenticate)}>
                        <Input name="email" placeholder="Email Address" gray />
                        <Input name="password" placeholder="Password" type="password" gray />
                        <S.CheckboxWrapper>
                            <CheckBox name="rememberMe" id="rememberMe" label="Remember Me" />
                            <S.Link right to="/reset">
                                Forgot Password?
                            </S.Link>
                        </S.CheckboxWrapper>
                        <FormMessages />
                        <S.ButtonWrapper>
                            <Button htmlType="submit" fullWidth disabled={isFetching}>
                                {isFetching ? 'Signing in...' : 'Sign In'}
                            </Button>
                        </S.ButtonWrapper>
                    </S.Form>
                    <S.SwitchFormQuestion>Don't have an account?</S.SwitchFormQuestion>
                    <S.Link to="/join">Join Messy</S.Link>
                </S.FormWrapper>
            </Col>
        </S.ContentWrapper>
    </S.ScreenWrapper>
);

const SignIn = authHOC('signIn', SignInContainer);

export default SignIn;
