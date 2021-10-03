import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createRootReducer from './reducers/root-reducer';
import createAppStore, { getAppStore } from './store';
import { CombinedState, VaccinationReport } from './reducers/interfaces';
import './styles.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { getVaccinationReportAsync } from './actions/vaccination-actions';

createAppStore(createRootReducer);
const appStore = getAppStore();

interface StateToProps {
	report: VaccinationReport;
}

interface DispatchToProps {
	getVaccinationReport: () => void;
}

function mapStateToProps(state: CombinedState): StateToProps {
	const { vaccination } = state;
	return {
		report: vaccination.report
	};
}

function mapDispatchToProps(dispatch: any): DispatchToProps {
	return {
		getVaccinationReport: (): void => dispatch(getVaccinationReportAsync())
	};
}

const ReduxAppWrapper = connect(mapStateToProps, mapDispatchToProps)(App);

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
