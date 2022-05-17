import { combineReducers } from 'redux';
import authReducer from './authSlice';
import settingsReducer from './settingsSlice';
import boardReducer from './boardSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  board: boardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
