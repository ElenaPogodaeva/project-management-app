import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICreateColumn, IBoard, ICreateBoard, ICreatedBoard } from '../types/apiTypes';
import { getBoards, createColumn, createBoard, deleteBoard } from '../api/apiService';

export interface ValidationErrors {
  rejectValue: string;
}
const addColumn = createAsyncThunk(
  'board/addColumn',
  async (
    columnData: { boardId: string; column: ICreateColumn; token: string },
    { rejectWithValue }
  ) => {
    try {
      const { boardId, column, token } = columnData;
      const response = await createColumn(boardId, column, token);
      return response;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export default addColumn;

export const getBoardsList = createAsyncThunk<IBoard[], string, ValidationErrors>(
  'board/getBoards',
  async (token, { rejectWithValue }) => {
    try {
      const response = await getBoards(token);
      return response;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const addBoard = createAsyncThunk<ICreatedBoard, ICreateBoard, ValidationErrors>(
  'board/addBoard',
  async (BoardData: { title: string; token: string }, { rejectWithValue }) => {
    try {
      const { token } = BoardData;
      const response = await createBoard(BoardData, token);
      return response;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const removeBoard = createAsyncThunk<
  null,
  { boardId: string; token: string },
  ValidationErrors
>('board/removeBoard', async (BoardData, { rejectWithValue }) => {
  try {
    const { token } = BoardData;
    console.log(BoardData.boardId);
    const response = await deleteBoard(BoardData.boardId, token);
    return response;
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

