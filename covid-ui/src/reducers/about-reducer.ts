import { AboutState } from "./interfaces";
import { AboutActions, AboutActionTypes } from '../actions/about-actions';

const defaultState: AboutState = {
    data: "",
    fetching: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (
    state: AboutState = defaultState,
    action: AboutActions,
): AboutState {
    switch(action.type) {
        case AboutActionTypes.GET_ABOUT: {
            return {
                ...state,
                fetching: true
            }
        }
        case AboutActionTypes.GET_ABOUT_SUCCESS: {
            return {
                data: action.payload.data,
                fetching: false
            }
        }
        case AboutActionTypes.GET_ABOUT_FAILED: {
            return {
                ...state,
                fetching: false
            }
        }
        default:
            return state;
    }
}