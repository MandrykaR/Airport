import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import flightsReducer from './flightsSlice';
import authReducer from './authSlice';
import postReducer from './postSlice';

const reducer = combineReducers({
  flights: flightsReducer,
  auth: authReducer,
  posts: postReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
