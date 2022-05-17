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

export type { settingsState };
