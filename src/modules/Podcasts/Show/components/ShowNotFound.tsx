import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'antd';
import styled from 'react-emotion';

import { Button } from 'src/shared/components/Button';
import Group from 'src/public/svg/Group.svg';
import { ContentWrapper, SectionWrapper } from 'src/shared/styled/styles';
import { color, font, media } from 'src/styles/variables';

const ContentCol = styled(Col)({
    zIndex: 100,
    marginBottom: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [media.lg]: {
        marginTop: '11.5rem',
        paddingLeft: '10rem',
        display: 'block',
    },
});

const GroupImage = styled.img({
    width: '100%',
    [media.xs]: {
        margin: 0,
    },
    [media.lg]: {
        width: '1200px',
        marginLeft: '-800px',
    },
});

const Title = styled.h1({
    marginBottom: '1rem',
    textAlign: 'center',
    [media.xs]: {
        fontSize: font.size.large,
        textAlign: 'center',
    },
    [media.md]: {
        fontSize: font.size.extraLarge,
    },
    [media.lg]: {
        textAlign: 'left',
    },
});

const SmallText = styled.p({
    marginBottom: '2rem',
    textAlign: 'center',
    color: color.black,
    [media.xs]: {
        textAlign: 'center',
        fontSize: font.size.base,
    },
    [media.md]: {
        textAlign: 'left',
        fontSize: font.size.mediumLarge,
    },
});

const ShowNotFound: React.FC<RouteComponentProps> = props => (
    <SectionWrapper>
        <ContentWrapper>
            <Row>
                <ContentCol lg={18} sm={24}>
                    <Title>This page cannot be found.</Title>

                    <SmallText>We're unable to find the page you're looking for.</SmallText>

                    <Button onClick={() => props.history.push('/')}>Back to home</Button>
                </ContentCol>

                <Col lg={6} sm={24}>
                    <GroupImage src={Group} />
                </Col>
            </Row>
        </ContentWrapper>
    </SectionWrapper>
);

export default withRouter(ShowNotFound);
