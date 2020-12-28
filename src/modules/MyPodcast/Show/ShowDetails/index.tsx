import { Col } from 'antd';
import * as React from 'react';

import { ShowLinks } from '../old/ShowLinks';
import { ShowModel } from '../../models';
import { Author, Badge, Description, Image, ShowTitle, StyledColumn, StyledRow } from './style';

interface Props {
    show: ShowModel;
}

export const ShowDetails: React.FC<Props> = ({ show }) => (
    <Col lg={11} md={24}>
        <StyledRow>
            <Image src={show.imageUrl} />

            <StyledColumn>
                <ShowTitle>{show.title}</ShowTitle>

                <Author>by {show.creatorName}</Author>

                {show.isTrending && !show.wasTrending && <Badge>Is Trending</Badge>}

                {show.wasTrending && !show.isTrending && <Badge>Previously Top & Trending</Badge>}

                <ShowLinks show={show} isUserLoggedIn={true} />
            </StyledColumn>
        </StyledRow>

        <Description>{show.description}</Description>
    </Col>
);
