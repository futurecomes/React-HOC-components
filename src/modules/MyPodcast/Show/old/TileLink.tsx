import React, { FunctionComponent } from 'react';

import { StyledLink, StyledRouterLink } from 'src/shared/styled/tileLinks';

interface Props {
    title: string;
    icon: string;
    link?: string;
    internal?: boolean;
    onClick?: (e: React.MouseEvent) => any;
    isActive?: boolean;
}

export const TileLink: FunctionComponent<Props> = ({ internal, title, icon, link, onClick, isActive }) =>
    internal ? (
        <StyledRouterLink to={link!}>
            <img src={icon} alt={title} />
        </StyledRouterLink>
    ) : (
        <StyledLink href={link} target="_blank" rel="noopener noreferer" onClick={onClick} active={isActive}>
            <img src={icon} alt={title} />
        </StyledLink>
    );
