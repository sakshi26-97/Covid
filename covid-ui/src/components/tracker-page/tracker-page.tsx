import React, { SyntheticEvent } from 'react';
import { RouteComponentProps } from 'react-router';
import { CountByCountry, Country, Summary, VaccinationReport } from '../../reducers/interfaces';
import NavbarComponent from '../navbar-page/navbar-page';
import './styles.scss';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@material-ui/core/Button';
import GroupIcon from '@mui/icons-material/Group';
import { SyringeIcon } from "../../icons";
import { Line } from 'react-chartjs-2';
import type * as Chart from 'chart.js';
import  moment from "moment";
import CircularProgress from '@mui/material/CircularProgress';
import { StatsComponent } from 'components/stats-page/stats-page';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


interface TrackerProps {
    countries: Country[];
    countByCountry: CountByCountry[];
    summary: Summary;
    error: string | null;
    report: VaccinationReport;
    loading: boolean;
    getCountries: () => void;
    getCountByCountry: (countryName: string) => void;
    getSummary: () => void;
}

interface TrackerState {
    countryError: any;
    countryName: string;
    globalChartData: Chart.ChartData | ((canvas: HTMLCanvasElement) => Chart.ChartData);
    globalChartOptions: Record<string, any>;
    countryChartData: Chart.ChartData | ((canvas: HTMLCanvasElement) => Chart.ChartData);
    countryChartOptions: Record<string, any>;
}

type Props = TrackerProps & RouteComponentProps;

const defaultState = {
    countryError: '',
    countryName: '',
    globalChartData: {
        labels: [],
        datasets: []
    },
    globalChartOptions: {
        // responsive: true,
        // maintainAspectRatio : false,
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Country',
                    color: '#1F3770',
                    font: {
                        family: 'Comic Sans MS',
                        size: 20,
                        weight: 'bold',
                        lineHeight: 1.2,
                    },
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Total Covid Cases in 1000',
                    color: '#1F3770',
                    font: {
                        family: 'Comic Sans MS',
                        size: 20,
                        weight: 'bold',
                        lineHeight: 1.2,
                    },
                },
                ticks: {
                    beginAtZero: true,
                },
            },
        },
    },
    countryChartData: {
        labels: [],
        datasets: []
    },
    countryChartOptions: {
        responsive: true,
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Year',
                    color: '#1F3770',
                    font: {
                        family: 'Comic Sans MS',
                        size: 20,
                        weight: 'bold',
                        lineHeight: 1.2,
                    },
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Total Covid Cases in 1000',
                    color: '#1F3770',
                    font: {
                        family: 'Comic Sans MS',
                        size: 20,
                        weight: 'bold',
                        lineHeight: 1.2,
                    },
                },
                ticks: {
                    beginAtZero: true,
                },
            },
        },
    }
}

export default class TrackerComponent extends React.PureComponent<Props, TrackerState> {

    constructor(props: Props) {
        super(props)
        this.state = { ...defaultState }
    }
    

    public componentDidMount(): void {
        const { getCountries, getSummary, summary } = this.props;
        if(summary.Countries.length > 0) {
            this.initializeGlobalChart(summary);
        }
        getCountries();
        getSummary();
    }

    public componentDidUpdate(prevProps: Props, prevState: TrackerState): void {
        if(JSON.stringify(prevProps.countByCountry) !== JSON.stringify(this.props.countByCountry)) {
            const { countByCountry } = this.props;
            this.intializeCountryChart(countByCountry);
            
        }

        if(JSON.stringify(prevProps.summary) !== JSON.stringify(this.props.summary)) {
            const { summary } = this.props;
            this.initializeGlobalChart(summary);
        }
    }

    public initializeGlobalChart = (summary: Summary): void => {
        const data = {
            labels: summary.Countries.map((country: Country) => country.Country),
            datasets: [
                {
                    label: '# Covid Cases per Country',
                    fill: false,
                    data: summary.Countries.map((country: Country) => parseInt(country.TotalConfirmed || '0')/1000),
                    backgroundColor: '#1F3770',
                    tension: 0.4,
                    cubicInterpolationMode: 'monotone',
                }
            ]
        }
        this.setState({
            globalChartData: data
        })
    }

    public intializeCountryChart = (countByCountry: CountByCountry[]): void => {
        const startDate = new Date(countByCountry[0].Date).getDate();
        const validData = countByCountry.filter((count: CountByCountry) => new Date(count.Date).getDate() === startDate);
        let data = {
            labels: validData.map((d: CountByCountry) => moment(d.Date).format('DD-MM-YYYY')),
            datasets: [
                {
                    label: '# Covid Cases',
                    fill: false,
                    data: validData.map((d: CountByCountry) => parseInt(d.Active)/1000),
                    backgroundColor: '#1F3770',
                    tension: 0.4,
                    cubicInterpolationMode: 'monotone',
                }
            ]
        }
        this.setState({
            countryChartData: data
        })
    }

    public handleCountryChange = (event: SyntheticEvent, country: Country): void => {
        this.setState({
            countryName: country.Slug,
            countryError: null
        })
    }

    public getDetailsByCountry = (): void => {
        const { countryName } = this.state;
        if(countryName !== '' || countryName.trim() !== '') {
            this.props.getCountByCountry(this.state.countryName);
            this.setState({
                countryError: ''
            })
        } else {
            this.setState({
                countryError: 'Please enter correct country'
            })
        }
    }

    public render(): JSX.Element {
        const { countries, summary, history, location, match, report, countByCountry, loading } = this.props;
        const { countryError, countryName, globalChartData, globalChartOptions, countryChartData, countryChartOptions } = this.state;
        
        return (
            <>
                <NavbarComponent history={history} location={location} match={match} />

                <Box flexGrow={1} display="flex" className='box-container' >
                    <Grid container sx={{flexGrow: 1}} rowSpacing={2} columnSpacing={2}>
                        <Grid item xs={12}>
                            <Grid container justifyContent='center' spacing={4}>
                                <Grid item>
                                    <StatsComponent 
                                        caption1='Total Confirmed Cases'
                                        caption2='New Confirmed Cases'
                                        value1={ parseInt(summary.Global.TotalConfirmed).toLocaleString() }
                                        value2={ parseInt(summary.Global.NewConfirmed).toLocaleString() }
                                        icon={ <GroupIcon /> }
                                    />
                                </Grid>

                                <Grid item>
                                    <StatsComponent 
                                        caption1='Total Death Cases'
                                        caption2='New Death Cases'
                                        value1={ parseInt(summary.Global.TotalDeaths).toLocaleString() }
                                        value2={ parseInt(summary.Global.NewDeaths).toLocaleString() }
                                        icon={ <GroupIcon /> }
                                    />
                                </Grid>

                                <Grid item>
                                    <StatsComponent 
                                        caption1='Total Recovered Cases'
                                        caption2='New Recovered Cases'
                                        value1={ parseInt(summary.Global.TotalRecovered).toLocaleString() }
                                        value2={ parseInt(summary.Global.NewRecovered).toLocaleString() }
                                        icon={ <GroupIcon /> }
                                    />
                                </Grid>

                                <Grid item>
                                    <StatsComponent 
                                        caption1='Total Vaccination Count'
                                        caption2='Vaccination Today'
                                        value1={ report.vaccination.total_doses.toLocaleString() }
                                        value2={ report.vaccination.today.toLocaleString() }
                                        icon={ <SyringeIcon /> }
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container justifyContent='center' spacing={4}>
                                        <Grid item>
                                            <Autocomplete
                                                id="country"
                                                disableClearable
                                                options={
                                                    countries.sort((country1, country2) => {
                                                        if(country1.Country < country2.Country) return -1;
                                                        if(country1.Country > country2.Country) return 1;
                                                        return 0;
                                                    })
                                                }
                                                getOptionLabel={(option) => option.Country}
                                                sx={{ minWidth: 200, maxWidth: 200 }}
                                                size='small'
                                                onChange={(event: SyntheticEvent, country: Country) => this.handleCountryChange(event, country)}
                                                renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Select Country"
                                                            InputProps={{
                                                                ...params.InputProps,
                                                                type: 'search'
                                                            }}
                                                            error={countryError}
                                                            helperText={countryError}
                                                        />
                                                    )
                                                }
                                            />
                                        </Grid>

                                        <Grid item>
                                            <Button variant="contained" onClick={this.getDetailsByCountry} className="search-button" >Search</Button>
                                        </Grid>
                                    </Grid>
                                </Grid> 

                                {/* display global chart */}
                                {
                                    !countryName && summary?.Countries?.length>0 && countByCountry.length===0 &&
                                    <Grid item xs={12}>
                                        <Line data={globalChartData} options={globalChartOptions} />
                                    </Grid>
                                }

                                {/* display loader while rendering country wise chart */}
                                {
                                    loading &&
                                    <Grid item>
                                        <CircularProgress />
                                    </Grid>
                                }

                                {
                                    countByCountry.length>0 &&
                                    <Grid item xs={12}>
                                        <Line data={countryChartData} options={countryChartOptions} />
                                    </Grid>
                                }

                                {/* display no data when no results returned for given country */}
                                {
                                    !loading && countryName && countByCountry.length===0 &&
                                    <Grid item xs={12}>
                                        <Typography component='div' variant='h6' align='center' gutterBottom>
                                            No Data to Display
                                        </Typography>
                                    </Grid>
                                }

                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                
            </>
        );
    }
}
