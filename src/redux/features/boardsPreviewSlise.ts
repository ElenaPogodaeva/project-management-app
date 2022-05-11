import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard } from '../../model/interfaces';
import getBoards from '../thunks';

export type boardsPreviewState = {
  isLoading: boolean;
  error: Error | null;
  boards: IBoard[];
};

const initialState: boardsPreviewState = {
  isLoading: true,
  error: null,
  boards: [],
};

export const boardsPreviewSlice = createSlice({
  name: 'boardsPreview',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBoards.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getBoards.fulfilled, (state, action: PayloadAction<IBoard>) => {
      state.isLoading = false;
      state.error = null;
      state.boards.push(action.payload);
    });
    builder.addCase(getBoards.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as Error;
      // state.columns = [];
    });
  },
});

// Action creators are generated for each case reducer function

export default boardsPreviewSlice.reducer;
