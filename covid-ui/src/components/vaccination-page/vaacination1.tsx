import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Center, District, State, VaccinationReport } from '../../reducers/interfaces';
import NavbarComponent from '../navbar-page/navbar-page';
import './styles.scss';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { ArrowUpward } from '@mui/icons-material';
import GroupIcon from '@mui/icons-material/Group';
import FormHelperText from '@mui/material/FormHelperText';
import  moment from "moment";
import { SyringeIcon } from "../../icons";
import Paper from '@material-ui/core/Paper';

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
    getVaccinationReport: () => void;
}

interface VaccinationState {
    tabValue: number;
    pincode: string;
    districtId: string;
    stateId: string;
    error: Record<string, any>
}

type Props = VaccinationProps & RouteComponentProps;

const defaultState = {
    tabValue: 0,
    pincode: "",
    districtId: "",
    stateId: "",
    error: {}
}

export default class Vaccination1Component extends React.PureComponent<Props, VaccinationState> {

    constructor(props: Props) {
        super(props)
        this.state = { ...defaultState }
    }

    public componentDidMount(): void {
        const { getLiveCount, getStates, getVaccinationReport } = this.props;
        getLiveCount();
        getStates();
        getVaccinationReport();
    }

    public handleTabChange = (event: React.SyntheticEvent, newValue: number): void => {
        this.setState({
            tabValue: newValue
        })
    }

    public handlePincodeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            pincode: event.target.value
        })
    }

    public handleDistrictChange = (event: SelectChangeEvent): void => {
        this.setState({
            districtId: event.target.value
        })
    }

    public searchCentersByPin = (): void => {
        const { pincode } = this.state;
        if(pincode === "" || pincode.trim() === "" || pincode.trim().length !== 6) {
            this.setState({
                error: {
                    'pincode': 'Please enter correct pincode'
                }
            })
        } else {
            this.props.searchByPin(pincode, moment(new Date()).format('DD-MM-YYYY'));
            this.setState({
                error: {
                    'pincode': ''
                }
            })
        }
    }

    public searchCentersByDistrict = (): void => {
        const { stateId, districtId } = this.state;
        const stateError = 'Please enter correct state';
        const districtError = 'Please enter correct district';
        if((stateId === "" || stateId.trim() === "") && (districtId === "" || districtId.trim() === "")) {
            this.setState({
                error: {
                    state: stateError,
                    district: districtError
                }
            })
        } else if(stateId === "" || stateId.trim() === "") {
            this.setState({
                error: {
                    state: stateError
                }
            })
        }
        else if(districtId === "" || districtId.trim() === "") {
            this.setState({
                error: {
                    district: districtError
                }
            })
        } else {
            this.props.searchByDistrict(districtId, moment(new Date()).format('DD-MM-YYYY'));
            this.setState({
                error: {
                    state: '',
                    district: ''
                }
            })
        }
    }

    public getDistricts = (event: SelectChangeEvent): void => {
        this.setState({
            stateId: event.target.value
        })
        this.props.getDistricts(event.target.value);
    }

    public render(): JSX.Element {
        const { liveCount, states, district, report, centersByPin } = this.props;
        const { pincode, tabValue, error, stateId, districtId } = this.state;
        console.log(this.props, "====")
        return (
            <>
                <NavbarComponent />

                <Grid sx={{ flexGrow: 1, marginTop: '2%' }} container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={4}>
                            <Grid item>
                                <Card sx={{ minWidth: 250, maxWidth: 300 }}>
                                    <CardContent>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <SyringeIcon />
                                            </Grid>
                                            <Grid item>
                                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                    Total Vaccination Count
                                                </Typography>
                                                <Typography variant="h6" component="div">
                                                    { liveCount.toLocaleString() }
                                                </Typography>
                                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                    Vaccination Today
                                                </Typography>
                                                <Typography variant="h6" component="div">
                                                    { report.vaccination.today.toLocaleString() } {'  '}
                                                    <ArrowUpward style={{color: "#1F3770", marginBottom: '-3px', fontSize: '1.4rem'}} />
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item>
                            <Card sx={{ minWidth: 250, maxWidth: 300 }}>
                                    <CardContent>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <GroupIcon />
                                            </Grid>
                                            <Grid item>
                                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                    Total Vaccination Registration
                                                </Typography>
                                                <Typography variant="h6" component="div">
                                                { report.registration.total.toLocaleString() }
                                                </Typography>
                                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                    Registration Today
                                                </Typography>
                                                <Typography variant="h6" component="div">
                                                    { report.registration.today.toLocaleString() } {'  '}
                                                    <ArrowUpward style={{color: "#1F3770", marginBottom: '-3px', fontSize: '1.4rem'}} />
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        
                                    </CardContent>
                                </Card>
                            </Grid>
                            
                        </Grid>
                    </Grid>
                </Grid>

                <Typography variant="h5" component="div" align="center" gutterBottom style={{ marginTop: '2%', color: '#1F3770' }}>
                    Check Your Nearest Vaccination Center And Slots Availability
                </Typography>

                <Box sx={{ width: '100%', bgcolor: 'background.paper', marginBottom: '2em' }}>
                    <Tabs value={tabValue} onChange={this.handleTabChange} centered>
                        <Tab label="Search By Pin" style={{margin: '20px 20px 0 20px'}} />
                        <Tab label="Search By District" style={{margin: '20px 20px 0 20px'}} />
                    </Tabs>
                </Box>

                {
                    tabValue === 0 ? 
                    (<Grid sx={{ flexGrow: 1 }} container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container justifyContent="center" spacing={4}>
                                <Grid item>
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Enter your PIN" 
                                        variant="outlined" 
                                        required
                                        size="small"
                                        fullWidth
                                        value={pincode}
                                        onChange={this.handlePincodeChange}
                                        error={error?.pincode}
                                        helperText={error?.pincode && error?.pincode}
                                    />
                                </Grid>
                                
                                <Grid item>
                                    <Button variant="contained" onClick={this.searchCentersByPin} className="search-button" >Search</Button>
                                </Grid>
                                
                            </Grid>
                        </Grid>
                    </Grid>) :
                    (
                        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                            <Grid item xs={12}>
                                <Grid container justifyContent="center" spacing={4}>
                                    <Grid item>
                                        <FormControl sx={{ minWidth: 200, maxWidth: 200 }} error={error?.state} size='small'>
                                            <InputLabel id="select-state-label">Select State</InputLabel>
                                            <Select
                                                labelId="simple-select-state-label"
                                                id="simple-select-state"
                                                value={stateId}
                                                label="Select State"
                                                onChange={this.getDistricts}
                                                // renderValue={(value) => value}
                                            >
                                                {
                                                    states.map((state: {
                                                        state_id: string,
                                                        state_name: string
                                                    }) => (
                                                        <MenuItem key={state.state_id} value={state.state_id}>{state.state_name}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                            <FormHelperText>{error?.state && error?.state}</FormHelperText>
                                        </FormControl>
                                            
                                    </Grid>

                                    <Grid item>
                                        <FormControl sx={{ minWidth: 200, maxWidth: 200 }} error={error?.district} size='small'>
                                            <InputLabel id="select-district-label">Select District</InputLabel>
                                            <Select
                                                labelId="simple-select-district-label"
                                                id="simple-select-district"
                                                value={districtId}
                                                label="Select District"
                                                onChange={this.handleDistrictChange}
                                            >
                                                {
                                                    district.map((d: {
                                                        district_id: string,
                                                        district_name: string
                                                    }) => (
                                                        <MenuItem key={d.district_id} value={d.district_id}>{d.district_name}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                            <FormHelperText>{error?.district && error?.district}</FormHelperText>
                                        </FormControl>
                                    </Grid>

                                    <Grid item>
                                        <Button variant="contained" onClick={this.searchCentersByDistrict} className="search-button" >Search</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                }
                
                {
                    tabValue === 0 ?
                    (
                        <Grid sx={{ flexGrow: 1, marginTop: '2%' }} container spacing={2}>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <Typography variant="h6" component="div" gutterBottom /*sx={{fontSize: 14}}*/ style={{marginTop: '1em', color: '#1F3770'}}>
                                            Slot Search Results <Typography color="text.secondary" component="span">({centersByPin.length} centers(s) found)</Typography>
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <Typography variant="caption" display="block" gutterBottom>
                                            Filter results by:
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                    )
                    : (<></>)
                }
                
            </>
        );
    }
}
