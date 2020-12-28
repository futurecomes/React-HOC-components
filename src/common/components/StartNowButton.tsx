import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import * as homepageTexts from 'src/modules/Homepage/models/homepageTexts.json';
import { Button, ButtonProps } from 'src/shared/components/Button';

type Props = Partial<ButtonProps> & RouteComponentProps;

const StartNowButtonContainer: React.FC<Props> = props => (
    <Button onClick={() => props.history.push('/join')} {...props}>
        {homepageTexts.common.start}
    </Button>
);

export const StartNowButton = withRouter(StartNowButtonContainer);
