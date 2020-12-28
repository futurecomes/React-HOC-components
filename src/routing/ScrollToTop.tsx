import React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';

export class ScrollToTopContainer extends React.Component<RouteComponentProps> {
    public componentDidUpdate(prevProps: RouteComponentProps): void {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);
        }
    }

    public render(): React.ReactNode {
        return this.props.children;
    }
}

export const ScrollToTop = withRouter(ScrollToTopContainer);
