import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColumn } from '../../types/apiTypes';
import addColumn from '../thunks';

export type BoardState = {
  isLoading: boolean;
  error: Error | null;
  columns: IColumn[];
};

const initialState: BoardState = {
  isLoading: true,
  error: null,
  columns: [],
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addColumn.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addColumn.fulfilled, (state, action: PayloadAction<IColumn>) => {
      state.isLoading = false;
      state.error = null;
      state.columns.push(action.payload);
    });
    builder.addCase(addColumn.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as Error;
    });
  },
});

export default boardSlice.reducer;
