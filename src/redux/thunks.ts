import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '..';
import { ICreateColumn, IBoard, ICreateBoard, ICreatedBoard } from '../model/interfaces';

export interface ValidationErrors {
  rejectValue: string;
}

const addColumn = createAsyncThunk(
  'board/addColumn',
  async (columnData: { boardId: string; column: ICreateColumn }, { rejectWithValue }) => {
    try {
      const { boardId, column } = columnData;
      const response = await api.createColumn(boardId, column);
      return response;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export default addColumn;

export const getBoards = createAsyncThunk<IBoard[], null, ValidationErrors>(
  'board/getBoards',
  async (_, { rejectWithValue }) => {
    try {
      const response: IBoard[] = (await api.getBoards()) as IBoard[];
      return response;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const addBoard = createAsyncThunk<ICreatedBoard, ICreateBoard, ValidationErrors>(
  'board/addBoard',
  async (BoardData, { rejectWithValue }) => {
    try {
      const response: ICreatedBoard = await api.createBoard(BoardData);
      return response;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const removeBoard = createAsyncThunk<null, string, ValidationErrors>(
  'board/removeBoard',
  async (boardId, { rejectWithValue }) => {
    try {
      console.log(boardId);
      const response = await api.deleteBoard(boardId);
      return response;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);
