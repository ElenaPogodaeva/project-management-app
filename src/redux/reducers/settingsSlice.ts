import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { settingsState, languageType, themeType } from '../types/settings';

const initialState: settingsState = {
  lang: languageType.EN,
  theme: themeType.LIGHT,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeLang(state, action: PayloadAction<languageType.EN | languageType.RU>) {
      state.lang = action.payload;
    },
    changeTheme(state, action: PayloadAction<themeType.LIGHT | themeType.DARK>) {
      state.theme = action.payload;
    },
  },
});

export default settingsSlice.reducer;
