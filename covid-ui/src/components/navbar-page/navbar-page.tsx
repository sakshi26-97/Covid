import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { CovidIcon } from '../../icons';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import './styles.scss';
import { RouteComponentProps } from 'react-router';


export default function NavbarComponent(props: RouteComponentProps) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    props.history.push('/vaccination');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor: "#1F3770"}} >
        <Toolbar>
          <div style={{flexGrow: 1, cursor: 'pointer'}} onClick={() => props.history.push('/tracker')}>
            <CovidIcon />
          </div>
          <div>
            <Typography variant="body1" component="div" sx={{ flexGrow: 1 }} onClick={handleMenu} style={{cursor: 'pointer'}}>
              Vaccination Services
              <div className="icon baseline">
                {anchorEl ? <ArrowDropUp /> : <ArrowDropDown />} 
              </div>
            </Typography>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
            <MenuItem onClick={handleClose}>Search Vaccination Centers </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}