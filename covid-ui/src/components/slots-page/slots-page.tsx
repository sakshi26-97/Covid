import * as React from 'react';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import  moment from "moment";
import { Center, Session } from 'reducers/interfaces';
import Chip from '@mui/material/Chip';


interface SlotsProps {
    tableHeader: string[];
    centers: Center[];
};

export default function SlotsComponent(props: SlotsProps): JSX.Element {
    const { tableHeader, centers } = props;

    return (
        <>
            <Grid item xs={12}>
                <Grid container justifyContent='flex-start'>
                    <Grid item>
                        <Typography variant="h6" component="div" gutterBottom style={{color: '#1F3770'}}>
                            Slot Search Results <Typography color="text.secondary" component="span">({centers.length} centers(s) found)</Typography>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

            {/* <Grid item xs={12}>
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
            </Grid> */}

            <Grid item xs={12}>
                <Paper sx={{minWidth: '100%', maxWidth: '100%'}}>
                    <TableContainer sx={{ maxHeight: 440 }}>
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
                                centers
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
        </>
    );
}