import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CombinedState, CountByCountry, Country, Summary, VaccinationReport } from '../../reducers/interfaces';
import TrackerComponent from '../../components/tracker-page/tracker-page';
import { getCountByCountryAsync, getCountriesAsync, getSummaryAsync } from 'actions/tracker-actions';

interface StateToProps {
	countries: Country[];
	summary: Summary;
	countByCountry: CountByCountry[];
	error: string | null;
	report: VaccinationReport;
	loading: boolean;
}

interface DispatchToProps {
	getCountries: () => void;
	getCountByCountry: (countryName: string) => void;
	getSummary: () => void;
}

function mapStateToProps(state: CombinedState): StateToProps {
	const { tracker, vaccination } = state;
	const { countries, countByCountry, summary, error, loading } = tracker;
	const { report } = vaccination;
	return {
		countries,
		countByCountry,
		summary,
		error,
		report,
		loading
	};
}

function mapDispatchToProps(dispatch: any): DispatchToProps {
	return {
		getCountries: () => dispatch(getCountriesAsync()),
		getCountByCountry: (countryName: string) => dispatch(getCountByCountryAsync(countryName)),
		getSummary: () => dispatch(getSummaryAsync())
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrackerComponent));
