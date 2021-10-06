import { TrackerState } from './interfaces';
import { TrackerActions, TrackerAactionTypes } from '../actions/tracker-actions';

const defaultState: TrackerState = {
	countries: [],
	summary: {
		Countries: [],
		Date: '',
		ID: '',
		Message: '',
		Global: {
			Date: '',
			NewConfirmed: '',
			NewDeaths: '',
			NewRecovered: '',
			TotalConfirmed: '',
			TotalDeaths: '',
			TotalRecovered: ''
		}
	},
	countByCountry: [],
	error: null,
	loading: false
};

export default function trackerReducer(state: TrackerState = defaultState, action: TrackerActions): TrackerState {
	switch (action.type) {
		case TrackerAactionTypes.GET_COUNTRIES: {
			return {
				...state
			};
		}
		case TrackerAactionTypes.GET_COUNTRIES_SUCCESS: {
			return {
				...state,
				countries: action.payload.data
			};
		}
		case TrackerAactionTypes.GET_COUNTRIES_FAILURE: {
			return {
				...state,
				error: action.payload.error
			};
		}

		case TrackerAactionTypes.GET_COUNT_BY_COUNTRY: {
			return {
				...state,
				loading: true
			};
		}
		case TrackerAactionTypes.GET_COUNT_BY_COUNTRY_SUCCESS: {
			return {
				...state,
				countByCountry: action.payload.data,
				loading: false
			};
		}
		case TrackerAactionTypes.GET_COUNT_BY_COUNTRY_FAILURE: {
			return {
				...state,
				error: action.payload.error,
				loading: false
			};
		}

		case TrackerAactionTypes.GET_SUMMARY: {
			return {
				...state
			};
		}
		case TrackerAactionTypes.GET_SUMMARY_SUCCESS: {
			return {
				...state,
				summary: action.payload.data
			};
		}
		case TrackerAactionTypes.GET_SUMMARY_FAILURE: {
			return {
				...state,
				error: action.payload.error
			};
		}
		default:
			return state;
	}
}
