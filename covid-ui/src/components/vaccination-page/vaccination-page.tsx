import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Center, District, State, VaccinationReport } from '../../reducers/interfaces';
import NavbarComponent from '../navbar-page/navbar-page';
import './styles.scss';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import GroupIcon from '@mui/icons-material/Group';
import moment from 'moment';
import { SyringeIcon } from '../../icons';
import { StatsComponent } from 'components/stats-page/stats-page';
import SlotsComponent from 'components/slots-page/slots-page';
import Autocomplete from '@mui/material/Autocomplete';

interface VaccinationProps {
	liveCount: number;
	states: State[];
	district: District[];
	centersByPin: Center[];
	centersByDistrict: Center[];
	error: string | null;
	report: VaccinationReport;
	getLiveCount: () => void;
	getStates: () => void;
	getDistricts: (stateId: string) => void;
	searchByPin: (pincode: string, date: string) => void;
	searchByDistrict: (districtId: string, date: string) => void;
}

interface VaccinationState {
	tabValue: number;
	pincode: string;
	districtId: string;
	stateId: string;
	error: Record<string, any>;
	tableHeader: string[];
}

type Props = VaccinationProps & RouteComponentProps;

const defaultState = {
	tabValue: 0,
	pincode: '',
	districtId: '',
	stateId: '',
	error: {},
	tableHeader: []
};

export default class VaccinationComponent extends React.PureComponent<Props, VaccinationState> {
	constructor(props: Props) {
		super(props);
		this.state = { ...defaultState };
	}

	public componentDidMount(): void {
		const { getLiveCount, getStates } = this.props;
		getLiveCount();
		getStates();
	}

	public handleTabChange = (event: React.SyntheticEvent, newValue: number): void => {
		this.setState({
			tabValue: newValue
		});
	};

	public handlePincodeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		this.setState({
			pincode: event.target.value
		});
	};

	public handleDistrictChange = (event: React.SyntheticEvent, district: District): void => {
		this.setState({
			districtId: district.district_id
		});
	};

	public generateTableHeader = (date: Date): void => {
		let header = [''];
		for (let i = 0; i < 5; i++) {
			header.push(moment(date).add(i, 'd').format('DD MMM YYYY'));
		}
		this.setState({
			tableHeader: header
		});
	};

	public searchCentersByPin = (): void => {
		const { pincode } = this.state;
		if (pincode === '' || pincode.trim() === '' || pincode.trim().length !== 6) {
			this.setState({
				error: {
					pincode: 'Please enter correct pincode'
				}
			});
		} else {
			const date = new Date();
			this.props.searchByPin(pincode, moment(date).format('DD-MM-YYYY'));
			this.generateTableHeader(date);
			this.setState({
				error: {
					pincode: ''
				}
			});
		}
	};

	public searchCentersByDistrict = (): void => {
		const { stateId, districtId } = this.state;
		const stateError = 'Please enter correct state';
		const districtError = 'Please enter correct district';
		if ((stateId === '' || stateId.trim() === '') && (districtId === '' || districtId.trim() === '')) {
			this.setState({
				error: {
					state: stateError,
					district: districtError
				}
			});
		} else if (stateId === '' || stateId.trim() === '') {
			this.setState({
				error: {
					state: stateError
				}
			});
		} else if (districtId === '' || districtId.trim() === '') {
			this.setState({
				error: {
					district: districtError
				}
			});
		} else {
			const date = new Date();
			this.props.searchByDistrict(districtId, moment(date).format('DD-MM-YYYY'));
			this.generateTableHeader(date);
			this.setState({
				error: {
					state: '',
					district: ''
				}
			});
		}
	};

	public getDistricts = (event: React.SyntheticEvent, state: State): void => {
		this.setState({
			stateId: state.state_id
		});
		this.props.getDistricts(state.state_id);
	};

	public render(): JSX.Element {
		const { liveCount, states, district, report, centersByPin, centersByDistrict, history, location, match } =
			this.props;
		const { pincode, tabValue, error, tableHeader } = this.state;
		return (
			<>
				<NavbarComponent history={history} location={location} match={match} />

				<Box flexGrow={1} display="flex" className="box-container">
					<Grid container sx={{ flexGrow: 1 }} rowSpacing={2} columnSpacing={2}>
						<Grid item xs={12}>
							<Grid container justifyContent="center" spacing={4}>
								<Grid item>
									<StatsComponent
										caption1="Total Vaccination Count"
										caption2="Vaccination Today"
										value1={report.vaccination.total_doses.toLocaleString()}
										value2={liveCount.toLocaleString()}
										icon={<SyringeIcon />}
									/>
								</Grid>

								<Grid item>
									<StatsComponent
										caption1="Total Vaccination Registration"
										caption2="Registration Today"
										value1={report.registration.total.toLocaleString()}
										value2={report.registration.today.toLocaleString()}
										icon={<GroupIcon />}
									/>
								</Grid>
							</Grid>
						</Grid>

						<Grid item xs={12}>
							<Grid container justifyContent="center">
								<Grid item>
									<Typography
										variant="h5"
										component="div"
										align="center"
										gutterBottom
										style={{ marginTop: '2%', color: '#1F3770' }}
									>
										Check Your Nearest Vaccination Center And Slots Availability
									</Typography>
								</Grid>
							</Grid>
						</Grid>

						<Grid item xs={12}>
							<Grid container justifyContent="center">
								<Grid item>
									<Tabs value={tabValue} onChange={this.handleTabChange} centered>
										<Tab label="Search By Pin" className="tab-value" />
										<Tab label="Search By District" className="tab-value" />
									</Tabs>
								</Grid>
							</Grid>
						</Grid>

						{tabValue === 0 ? (
							<Grid item xs={12}>
								<Grid container justifyContent="center" spacing={4}>
									<Grid item>
										<TextField
											style={{ minWidth: 200, maxWidth: 200 }}
											id="outlined-basic"
											label="Enter your PIN"
											variant="outlined"
											required
											size="small"
											fullWidth
											value={pincode}
											onChange={this.handlePincodeChange}
											error={error?.pincode}
											helperText={error?.pincode}
										/>
									</Grid>

									<Grid item>
										<Button variant="contained" onClick={this.searchCentersByPin} className="search-button">
											Search
										</Button>
									</Grid>
								</Grid>
							</Grid>
						) : (
							<Grid item xs={12}>
								<Grid container justifyContent="center" spacing={4}>
									<Grid item>
										<Autocomplete
											id="state"
											disableClearable
											options={states}
											getOptionLabel={(option: State) => option.state_name}
											sx={{ minWidth: 200, maxWidth: 200 }}
											size="small"
											onChange={(event: React.SyntheticEvent, state: State) => this.getDistricts(event, state)}
											renderInput={params => (
												<TextField
													{...params}
													label="Select State"
													InputProps={{
														...params.InputProps,
														type: 'search'
													}}
													error={error?.state}
													helperText={error?.state}
												/>
											)}
										/>
									</Grid>

									<Grid item>
										<Autocomplete
											id="district"
											disableClearable
											options={district}
											getOptionLabel={(option: District) => option.district_name}
											sx={{ minWidth: 200, maxWidth: 200 }}
											size="small"
											onChange={(event: React.SyntheticEvent, d: District) => this.handleDistrictChange(event, d)}
											renderInput={params => (
												<TextField
													{...params}
													label="Select District"
													InputProps={{
														...params.InputProps,
														type: 'search'
													}}
													error={error?.district}
													helperText={error?.district}
												/>
											)}
										/>
									</Grid>

									<Grid item>
										<Button variant="contained" onClick={this.searchCentersByDistrict} className="search-button">
											Search
										</Button>
									</Grid>
								</Grid>
							</Grid>
						)}

						{tabValue === 0 && centersByPin.length > 0 ? (
							<SlotsComponent tableHeader={tableHeader} centers={centersByPin} />
						) : tabValue === 1 && centersByDistrict.length > 0 ? (
							<SlotsComponent tableHeader={tableHeader} centers={centersByDistrict} />
						) : null}
					</Grid>
				</Box>
			</>
		);
	}
}
