import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ArrowUpward } from '@mui/icons-material';


interface StatsProps {
    caption1: string;
    caption2: string;
    value1: string;
    value2: string;
    icon: JSX.Element;
}

export function StatsComponent(props: StatsProps): JSX.Element { 
    const { caption1, caption2, value1, value2, icon } = props;
    return (
        <Card sx={{ minWidth: 250, maxWidth: 300 }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item>
                        { icon }
                    </Grid>
                    <Grid item>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            { caption1 }
                        </Typography>
                        <Typography variant="h6" component="div">
                            { value1 }
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            { caption2 }
                        </Typography>
                        <Typography variant="h6" component="div">
                            { value2 } {'  '}
                            <ArrowUpward style={{ marginBottom: '-3px', fontSize: '1.4rem' }} />
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
