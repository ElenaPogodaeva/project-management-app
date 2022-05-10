import { combineReducers } from 'redux';
import authReducer from './authReducer';
import settingsReducer from './settingsReducer';
import boardReducer from '../features/boardSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  board: boardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
