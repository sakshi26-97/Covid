import React from 'react';
import { RouteComponentProps } from 'react-router';

interface AboutProps {
    fetching: boolean,
    data: string,
    loadAbout: () => void
}

type Props = AboutProps & RouteComponentProps;

export default class AboutComponent extends React.PureComponent<Props> {
    public componentDidMount(): void {
        const { loadAbout } = this.props;
        loadAbout();
    }

    public render(): JSX.Element {
        const { fetching, data } = this.props;
        return (
            <>
                <p>{fetching ? 'true' : 'false'} - {data}</p>
            </>
        );
    }
}
