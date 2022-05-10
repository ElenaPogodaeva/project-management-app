import {
  settingsAction,
  settingsState,
  settingsActionType,
  languageType,
  themeType,
} from '../types/settings';

const initialState: settingsState = {
  lang: languageType.EN,
  theme: themeType.LIGHT,
};

const settingsReducer = (
  // eslint-disable-next-line default-param-last
  state: settingsState = initialState,
  action: settingsAction
): settingsState => {
  switch (action.type) {
    case settingsActionType.CHANGE_LANG:
      return { ...state, lang: action.payload };
    case settingsActionType.CHANGE_THEME:
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

export default settingsReducer;
