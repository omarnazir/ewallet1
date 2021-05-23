import { combineReducers } from 'redux';

import settingsReducer from './settings.reducer.js';
import themesReducer from './themes.reducers.js';
// import authReducer from "./auth.reducer"

export default combineReducers({
    settings: settingsReducer,
    theme: themesReducer,
    // auth:authReducer
});
