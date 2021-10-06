import { ActionUnion, createAction, ThunkAction } from '../utils/redux';
import axios from 'axios';
import consts from '../consts';
import { Center, District, State, VaccinationReport } from '../reducers/interfaces';

export enum VaccinationAactionTypes {
	GET_LIVE_COUNT = 'GET_LIVE_COUNT',
	GET_LIVE_COUNT_SUCCESS = 'GET_LIVE_COUNT_SUCCESS',
	GET_LIVE_COUNT_FAILURE = 'GET_LIVE_COUNT_FAILURE',

	GET_STATES = 'GET_STATES',
	GET_STATES_SUCCESS = 'GET_STATES_SUCCESS',
	GET_STATES_FAILURE = 'GET_STATES_FAILURE',

	GET_DISTRICTS = 'GET_DISTRICTS',
	GET_DISTRICTS_SUCCESS = 'GET_DISTRICTS_SUCCESS',
	GET_DISTRICTS_FAILURE = 'GET_DISTRICTS_FAILURE',

	SEARCH_BY_PIN = 'SEARCH_BY_PIN',
	SEARCH_BY_PIN_SUCCESS = 'SEARCH_BY_PIN_SUCCESS',
	SEARCH_BY_PIN_FAILURE = 'SEARCH_BY_PIN_FAILURE',

	SEARCH_BY_DISTRICT = 'SEARCH_BY_DISTRICT',
	SEARCH_BY_DISTRICT_SUCCESS = 'SEARCH_BY_DISTRICT_SUCCESS',
	SEARCH_BY_DISTRICT_FAILURE = 'SEARCH_BY_DISTRICT_FAILURE',

	GET_VACCINATION_REPORT = 'GET_VACCINATION_REPORT',
	GET_VACCINATION_REPORT_SUCCESS = 'GET_VACCINATION_REPORT_SUCCESS',
	GET_VACCINATION_REPORT_FAILURE = 'GET_VACCINATION_REPORT_FAILURE'
}

const vaccinationActions = {
	getLiveCount: () => createAction(VaccinationAactionTypes.GET_LIVE_COUNT),
	getLiveCountSuccess: (data: { count: number }) =>
		createAction(VaccinationAactionTypes.GET_LIVE_COUNT_SUCCESS, { data }),
	getLiveCountFailed: (error: any) => createAction(VaccinationAactionTypes.GET_LIVE_COUNT_FAILURE, { error }),

	getStates: () => createAction(VaccinationAactionTypes.GET_STATES),
	getStatesSuccess: (data: State[]) => createAction(VaccinationAactionTypes.GET_STATES_SUCCESS, { data }),
	getStatesFailed: (error: any) => createAction(VaccinationAactionTypes.GET_STATES_FAILURE, { error }),

	getDistricts: () => createAction(VaccinationAactionTypes.GET_DISTRICTS),
	getDistrictsSuccess: (data: District[]) => createAction(VaccinationAactionTypes.GET_DISTRICTS_SUCCESS, { data }),
	getDistrictsFailed: (error: any) => createAction(VaccinationAactionTypes.GET_DISTRICTS_FAILURE, { error }),

	searchByPin: () => createAction(VaccinationAactionTypes.SEARCH_BY_PIN),
	searchByPinSuccess: (data: Center[]) => createAction(VaccinationAactionTypes.SEARCH_BY_PIN_SUCCESS, { data }),
	searchByPinFailed: (error: any) => createAction(VaccinationAactionTypes.SEARCH_BY_PIN_FAILURE, { error }),

	searchByDistrict: () => createAction(VaccinationAactionTypes.SEARCH_BY_DISTRICT),
	searchByDistrictSuccess: (data: Center[]) =>
		createAction(VaccinationAactionTypes.SEARCH_BY_DISTRICT_SUCCESS, { data }),
	searchByDistrictFailed: (error: any) => createAction(VaccinationAactionTypes.SEARCH_BY_DISTRICT_FAILURE, { error }),

	getVaccinationReport: () => createAction(VaccinationAactionTypes.GET_VACCINATION_REPORT),
	getVaccinationReportSuccess: (data: VaccinationReport) =>
		createAction(VaccinationAactionTypes.GET_VACCINATION_REPORT_SUCCESS, { data }),
	getVaccinationReportFailed: (error: any) =>
		createAction(VaccinationAactionTypes.GET_VACCINATION_REPORT_FAILURE, { error })
};

export type VaccinationActions = ActionUnion<typeof vaccinationActions>;

export const getLiveCountAsync =
	(): ThunkAction =>
	async (dispatch): Promise<void> => {
		dispatch(vaccinationActions.getLiveCount());

		try {
			const response = (await axios.get(`${consts.COVID_BACKEND_URL}/vaccination/live/count`)).data;
			dispatch(vaccinationActions.getLiveCountSuccess(response));
		} catch (error) {
			dispatch(vaccinationActions.getLiveCountFailed(error));
		}
	};

export const getStatesAsync =
	(): ThunkAction =>
	async (dispatch): Promise<void> => {
		dispatch(vaccinationActions.getStates());

		try {
			const response = (await axios.get(`${consts.COVID_BACKEND_URL}/vaccination/state`)).data;
			dispatch(vaccinationActions.getStatesSuccess(response));
		} catch (error) {
			dispatch(vaccinationActions.getStatesFailed(error));
		}
	};

export const getDistrictsAsync =
	(stateId: string): ThunkAction =>
	async (dispatch): Promise<void> => {
		dispatch(vaccinationActions.getDistricts());

		try {
			const response = (await axios.get(`${consts.COVID_BACKEND_URL}/vaccination/district/${stateId}`)).data;
			dispatch(vaccinationActions.getDistrictsSuccess(response));
		} catch (error) {
			dispatch(vaccinationActions.getDistrictsFailed(error));
		}
	};

export const searchByPinAsync =
	(pincode: string, date: string): ThunkAction =>
	async (dispatch): Promise<void> => {
		dispatch(vaccinationActions.searchByPin());

		try {
			const response = (
				await axios.get(`${consts.COVID_BACKEND_URL}/vaccination/search/pin?pincode=${pincode}&date=${date}`)
			).data;
			dispatch(vaccinationActions.searchByPinSuccess(response));
		} catch (error) {
			dispatch(vaccinationActions.searchByPinFailed(error));
		}
	};

export const searchByDistrictAsync =
	(districtId: string, date: string): ThunkAction =>
	async (dispatch): Promise<void> => {
		dispatch(vaccinationActions.searchByDistrict());

		try {
			const response = (
				await axios.get(`${consts.COVID_BACKEND_URL}/vaccination/search/district?districtId=${districtId}&date=${date}`)
			).data;
			dispatch(vaccinationActions.searchByDistrictSuccess(response));
		} catch (error) {
			dispatch(vaccinationActions.searchByDistrictFailed(error));
		}
	};

export const getVaccinationReportAsync =
	(): ThunkAction =>
	async (dispatch): Promise<void> => {
		dispatch(vaccinationActions.getVaccinationReport());

		try {
			const response = (await axios.get(`${consts.COVID_BACKEND_URL}/vaccination/report`)).data;
			dispatch(vaccinationActions.getVaccinationReportSuccess(response));
		} catch (error) {
			dispatch(vaccinationActions.getVaccinationReportFailed(error));
		}
	};
