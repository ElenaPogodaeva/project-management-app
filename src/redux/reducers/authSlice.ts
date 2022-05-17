import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/apiTypes';
import { fetchSignIn, fetchSignUp } from '../thunks';
import { authState } from '../types/auth';

const initialState: authState = {
  token: null,
  isAuth: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSignUp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSignUp.fulfilled, (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
    });
    builder.addCase(fetchSignUp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(fetchSignIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSignIn.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
      state.isLoading = false;
      console.log(action.payload); // ##################
      state.token = action.payload.token;
      state.isAuth = true;
    });
    builder.addCase(fetchSignIn.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export default authSlice.reducer;
