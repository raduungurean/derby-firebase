import {composeWithDevTools} from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import authReducer from './auth';
import layoutReducer from './layout';
import matchesReducer from './matches';
import groupsReducer from './groups';
import profileReducer from './profile';
import invitesReducer from './invites';
import playersReducer from './players';

const middleware = [ReduxThunk];

const reducers = combineReducers({
  auth: authReducer,
  layout: layoutReducer,
  matches: matchesReducer,
  groups: groupsReducer,
  profile: profileReducer,
  invites: invitesReducer,
  players: playersReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? composeWithDevTools
  : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(reducers, enhancer);

export default store;
