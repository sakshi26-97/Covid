import { ActionUnion, createAction, ThunkAction } from '../utils/redux';
import axios from 'axios';
import consts from '../consts';
import { CountByCountry, Country, Summary } from '../reducers/interfaces';

export enum TrackerAactionTypes {
	GET_COUNTRIES = 'GET_COUNTRIES',
	GET_COUNTRIES_SUCCESS = 'GET_COUNTRIES_SUCCESS',
	GET_COUNTRIES_FAILURE = 'GET_COUNTRIES_FAILURE',

	GET_COUNT_BY_COUNTRY = 'GET_COUNT_BY_COUNTRY',
	GET_COUNT_BY_COUNTRY_SUCCESS = 'GET_COUNT_BY_COUNTRY_SUCCESS',
	GET_COUNT_BY_COUNTRY_FAILURE = 'GET_COUNT_BY_COUNTRY_FAILURE',

	GET_SUMMARY = 'GET_SUMMARY',
	GET_SUMMARY_SUCCESS = 'GET_SUMMARY_SUCCESS',
	GET_SUMMARY_FAILURE = 'GET_SUMMARY_FAILURE'
}

const trackerActions = {
	getCountries: () => createAction(TrackerAactionTypes.GET_COUNTRIES),
	getCountriesSuccess: (data: Country[]) => createAction(TrackerAactionTypes.GET_COUNTRIES_SUCCESS, { data }),
	getCountriesFailed: (error: any) => createAction(TrackerAactionTypes.GET_COUNTRIES_FAILURE, { error }),

	getCountByCountry: () => createAction(TrackerAactionTypes.GET_COUNT_BY_COUNTRY),
	getCountByCountrySuccess: (data: CountByCountry[]) =>
		createAction(TrackerAactionTypes.GET_COUNT_BY_COUNTRY_SUCCESS, { data }),
	getCountByCountryFailed: (error: any) => createAction(TrackerAactionTypes.GET_COUNT_BY_COUNTRY_FAILURE, { error }),

	getSummary: () => createAction(TrackerAactionTypes.GET_SUMMARY),
	getSummarySuccess: (data: Summary) => createAction(TrackerAactionTypes.GET_SUMMARY_SUCCESS, { data }),
	getSummaryFailed: (error: any) => createAction(TrackerAactionTypes.GET_SUMMARY_FAILURE, { error })
};

export type TrackerActions = ActionUnion<typeof trackerActions>;

export const getCountriesAsync =
	(): ThunkAction =>
	async (dispatch): Promise<void> => {
		dispatch(trackerActions.getCountries());

		try {
			const response = (await axios.get(`${consts.COVID_BACKEND_URL}/tracker/country`)).data;
			dispatch(trackerActions.getCountriesSuccess(response));
		} catch (error) {
			dispatch(trackerActions.getCountriesFailed(error));
		}
	};

export const getCountByCountryAsync =
	(countryName: string): ThunkAction =>
	async (dispatch): Promise<void> => {
		dispatch(trackerActions.getCountByCountry());

		try {
			const response = (await axios.get(`${consts.COVID_BACKEND_URL}/tracker/country/${countryName}`)).data;
			dispatch(trackerActions.getCountByCountrySuccess(response));
		} catch (error) {
			dispatch(trackerActions.getCountByCountryFailed(error));
		}
	};

export const getSummaryAsync =
	(): ThunkAction =>
	async (dispatch): Promise<void> => {
		dispatch(trackerActions.getSummary());

		try {
			const response = (await axios.get(`${consts.COVID_BACKEND_URL}/tracker/summary`)).data;
			dispatch(trackerActions.getSummarySuccess(response));
		} catch (error) {
			dispatch(trackerActions.getSummaryFailed(error));
		}
	};
