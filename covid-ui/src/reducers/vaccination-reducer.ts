import { VaccinationState } from "./interfaces";
import { VaccinationActions, VaccinationAactionTypes } from "../actions/vaccination-actions";

const defaultState: VaccinationState = {
    liveCount: 0,
    states: [],
    district: [],
    centersByPin: [],
    centersByDistrict: [],
    report: {
        vaccination: {
            today: 0,
            total_doses: 0,
            tot_dose_1: 0,
            tot_dose_2: 0
        },
        registration: {
            total: 0,
            today: 0
        }
    },
    error: null,
    fetching: false,
} 

export default function vaccinationReducer (
    state: VaccinationState = defaultState,
    action: VaccinationActions
): VaccinationState {
    switch (action.type) {
        case VaccinationAactionTypes.GET_LIVE_COUNT: {
            return {
                ...state   
            }
        }
        case VaccinationAactionTypes.GET_LIVE_COUNT_SUCCESS: {
            return {
                ...state,
                liveCount: action.payload.data.count
            }
        }
        case VaccinationAactionTypes.GET_LIVE_COUNT_FAILURE: {
            return {
                ...state,
                error: action.payload.error
            }
        }

        case VaccinationAactionTypes.GET_STATES: {
            return {
                ...state   
            }
        }
        case VaccinationAactionTypes.GET_STATES_SUCCESS: {
            return {
                ...state,
                states: action.payload.data
            }
        }
        case VaccinationAactionTypes.GET_STATES_FAILURE: {
            return {
                ...state,
                error: action.payload.error
            }
        }

        case VaccinationAactionTypes.GET_DISTRICTS: {
            return {
                ...state   
            }
        }
        case VaccinationAactionTypes.GET_DISTRICTS_SUCCESS: {
            return {
                ...state,
                district: action.payload.data
            }
        }
        case VaccinationAactionTypes.GET_DISTRICTS_FAILURE: {
            return {
                ...state,
                error: action.payload.error
            }
        }

        case VaccinationAactionTypes.SEARCH_BY_PIN: {
            return {
                ...state,
                fetching: true
            }
        }
        case VaccinationAactionTypes.SEARCH_BY_PIN_SUCCESS: {
            return {
                ...state,
                centersByPin: action.payload.data,
                fetching: false
            }
        }
        case VaccinationAactionTypes.SEARCH_BY_PIN_FAILURE: {
            return {
                ...state,
                error: action.payload.error,
                fetching: false
            }
        }

        case VaccinationAactionTypes.SEARCH_BY_DISTRICT: {
            return {
                ...state,
                fetching: true   
            }
        }
        case VaccinationAactionTypes.SEARCH_BY_DISTRICT_SUCCESS: {
            return {
                ...state,
                centersByDistrict: action.payload.data,
                fetching: false
            }
        }
        case VaccinationAactionTypes.SEARCH_BY_DISTRICT_FAILURE: {
            return {
                ...state,
                error: action.payload.error,
                fetching: false
            }
        }

        case VaccinationAactionTypes.GET_VACCINATION_REPORT: {
            return {
                ...state  
            }
        }
        case VaccinationAactionTypes.GET_VACCINATION_REPORT_SUCCESS: {
            return {
                ...state,
                report: action.payload.data
            }
        }
        case VaccinationAactionTypes.GET_VACCINATION_REPORT_FAILURE: {
            return {
                ...state,
                error: action.payload.error
            }
        }

        default: 
            return state
    }
}