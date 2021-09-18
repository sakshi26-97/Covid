import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import createRootReducer from './reducers/root-reducer';
import createAppStore, { getAppStore } from './store';
import { CombinedState } from './reducers/interfaces';
import { getAboutAsync } from './actions/about-actions';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

createAppStore(createRootReducer);
const appStore = getAppStore();


interface StateToProps {
    aboutFetching: boolean;
}

interface DispatchToProps {
    loadAbout: () => void;
}

function mapStateToProps(state: CombinedState): StateToProps {
    const { about } = state;
    return {
        aboutFetching: about.fetching,
    };
}

function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        loadAbout: (): void => dispatch(getAboutAsync()),
    };
}

const ReduxAppWrapper = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

ReactDOM.render(
    <Provider store={appStore}>
        <BrowserRouter>
            <ReduxAppWrapper />
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
