import { Icon, Tooltip } from 'antd';
import copy from 'copy-to-clipboard';
import React, { FunctionComponent, useState } from 'react';
import styled from 'react-emotion';

const StyledLink = styled(Icon)({
    marginLeft: '0.5rem',
    position: 'relative',
    top: 2,
});

interface Props {
    url: string;
}

export const SingleListedEpisodeLink: FunctionComponent<Props> = ({ url }) => {
    const defaultTooltip = 'Copy link to this episode';

    const [tooltipState, changeTooltipState] = useState(defaultTooltip);

    const handleOnClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        copy(url);
        changeTooltipState('Link copied to clipboard.');
        setTimeout(() => changeTooltipState(defaultTooltip), 3000);
    };

    return (
        <Tooltip title={tooltipState}>
            <StyledLink type="link" onClick={handleOnClick} />
        </Tooltip>
    );
};
