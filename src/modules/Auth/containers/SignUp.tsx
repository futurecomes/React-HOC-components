import { Col } from 'antd';
import React from 'react';
import styled from 'react-emotion';
import { Redirect } from 'react-router-dom';
import { InjectedFormProps } from 'redux-form';

import signUpImg from 'src/public/img/sign-up.png';

import { Button } from 'src/shared/components/Button';
import CheckBox from 'src/shared/components/old/form/CheckBox';
import Input from 'src/shared/components/old/form/Input';
import FormMessages from 'src/shared/components/old/form/Messages';

import { Community } from '../components/Community';
import { authHOC } from './authHOC';
import * as S from './styles';

const StyledFormImage = styled(S.FormImage)({
    marginTop: '7rem',
});

interface Props extends InjectedFormProps {
    authenticate: () => void;
    isFetching?: boolean;
    isPendingVerification?: boolean;
}

class SignUpContainer extends React.Component<Props> {
    public render(): JSX.Element {
        const { handleSubmit, authenticate, isFetching, isPendingVerification } = this.props;

        return isPendingVerification ? (
            <Redirect to="/verify" />
        ) : (
            <S.ScreenWrapper>
                <S.ContentWrapper type="flex">
                    <Col md={11} lg={13}>
                        <StyledFormImage src={signUpImg} />
                    </Col>
                    <Col sm={16} md={{ span: 12, offset: 1 }} lg={10}>
                        <S.FormWrapper>
                            <S.FormHeader>Create an Account to Start Podcasting Now</S.FormHeader>
                            <S.Form onSubmit={handleSubmit(authenticate)}>
                                <Input name="name" placeholder="Name" gray />
                                <Input name="email" placeholder="Email Address" gray />
                                <Input name="password" placeholder="Password" type="password" gray />
                                <Input name="confirmPassword" placeholder="Confirm Password" type="password" gray />
                                <S.CheckboxWrapper>
                                    <CheckBox name="agreedToContract">
                                        I agree to the{' '}
                                        <S.Link to="/terms" target="_blank">
                                            Terms of Service
                                        </S.Link>{' '}
                                        &amp;{' '}
                                        <S.Link to="/privacy" target="_blank">
                                            Privacy Policy
                                        </S.Link>
                                    </CheckBox>
                                </S.CheckboxWrapper>
                                <FormMessages />
                                <S.ButtonWrapper>
                                    <Button htmlType="submit" fullWidth disabled={isFetching}>
                                        {isFetching ? 'Signing up...' : 'Start Podcasting Now'}
                                    </Button>
                                </S.ButtonWrapper>
                            </S.Form>
                            <S.SwitchFormQuestion>Already a member of Messy?</S.SwitchFormQuestion>
                            <S.Link to="/signin">Sign in here</S.Link>
                            <Community centered smallHeader />
                        </S.FormWrapper>
                    </Col>
                </S.ContentWrapper>
            </S.ScreenWrapper>
        );
    }
}

const SignUp = authHOC('signUp', SignUpContainer);

export default SignUp;
