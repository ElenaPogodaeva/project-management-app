import { combineReducers } from 'redux';
import authReducer from './authReducer';
import settingsReducer from './settingsReducer';
import boardReducer from '../features/boardSlice';
import boardsPreviewReducer from '../features/boardsPreviewSlise';

const rootReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  board: boardReducer,
  boards: boardsPreviewReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
