import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Center, District, State, VaccinationReport, Session } from '../../reducers/interfaces';
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
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import  moment from "moment";
import { SyringeIcon } from "../../icons";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';

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
    tableHeader: string[]
}

type Props = VaccinationProps & RouteComponentProps;

const defaultState = {
    tabValue: 0,
    pincode: "",
    districtId: "",
    stateId: "",
    error: {},
    tableHeader: []
}

export default class VaccinationComponent extends React.PureComponent<Props, VaccinationState> {

    constructor(props: Props) {
        super(props)
        this.state = { ...defaultState }
    }

    public componentDidMount(): void {
        const { getLiveCount, getStates } = this.props;
        getLiveCount();
        getStates();

        //remove later
        this.generateTableHeader(new Date());
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

    public generateTableHeader = (date: Date): void => {
        let header = [''];
        for(let i=0; i<5; i++) {
            header.push(moment(date).add(i, 'd').format('DD MMM YYYY'));
        }
        this.setState({
            tableHeader: header
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
            const date = new Date();
            this.props.searchByPin(pincode, moment(date).format('DD-MM-YYYY'));
            this.generateTableHeader(date);
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
            const date = new Date();
            this.props.searchByDistrict(districtId, moment(date).format('DD-MM-YYYY'));
            this.generateTableHeader(date);
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
        const { liveCount, states, district, report, centersByPin, history, location, match } = this.props;
        const { pincode, tabValue, error, stateId, districtId, tableHeader } = this.state;
        return (
            <>
                <NavbarComponent history={history} location={location} match={match} />

                <Box flexGrow={1} display="flex" style={{margin: '2em 6em'}}>
                    <Grid container sx={{flexGrow: 1}} rowSpacing={2} columnSpacing={2}>
                        <Grid item xs={12}>
                            <Grid container justifyContent='center' spacing={4}>
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

                        <Grid item xs={12}>
                            <Grid container justifyContent='center'>
                                <Grid item>
                                    <Typography variant="h5" component="div" align="center" gutterBottom style={{ marginTop: '2%', color: '#1F3770' }}>
                                        Check Your Nearest Vaccination Center And Slots Availability
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container justifyContent='center'>
                                <Grid item>
                                <Tabs value={tabValue} onChange={this.handleTabChange} centered>
                                    <Tab label="Search By Pin" style={{margin: '0 20px 0 20px'}} />
                                    <Tab label="Search By District" style={{margin: '0 20px 0 20px'}} />
                                </Tabs>
                                </Grid>
                            </Grid>
                        </Grid>


                        {
                            tabValue === 0 
                            ?
                            (
                                <Grid item xs={12}>
                                    <Grid container justifyContent='center' spacing={4}>
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
                                                helperText={error?.pincode}
                                            />
                                        </Grid>

                                        <Grid item>
                                            <Button variant="contained" onClick={this.searchCentersByPin} className="search-button" >Search</Button>
                                        </Grid>
                                    </Grid>
                                </Grid> 
                            )
                            :
                            (
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
                                                <FormHelperText>{error?.state}</FormHelperText>
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
                                                <FormHelperText>{error?.district}</FormHelperText>
                                            </FormControl>
                                        </Grid>

                                        <Grid item>
                                            <Button variant="contained" onClick={this.searchCentersByDistrict} className="search-button" >Search</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                        }

                        <Grid item xs={12}>
                            <Grid container justifyContent='flex-start'>
                                <Grid item>
                                    <Typography variant="h6" component="div" gutterBottom style={{color: '#1F3770'}}>
                                        Slot Search Results <Typography color="text.secondary" component="span">({centersByPin.length} centers(s) found)</Typography>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item>
                                    <Typography variant="caption" display="block" gutterBottom>
                                        Filter results by:
                                    </Typography>
                                </Grid>

                                <Grid item>
                                    <Divider orientation="vertical" variant="middle" flexItem style={{height: '2em'}} />
                                </Grid>

                                <Grid item>
                                    <Grid container direction='column'>
                                        <Grid item>
                                            <Typography variant="h6" component="div" gutterBottom style={{color: '#1F3770'}}>
                                                Age
                                            </Typography>
                                        </Grid>

                                        <Grid item>
                                            <Grid container>
                                                <Grid item>
                                                    <Button variant="outlined" >18 & Above</Button>
                                                </Grid> 
                                                <Grid item>
                                                    <Button variant="outlined" >18-44 Only</Button>
                                                </Grid> 
                                                <Grid item>
                                                    <Button variant="outlined" >45 & Above</Button>
                                                </Grid>  
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Grid>

                                <Grid item>
                                    <Divider orientation="vertical" variant="middle" flexItem style={{height: '2em'}} />
                                </Grid>

                                <Grid item>
                                    <Grid container direction='column'>
                                        <Grid item>
                                            <Typography variant="h6" component="div" gutterBottom style={{color: '#1F3770'}}>
                                                Cost
                                            </Typography>
                                        </Grid>

                                        <Grid item>
                                            <Grid container>
                                                <Grid item>
                                                    <Button variant="outlined" >Paid</Button>
                                                </Grid> 
                                                <Grid item>
                                                    <Button variant="outlined" >Free</Button>
                                                </Grid> 
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Grid>

                                <Grid item>
                                    <Divider orientation="vertical" variant="middle" flexItem style={{height: '2em'}} />
                                </Grid>

                                <Grid item>
                                    <Grid container direction='column'>
                                        <Grid item>
                                            <Typography variant="h6" component="div" gutterBottom style={{color: '#1F3770'}}>
                                                Vaccine
                                            </Typography>
                                        </Grid>

                                        <Grid item>
                                            <Grid container>
                                                <Grid item>
                                                    <Button variant="outlined" >Covishield</Button>
                                                </Grid> 
                                                <Grid item>
                                                    <Button variant="outlined" >Covaxin</Button>
                                                </Grid> 
                                                <Grid item>
                                                    <Button variant="outlined" >Sputnik V</Button>
                                                </Grid> 
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>
                        
                        <Grid item xs={12}>
                            <Paper sx={{minWidth: '100%', maxWidth: '100%'}}>
                                <TableContainer>
                                    <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                        {tableHeader.map((header: string, index: number) => (
                                            <TableCell
                                                key={index}
                                                
                                                style={{ minWidth: 170 }}
                                            >
                                            { header }
                                            </TableCell>
                                        ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            centersByPin
                                            .map((center: Center) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={center.center_id}>
                                                        <TableCell key={center.center_id} >
                                                            <Typography variant="subtitle2" component="div" gutterBottom style={{ color: '#1F3770' }}>
                                                                { center.name }{' '} 
                                                                {
                                                                    center.fee_type === 'Paid'
                                                                    ? 
                                                                    <Chip size='small' label={center.fee_type.toUpperCase()} style={{backgroundColor: '#1F3770', color: '#ffffff'}} />
                                                                    :
                                                                    <Chip size='small' label={center.fee_type.toUpperCase()} variant='outlined' />
                                                                }
                                                            </Typography>
                                                            <Typography variant="caption" component="div" color='text.secondary' gutterBottom >
                                                                { center.address }{', '}{center.district_name}{', '}{center.state_name}{', '}{center.pincode}
                                                            </Typography>
                                                            {
                                                                center.vaccine_fees && center.vaccine_fees.map((vaccine_fee: {
                                                                    vaccine: string;
                                                                    fee: string
                                                                }, index: number) => (
                                                                    <Typography key={index} variant="overline" component="div" color='text.secondary' gutterBottom>
                                                                        {vaccine_fee.vaccine}{': ' }{'\u20B9'}{vaccine_fee.fee}
                                                                    </Typography>
                                                                ))
                                                            }
                                                        </TableCell>

                                                        <TableCell >
                                                            {
                                                                center.sessions.filter((session: Session) => {
                                                                    return moment(session.date, 'DD-MM-YYYY').format('DD MMM YYYY') === tableHeader[1]
                                                                }).map((session: Session) => (
                                                                    // <p>{session.available_capacity}</p>
                                                                    <Grid container key={session.session_id} direction='column'>
                                                                        <Grid item>
                                                                            <Typography variant="button" component="div" gutterBottom color='text.secondary'>
                                                                                {session.vaccine}
                                                                            </Typography>
                                                                        </Grid>
                                                                            
                                                                        <Grid item>
                                                                            <Typography variant="body2" component="div" gutterBottom>
                                                                                Available Dose 1: {' '}
                                                                                <Typography variant="subtitle2" component="span" gutterBottom>
                                                                                    {session.available_capacity_dose1}
                                                                                </Typography>
                                                                            </Typography>
                                                                        </Grid>

                                                                        <Grid item >
                                                                            <Typography variant="body2" component="div" gutterBottom>
                                                                                Available Dose 2: {' '}
                                                                                <Typography variant="subtitle2" component="span" gutterBottom>
                                                                                    {session.available_capacity_dose2}
                                                                                </Typography>
                                                                            </Typography>
                                                                        </Grid>

                                                                        
                                                                    </Grid>
                                                                ))
                                                            }
                                                        </TableCell>

                                                        <TableCell >
                                                            {
                                                                center.sessions.filter((session: Session) => {
                                                                    return moment(session.date, 'DD-MM-YYYY').format('DD MMM YYYY') === tableHeader[2]
                                                                }).map((session: Session) => (
                                                                    // <p>{session.available_capacity}</p>
                                                                    <Grid container key={session.session_id} direction='column' >
                                                                        <Grid item>
                                                                            <Typography variant="button" component="div" gutterBottom color='text.secondary'>
                                                                                {session.vaccine}
                                                                            </Typography>
                                                                        </Grid>
                                                                            
                                                                        <Grid item>
                                                                            <Typography variant="body2" component="div" gutterBottom>
                                                                                Available Dose 1: {' '}
                                                                                <Typography variant="subtitle2" component="span" gutterBottom>
                                                                                    {session.available_capacity_dose1}
                                                                                </Typography>
                                                                            </Typography>
                                                                        </Grid>

                                                                        <Grid item>
                                                                            <Typography variant="body2" component="div" gutterBottom>
                                                                                Available Dose 2: {' '}
                                                                                <Typography variant="subtitle2" component="span" gutterBottom>
                                                                                    {session.available_capacity_dose2}
                                                                                </Typography>
                                                                            </Typography>
                                                                        </Grid>

                                                                        
                                                                    </Grid>
                                                                ))
                                                            }
                                                        </TableCell>

                                                        <TableCell >
                                                            {
                                                                center.sessions.filter((session: Session) => {
                                                                    return moment(session.date, 'DD-MM-YYYY').format('DD MMM YYYY') === tableHeader[3]
                                                                }).map((session: Session) => (
                                                                    // <p>{session.available_capacity}</p>
                                                                    <Grid container key={session.session_id} direction='column'>
                                                                        <Grid item>
                                                                            <Typography variant="button" component="div" gutterBottom color='text.secondary'>
                                                                                {session.vaccine}
                                                                            </Typography>
                                                                        </Grid>
                                                                            
                                                                        <Grid item>
                                                                            <Typography variant="body2" component="div" gutterBottom>
                                                                                Available Dose 1: {' '}
                                                                                <Typography variant="subtitle2" component="span" gutterBottom>
                                                                                    {session.available_capacity_dose1}
                                                                                </Typography>
                                                                            </Typography>
                                                                        </Grid>

                                                                        <Grid item>
                                                                            <Typography variant="body2" component="div" gutterBottom>
                                                                                Available Dose 2: {' '}
                                                                                <Typography variant="subtitle2" component="span" gutterBottom>
                                                                                    {session.available_capacity_dose2}
                                                                                </Typography>
                                                                            </Typography>
                                                                        </Grid>

                                                                        
                                                                    </Grid>
                                                                ))
                                                            }
                                                        </TableCell>

                                                        <TableCell >
                                                            {
                                                                center.sessions.filter((session: Session) => {
                                                                    return moment(session.date, 'DD-MM-YYYY').format('DD MMM YYYY') === tableHeader[4]
                                                                }).map((session: Session) => (
                                                                    // <p>{session.available_capacity}</p>
                                                                    <Grid container key={session.session_id} direction='column'>
                                                                        <Grid item>
                                                                            <Typography variant="button" component="div" gutterBottom color='text.secondary'>
                                                                                {session.vaccine}
                                                                            </Typography>
                                                                        </Grid>
                                                                            
                                                                        <Grid item>
                                                                            <Typography variant="body2" component="div" gutterBottom>
                                                                                Available Dose 1: {' '}
                                                                                <Typography variant="subtitle2" component="span" gutterBottom>
                                                                                    {session.available_capacity_dose1}
                                                                                </Typography>
                                                                            </Typography>
                                                                        </Grid>

                                                                        <Grid item>
                                                                            <Typography variant="body2" component="div" gutterBottom>
                                                                                Available Dose 2: {' '}
                                                                                <Typography variant="subtitle2" component="span" gutterBottom>
                                                                                    {session.available_capacity_dose2}
                                                                                </Typography>
                                                                            </Typography>
                                                                        </Grid>

                                                                        
                                                                    </Grid>
                                                                ))
                                                            }
                                                        </TableCell>

                                                        <TableCell >
                                                            {
                                                                center.sessions.filter((session: Session) => {
                                                                    return moment(session.date, 'DD-MM-YYYY').format('DD MMM YYYY') === tableHeader[5]
                                                                }).map((session: Session) => (
                                                                    // <p>{session.available_capacity}</p>
                                                                    <Grid container key={session.session_id} direction='column' >
                                                                        <Grid item>
                                                                            <Typography variant="button" component="div" gutterBottom color='text.secondary'>
                                                                                {session.vaccine}
                                                                            </Typography>
                                                                        </Grid>
                                                                            
                                                                        <Grid item>
                                                                            <Typography variant="body2" component="div" gutterBottom>
                                                                                Available Dose 1: {' '}
                                                                                <Typography variant="subtitle2" component="span" gutterBottom>
                                                                                    {session.available_capacity_dose1}
                                                                                </Typography>
                                                                            </Typography>
                                                                        </Grid>

                                                                        <Grid item>
                                                                            <Typography variant="body2" component="div" gutterBottom>
                                                                                Available Dose 2: {' '}
                                                                                <Typography variant="subtitle2" component="span" gutterBottom>
                                                                                    {session.available_capacity_dose2}
                                                                                </Typography>
                                                                            </Typography>
                                                                        </Grid>

                                                                        
                                                                    </Grid>
                                                                ))
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })
                                        }
                                    </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
                
            </>
        );
    }
}
