import * as authActionCreators from './auth';
import * as settingsActionCreators from './settings';

const actionCreator = {
  ...authActionCreators,
  ...settingsActionCreators,
};

export default actionCreator;
