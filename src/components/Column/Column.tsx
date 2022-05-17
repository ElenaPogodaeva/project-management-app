/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { getUserId } from '../../api/apiService';
import useAppDispatch from '../../hooks/useAppDispatch';
import { IColumnResponse } from '../../api/types';
import AddColumnForm from '../AddColumnForm/AddColumnForm';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import Modal from '../Modal/Modal';
import TaskList from '../TaskList/TaskList';
import { addTask, editColumn, removeColumn } from '../../redux/thunks/boardThunks';
import './Column.scss';
import CONSTANTS from '../../utils/constants';

const token = CONSTANTS.TOKEN;
const userId = getUserId(token);
const boardId = 'c1db418b-279d-42a3-97e0-ba3c4b770969';

type ColumnProps = {
  column: IColumnResponse;
};

type FormValues = {
  taskTitle: string;
  taskDescription: string;
};

type ColumnFormValues = {
  columnTitle: string;
};

const Column = ({ column }: ColumnProps) => {
  const { id: columnId, title, tasks, order } = column;
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isDeleteColumnOpen, setIsDeleteColumnOpen] = useState(false);
  const [isTitleEdit, setIsTitleEdit] = useState(false);

  const dispatch = useAppDispatch();

  const onColumnFormSubmit: SubmitHandler<ColumnFormValues> = async (data) => {
    try {
      const columnData = {
        title: data.columnTitle,
        order,
      };
      await dispatch(editColumn({ boardId, columnId, column: columnData, token }));
      setIsTitleEdit(false);
    } catch (err) {
      console.error('Failed to update the column: ', err);
    }
  };

  const onColumnFormCancel = () => {
    setIsTitleEdit(false);
  };

  const onTaskFormSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const taskOrder = tasks.length ? Math.max(...tasks.map((item) => item.order)) + 1 : 0;

      const taskData = {
        title: data.taskTitle,
        order: taskOrder,
        description: data.taskDescription,
        userId,
      };
      await dispatch(addTask({ boardId, columnId, task: taskData, token }));
      setIsAddTaskOpen(false);
    } catch (err) {
      console.error('Failed to add the task: ', err);
    }
  };

  const onTaskFormCancel = () => {
    setIsAddTaskOpen(false);
  };

  const onDeleteColumnClick = async () => {
    try {
      await dispatch(removeColumn({ boardId, columnId, token }));
      setIsDeleteColumnOpen(false);
    } catch (err) {
      console.error('Failed to delete the column: ', err);
    }
  };

  const onDeleteColumnCancel = () => {
    setIsDeleteColumnOpen(false);
  };

  return (
    <div className="column-item">
      <div className="column-title-wrapper">
        {isTitleEdit ? (
          <AddColumnForm onSubmit={onColumnFormSubmit} onCancel={onColumnFormCancel} />
        ) : (
          <h3 className="column-title" onClick={() => setIsTitleEdit(true)}>
            {title}
          </h3>
        )}
        <button
          type="button"
          aria-label="Delete"
          className="delete-btn"
          onClick={() => setIsDeleteColumnOpen(true)}
        />
      </div>
      <TaskList tasks={tasks} columnId={columnId} />
      <button type="button" className="add-card-btn" onClick={() => setIsAddTaskOpen(true)}>
        Add a card...
      </button>
      {isAddTaskOpen && (
        <Modal title="Add a task" onCancel={onTaskFormCancel}>
          <AddTaskForm onSubmit={onTaskFormSubmit} onCancel={onTaskFormCancel} />
        </Modal>
      )}
      {isDeleteColumnOpen && (
        <Modal title="Confirm" onCancel={onDeleteColumnCancel}>
          <h3 className="confirm-title">Delete column?</h3>
          <div className="btn-wrapper">
            <button type="button" className="modal-btn" onClick={onDeleteColumnClick}>
              Yes
            </button>
            <button type="button" className="modal-btn" onClick={onDeleteColumnCancel}>
              No
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Column;
