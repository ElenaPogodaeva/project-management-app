import { combineReducers } from 'redux';
import authReducer from './authReducer';
import settingsReducer from './settingsReducer';
import boardReducer from './boardSlice';
import boardsPreviewReducer from './boardsSlise';

const rootReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  board: boardReducer,
  boards: boardsPreviewReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
