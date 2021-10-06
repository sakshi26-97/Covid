import { combineReducers, Reducer } from 'redux';
import trackerReducer from './tracker-reducer';
import vaccinationReducer from './vaccination-reducer';

export default function createRootReducer(): Reducer {
	return combineReducers({
		tracker: trackerReducer,
		vaccination: vaccinationReducer
	});
}
