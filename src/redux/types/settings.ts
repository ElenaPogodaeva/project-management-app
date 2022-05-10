// eslint-disable-next-line no-shadow
export enum languageType {
  EN = 'english',
  RU = 'russian',
}

// eslint-disable-next-line no-shadow
export enum themeType {
  DARK = 'dark',
  LIGHT = 'light',
}

interface settingsState {
  lang: languageType.EN | languageType.RU;
  theme: themeType.DARK | themeType.LIGHT;
}

// eslint-disable-next-line no-shadow
export enum settingsActionType {
  CHANGE_LANG = 'changeLanguage',
  CHANGE_THEME = 'changeTheme',
}

interface changeLangAction {
  type: settingsActionType.CHANGE_LANG;
  payload: languageType.EN | languageType.RU;
}

interface changeThemeAction {
  type: settingsActionType.CHANGE_THEME;
  payload: themeType.DARK | themeType.LIGHT;
}

type settingsAction = changeLangAction | changeThemeAction;

export type { settingsAction, settingsState };
