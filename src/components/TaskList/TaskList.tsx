import React from 'react';
import { ITaskResponse } from '../../types/apiTypes';
import Task from '../Task/Task';
import './TaskList.scss';

type TaskListProps = {
  tasks: ITaskResponse[];
  columnId: string;
};

const TaskList = ({ tasks, columnId }: TaskListProps) => {
  return (
    <ul className="card-list">
      {Boolean(tasks.length) &&
        tasks.map((task) => <Task key={task.id} task={task} columnId={columnId} />)}
    </ul>
  );
};

export default TaskList;
