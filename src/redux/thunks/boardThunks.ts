import { createAsyncThunk } from '@reduxjs/toolkit';
import { IBoard, ICreateBoard, ICreatedBoard } from '../../types/apiTypes';
import {
  getBoards,
  createBoard,
  deleteBoard,
  getBoardById,
  createColumn,
  updateColumn,
  deleteColumn,
  createTask,
  updateTask,
} from '../../api/apiService';
import { ICreateColumn, ICreateTask, IUpdateTask } from '../../api/types';
import { removeCol } from '../reducers/boardSlice';

export interface ValidationErrors {
  rejectValue: string;
}

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
  async (BoardData: ICreateBoard, { rejectWithValue }) => {
    try {
      const { token, title, description } = BoardData;
      const response = await createBoard({ title, description }, token);
      return response;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const removeBoard = createAsyncThunk<
  string,
  { boardId: string; token: string },
  ValidationErrors
>('board/removeBoard', async (BoardData, { rejectWithValue }) => {
  try {
    const { token } = BoardData;

    const response = await deleteBoard(BoardData.boardId, token);
    return response;
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const fetchBoardData = createAsyncThunk(
  'board/fetchBoardData',
  async (boardData: { boardId: string; token: string }, { rejectWithValue }) => {
    try {
      const { boardId, token } = boardData;
      const response = await getBoardById(boardId, token);
      const { title, columns } = response;
      return { title, columns };
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const addColumn = createAsyncThunk(
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

export const editColumn = createAsyncThunk(
  'board/editColumn',
  async (
    data: { boardId: string; columnId: string; column: ICreateColumn; token: string },
    { rejectWithValue }
  ) => {
    try {
      const { boardId, columnId, column, token } = data;
      const response = await updateColumn(boardId, columnId, column, token);
      return response;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const removeColumn = createAsyncThunk(
  'board/removeColumn',
  async (
    data: { boardId: string; columnId: string; token: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { boardId, columnId, token } = data;
      dispatch(removeCol({ columnId }));
      const response = await deleteColumn(boardId, columnId, token);
      return response;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const addTask = createAsyncThunk(
  'board/addTask',
  async (
    data: { boardId: string; columnId: string; task: ICreateTask; token: string },
    { rejectWithValue }
  ) => {
    try {
      const { boardId, columnId, task, token } = data;
      const response = await createTask(boardId, columnId, task, token);
      return response;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const editTask = createAsyncThunk(
  'board/editTask',
  async (
    data: { boardId: string; columnId: string; taskId: string; task: IUpdateTask; token: string },
    { rejectWithValue }
  ) => {
    try {
      const { boardId, columnId, taskId, task, token } = data;
      const response = await updateTask(boardId, columnId, taskId, task, token);
      return response;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);
