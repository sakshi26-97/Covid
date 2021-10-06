// import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Center, CombinedState, District, State, VaccinationReport } from '../../reducers/interfaces';
import {
	getLiveCountAsync,
	getStatesAsync,
	getDistrictsAsync,
	searchByPinAsync,
	searchByDistrictAsync
} from '../../actions/vaccination-actions';
import VaccinationComponent from '../../components/vaccination-page/vaccination-page';

interface StateToProps {
	fetching: boolean;
	liveCount: number;
	states: State[];
	district: District[];
	centersByPin: Center[];
	centersByDistrict: Center[];
	error: string | null;
	report: VaccinationReport;
}

interface DispatchToProps {
	getLiveCount: () => void;
	getStates: () => void;
	getDistricts: (stateId: string) => void;
	searchByPin: (pincode: string, date: string) => void;
	searchByDistrict: (districtId: string, date: string) => void;
}

function mapStateToProps(state: CombinedState): StateToProps {
	const { vaccination } = state;
	const { fetching, liveCount, states, district, centersByPin, centersByDistrict, error, report } = vaccination;
	return {
		fetching,
		liveCount,
		states,
		district,
		centersByPin,
		centersByDistrict,
		error,
		report
	};
}

function mapDispatchToProps(dispatch: any): DispatchToProps {
	return {
		getLiveCount: (): void => dispatch(getLiveCountAsync()),
		getStates: (): void => dispatch(getStatesAsync()),
		getDistricts: (stateId: string): void => dispatch(getDistrictsAsync(stateId)),
		searchByPin: (pincode: string, date: string): void => dispatch(searchByPinAsync(pincode, date)),
		searchByDistrict: (districtId: string, date: string): void => dispatch(searchByDistrictAsync(districtId, date))
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VaccinationComponent));
