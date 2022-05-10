import React from 'react';
import { IColumn } from '../../model/interfaces';
import TaskList from '../TaskList/TaskList';
import './Column.scss';

type ColumnProps = {
  column: IColumn;
};

const tasks = [
  {
    id: '1',
    title: 'Task1',
    order: 1,
    description: 'description',
    userId: '1',
    boardId: '1',
    columnId: '1',
  },
  {
    id: '2',
    title: 'Task2',
    order: 2,
    description: 'description',
    userId: '1',
    boardId: '1',
    columnId: '1',
  },
  {
    id: '3',
    title: 'Task3',
    order: 3,
    description: 'description',
    userId: '1',
    boardId: '1',
    columnId: '1',
  },
  {
    id: '4',
    title: 'Task4',
    order: 4,
    description: 'description',
    userId: '1',
    boardId: '1',
    columnId: '1',
  },
];

const Column = ({ column }: ColumnProps) => {
  const { id, title } = column;

  return (
    <div className="column-item">
      <div className="column-title-wrapper">
        <h3 className="column-title">{title}</h3>
      </div>
      <TaskList tasks={tasks} />
      <button type="button" className="add-card-btn">
        Add a card...
      </button>
    </div>
  );
};

export default Column;
