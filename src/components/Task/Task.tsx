import React from 'react';
import { ITask } from '../../model/interfaces';
import './Task.scss';

type TaskProps = {
  task: ITask;
};

const Task = ({ task }: TaskProps) => {
  const { title } = task;

  return <li className="card-item">{title}</li>;
};

export default Task;
