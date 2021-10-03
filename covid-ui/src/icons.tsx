import React from 'react';

import SVGCovidIcon from './assets/covid19logo.svg';
import SVGSyringeIcon from './assets/syringe.svg';

export const CovidIcon = React.memo((): JSX.Element => <SVGCovidIcon />);

export const SyringeIcon = React.memo((): JSX.Element => <SVGSyringeIcon />);
