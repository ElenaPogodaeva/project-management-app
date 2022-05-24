import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColumnResponse, ITaskResponse } from '../../api/types';
import { IUpdateTask } from '../../types/apiTypes';
import { addColumn, addTask, editColumn, editTask, fetchBoardData } from '../thunks/boardThunks';

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

function sortTasks(tasks: ITaskResponse[], currentTask: ITaskResponse, moveTo: number) {
  const range = currentTask.order - moveTo;
  const arrayTasksToSort = tasks.filter((task) =>
    range < 0
      ? task.order >= currentTask.order && task.order <= moveTo
      : task.order <= currentTask.order && task.order >= moveTo
  );

  arrayTasksToSort.forEach((task) => {
    if (range < 0) task.order -= 1;
    else task.order += 1;
  });
  currentTask.order = moveTo;
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    columnDeleted(
      state,
      action: PayloadAction<{
        columnId: string;
      }>
    ) {
      const { columnId } = action.payload;
      state.columns = state.columns.filter((column) => column.id !== columnId);
    },
    taskDeleted(
      state,
      action: PayloadAction<{
        columnId: string;
        taskId: string;
      }>
    ) {
      const { columnId, taskId } = action.payload;
      const column = state.columns.find((item) => item.id === columnId) as IColumnResponse;
      column.tasks = column.tasks.filter((item) => item.id !== taskId);
    },
    taskEdited(
      state,
      action: PayloadAction<{
        columnId: string;
        taskId: string;
        task: IUpdateTask;
      }>
    ) {
      const { columnId, taskId, task } = action.payload;
      const column = state.columns.find((item) => item.id === columnId) as IColumnResponse;
      const tasks = column.tasks.sort((a, b) => a.order - b.order);
      const currentTask = column.tasks.find((item) => item.id === taskId) as ITaskResponse;
      currentTask.title = task.title;
      currentTask.description = task.description;
      currentTask.userId = task.userId;
      currentTask.boardId = task.boardId;

      if (currentTask.order !== task.order) {
        sortTasks(tasks, currentTask, task.order);
      }
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
  },
});

export const { columnDeleted, taskDeleted, taskEdited } = boardSlice.actions;

export default boardSlice.reducer;
