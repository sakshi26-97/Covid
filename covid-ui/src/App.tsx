import React, { Suspense } from 'react';
import './App.scss';
import { Redirect, Route, Switch } from 'react-router';

// lazy loading components
const AsyncAbout = React.lazy(() => import('./containers/about-page/about-page'));

function App(): JSX.Element {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<Switch>
				<Route path="/about" component={AsyncAbout} />
				<Redirect to="/about" />
			</Switch>
		</Suspense>
	);
}

export default App;
