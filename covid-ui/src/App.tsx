import React, { Suspense, useEffect } from 'react';
import './App.scss';
import { Redirect, Route, Switch } from 'react-router';
import { RouteComponentProps } from "react-router-dom";

// lazy loading components
const AsyncTracker = React.lazy(() => import('./containers/tracker-page/tracker-page'));
const AsyncVaccination = React.lazy(() => import('./containers/vaccination-page/vaccination-page'));

interface Props {
	getVaccinationReport: () => void;
}

function App(props: Props & RouteComponentProps): JSX.Element {
	useEffect(() => {
		props.getVaccinationReport();
	}, [props.getVaccinationReport]);

	return (
		<Suspense fallback={<p>Loading...</p>}>
			<Switch>
				<Route path="/tracker" component={AsyncTracker} />
				<Route path="/vaccination" component={AsyncVaccination} />
				<Redirect to="/tracker" />
			</Switch>
		</Suspense>
	);
}

export default App;
