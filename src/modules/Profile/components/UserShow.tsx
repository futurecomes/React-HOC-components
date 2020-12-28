import { Col, Row } from 'antd';
import React from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';

import { AppState } from 'src/config/appState';
import { getUserLoginStatus, getUserToken } from 'src/modules/Auth/selectors/authSelectors';
import { Show } from 'src/modules/Podcasts/models/podcasts';
import { ShowLinks } from 'src/modules/Podcasts/Show/components/ShowLinks';
import { color, font, media } from 'src/styles/variables';

const placeholder = 'https://s3.amazonaws.com/messybun/Messy+Bun+Pineapple.jpg';

const UserShowWrapper = styled(Row)({
    padding: '2rem 0',
    '& + &': {
        borderTop: `1px solid ${color.gallery}`,
    },
});

const CoverArt = styled.img({
    display: 'block',
    width: '100%',
    maxWidth: '10rem',
    marginBottom: '1rem',
    [media.sm]: {
        maxWidth: '100%',
        marginBottom: 0,
    },
});

const Title = styled.h3(
    {
        marginBottom: '1rem',
    },
    font.normal(font.size.medium),
);

interface StateProps {
    isUserLoggedIn: boolean;
    token?: string;
}

interface Props extends StateProps {
    show: Show;
}

export class UserShowContainer extends React.Component<Props> {
    public render(): JSX.Element {
        const { show, isUserLoggedIn, token } = this.props;

        return (
            <UserShowWrapper>
                <Col sm={8} md={6}>
                    <CoverArt src={show.imageUrl || placeholder} />
                </Col>
                <Col sm={{ span: 15, offset: 1 }} md={{ span: 12, offset: 1 }}>
                    <Title>{show.title}</Title>
                    <ShowLinks show={show} token={token} isUserLoggedIn={isUserLoggedIn} showPlayOnMessy />
                </Col>
            </UserShowWrapper>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    isUserLoggedIn: getUserLoginStatus(state),
    token: getUserToken(state),
});

export const UserShow = connect(mapStateToProps)(UserShowContainer);
