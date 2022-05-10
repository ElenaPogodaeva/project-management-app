import { combineReducers } from 'redux';
import authReducer from './authReducer';
import settingsReducer from './settingsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
