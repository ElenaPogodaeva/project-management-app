import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '..';
import { ICreateColumn } from '../model/interfaces';

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
