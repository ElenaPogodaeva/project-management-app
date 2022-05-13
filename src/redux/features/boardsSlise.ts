import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard } from '../../model/interfaces';
import { getBoards, addBoard, removeBoard } from '../thunks';

export type boardsPreviewState = {
  isLoading: boolean;
  error: null | string;
  boards: IBoard[];
};

const initialState: boardsPreviewState = {
  isLoading: true,
  error: null,
  boards: [],
};

export const boardsSlice = createSlice({
  name: 'boardsPreview',
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<string>) => {
      state.boards = state.boards.filter((board) => board.id !== action.payload);
      removeBoard(action.payload);
    },
    addBoard: (state, action: PayloadAction<IBoard>) => {
      state.boards.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.pending, (state: boardsPreviewState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getBoards.fulfilled,
        (state: boardsPreviewState, action: PayloadAction<IBoard[]>) => {
          state.isLoading = false;
          state.error = null;
          action.payload.forEach((board) => {
            state.boards.push(board);
          });
        }
      )
      .addCase(getBoards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(removeBoard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.boards = state.boards.filter((board) => board.id !== action.payload);
      });
  },
});

export const { remove } = boardsSlice.actions;

export default boardsSlice.reducer;
