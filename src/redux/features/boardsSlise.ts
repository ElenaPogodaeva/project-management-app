import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { log } from 'console';
import { IBoard, ICreatedBoard } from '../../model/interfaces';
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
        console.log(action.payload);
      })
      .addCase(addBoard.fulfilled, (state, action: PayloadAction<ICreatedBoard>) => {
        state.isLoading = false;
        state.error = null;
        state.boards.push(action.payload);
      });
  },
});

export const { remove } = boardsSlice.actions;

export default boardsSlice.reducer;
