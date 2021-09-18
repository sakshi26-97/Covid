import thunk from "redux-thunk";
import  { createStore, applyMiddleware, Store, Reducer  } from "redux";
import { createLogger } from 'redux-logger';
import { isDev } from './utils/environment';


const logger = createLogger({
    predicate: isDev, //if specified this function will be called before each action is processed with this middleware
    collapsed: true,  // takes a Boolean or optionally a Function that receives `getState` function for accessing current store state and `action` object as parameters. Returns `true` if the log group should be collapsed, `false` otherwise.
});

const middlewares = [
    thunk,
    logger
];

let store: Store | null = null;

export default function createAppStore(createRootReducer: () => Reducer): void {
	let appliedMiddlewares = applyMiddleware(...middlewares);

	if(isDev()) {
		const { composeWithDevTools } = require('redux-devtools-extension');
		appliedMiddlewares = composeWithDevTools(appliedMiddlewares);
	}

	store = createStore(
		createRootReducer(),
		appliedMiddlewares
	)
}

export function getAppStore(): Store {
	if(store) {
		return store;
	}
	throw new Error('First create a store');
}
