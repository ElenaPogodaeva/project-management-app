import { languageType, settingsActionType, themeType } from '../types/settings';

const changeLang = (lang: languageType.EN | languageType.RU) => {
  return { type: settingsActionType.CHANGE_LANG, payload: lang };
};

const changeTheme = (theme: themeType.DARK | themeType.LIGHT) => {
  return { type: settingsActionType.CHANGE_THEME, payload: theme };
};

export { changeLang, changeTheme };
