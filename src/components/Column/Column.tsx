import React from 'react';
import { IColumn } from '../../types/apiTypes';
import TaskList from '../TaskList/TaskList';
import './Column.scss';

type ColumnProps = {
  column: IColumn;
};

const ITEMS_COUNT_OF_TASK_DATA = 5;
const taskData = new Array(ITEMS_COUNT_OF_TASK_DATA).fill({}).map((_, index) => ({
  id: `${index}`,
  title: `Task ${index + 1}`,
  order: index,
  description: `description task ${index + 1}`,
  userId: '1',
  boardId: '1',
  columnId: '1',
}));

const Column = ({ column }: ColumnProps) => {
  const { id, title } = column;

  return (
    <div className="column-item">
      <div className="column-title-wrapper">
        <h3 className="column-title">{title}</h3>
      </div>
      <TaskList tasks={taskData} />
      <button type="button" className="add-card-btn">
        Add a card...
      </button>
    </div>
  );
};

export default Column;
