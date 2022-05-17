import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColumnResponse, ITaskResponse } from '../../api/types';
import { addColumn, addTask, editColumn, editTask, fetchBoardData } from '../thunks/thunks';

export type BoardState = {
  columns: IColumnResponse[];
  title: string;
  status: string;
  error: string | null;
};

const initialState: BoardState = {
  columns: [],
  title: '',
  status: 'idle',
  error: null,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    removeCol(
      state,
      action: PayloadAction<{
        columnId: string;
      }>
    ) {
      state.columns = state.columns.filter((column) => column.id !== action.payload.columnId);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoardData.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });

    builder.addCase(fetchBoardData.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.error = null;
      state.title = action.payload.title;
      state.columns = action.payload.columns;
    });

    builder.addCase(fetchBoardData.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
      state.title = '';
      state.columns = [];
    });

    builder.addCase(addColumn.fulfilled, (state, action) => {
      action.payload.tasks = [];
      state.columns.push(action.payload);
    });

    builder.addCase(editColumn.fulfilled, (state, action) => {
      const { id } = action.payload;
      const column = state.columns.find((item) => item.id === id);
      (column as IColumnResponse).title = action.payload.title;
    });

    builder.addCase(addTask.fulfilled, (state, action) => {
      const { columnId } = action.payload;
      state.error = null;
      action.payload.files = [];
      const column = state.columns.find((item) => item.id === columnId);
      (column as IColumnResponse).tasks.push(action.payload);
    });

    builder.addCase(editTask.fulfilled, (state, action) => {
      const { id, columnId, title, description } = action.payload;
      const column = state.columns.find((item) => item.id === columnId) as IColumnResponse;
      const task = column.tasks.find((item) => item.id === id) as ITaskResponse;
      task.title = title;
      task.description = description;
    });
  },
});

export const { removeCol } = boardSlice.actions;

export default boardSlice.reducer;
