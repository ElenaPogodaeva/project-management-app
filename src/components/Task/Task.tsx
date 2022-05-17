/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { ITaskResponse } from '../../types/apiTypes';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import Modal from '../Modal/Modal';
import './Task.scss';

type TaskProps = {
  task: ITaskResponse;
  columnId: string;
};

type FormValues = {
  taskTitle: string;
  taskDescription: string;
};

const Task = ({ task, columnId }: TaskProps) => {
  const { id: taskId, title, description, order, userId, boardId } = task;

  const [isViewMode, setIsViewMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleClick = () => {
    setIsViewMode(false);
    setIsEditMode(true);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const taskData = {
        title: data.taskTitle,
        order,
        description: data.taskDescription,
        userId,
        boardId,
        columnId,
      };
      console.log(taskData);
      setIsEditMode(false);
    } catch (err) {
      console.error('Failed to edit the task: ', err);
    }
  };

  return (
    <>
      <li className="card-item" onClick={() => setIsViewMode(true)}>
        {title}
      </li>
      {isEditMode && (
        <Modal title="Edit task" onCancel={() => setIsEditMode(false)}>
          <AddTaskForm onSubmit={onSubmit} onCancel={() => setIsEditMode(false)} />
        </Modal>
      )}
      {isViewMode && (
        <Modal title="" onCancel={() => setIsViewMode(false)}>
          <div className="task">
            <h2 className="task-title">{title}</h2>
            <p className="task-description">{description}</p>
            <button className="formBtn" type="button" onClick={handleClick}>
              Edit Task
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Task;
