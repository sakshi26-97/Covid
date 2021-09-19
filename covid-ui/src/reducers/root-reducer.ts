import { combineReducers, Reducer } from 'redux';
import aboutReducer from './about-reducer';

export default function createRootReducer(): Reducer {
    return combineReducers({
        about: aboutReducer,
    });
}
