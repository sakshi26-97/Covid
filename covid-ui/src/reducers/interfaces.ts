export interface Country {
    Country: string;
    Date: string;
    ISO2: string | null;
    NewConfirmed: string | null;
    NewDeaths: string | null;
    NewRecovered: string | null;
    Slug: string;
    TotalConfirmed: string | null;
    TotalDeaths: string | null;

}

interface Global {
    Date: string;
    NewConfirmed: string;
    NewDeaths: string;
    NewRecovered: string;
    TotalConfirmed: string;
    TotalDeaths: string;
    TotalRecovered: string;
}

export interface Summary {
    Countries: Country[];
    Date: string;
    ID: string;
    Message: string;
    Global: Global;
}

export interface CountByCountry {
    Active: string;
    City: string;
    CityCode: string;
    Confirmed: string;
    Country: string;
    CountryCode: string;
    Date: string;
    Deaths: string;
    Lat: string;
    Lon: string;
    Province: string;
}

export interface TrackerState {
    countries: Country[];
    summary: Summary;
    countByCountry: CountByCountry[];
    error: string | null;
    loading: boolean;
}

export interface State {
    state_id: string;
    state_name: string;
}

export interface District {
    district_id: string;
    district_name: string;
}

export interface Session {
    session_id: string;
    date: string;
    available_capacity: number;
    min_age_limit: string;
    allow_all_age: boolean;
    vaccine: string;
    slots: string[];
    available_capacity_dose1: number;
    available_capacity_dose2: number;
}

export interface Center {
    center_id: number;
    name: string;
    address: string;
    state_name: string;
    district_name: string;
    block_name: string;
    pincode: number;
    lat: number;
    long: number;
    from: string;
    to: string;
    fee_type: string;
    sessions: Session[];
    vaccine_fees: {
        vaccine: string;
        fee: string;
    }[];
}

export interface VaccinationReport {
    vaccination: {
        today: number;
        total_doses: number;
        tot_dose_1: number;
        tot_dose_2: number;
    };
    registration: {
        total: number;
        today: number;
    };
}

export interface VaccinationState {
    liveCount: number;
    states: State[];
    district: District[];
    centersByPin: Center[];
    centersByDistrict: Center[];
    report: VaccinationReport;
    error: string | null;
    fetching: boolean;
}

export interface CombinedState {
    tracker: TrackerState,
    vaccination: VaccinationState
}
