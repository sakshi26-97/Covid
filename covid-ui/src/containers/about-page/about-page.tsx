// import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CombinedState } from '../../reducers/interfaces';
import { getAboutAsync } from '../../actions/about-actions';
import AboutComponent from '../../components/about-page/about-page';

interface StateToProps {
    fetching: boolean;
    data: string
}

interface DispatchToProps {
    loadAbout: () => void;
}

function mapStateToProps(state: CombinedState): StateToProps {
    const { about } = state;
    return {
        fetching: about.fetching,
        data: about.data,
    };
}

function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        loadAbout: (): void => dispatch(getAboutAsync()),
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(AboutComponent));
