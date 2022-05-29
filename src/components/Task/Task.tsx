/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Draggable } from 'react-beautiful-dnd';
import { ITaskResponse } from '../../api/types';
import useAppDispatch from '../../hooks/useAppDispatch';
import { editTask, removeTask } from '../../redux/thunks/boardThunks';
import TaskForm from '../TaskForm/TaskForm';
import Modal from '../Modal/Modal';
import './Task.scss';
import CONSTANTS from '../../utils/constants';

const token = CONSTANTS.TOKEN;
const BOARD_ID = 'acb08d97-3a89-4b9d-ab46-87c0e618d5b3';

type TaskProps = {
  task: ITaskResponse;
  columnId: string;
  index: number;
};

type FormValues = {
  title: string;
  description: string;
};

const Task = ({ task, columnId, index }: TaskProps) => {
  const { id: taskId, title, description, order, userId } = task;

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const dispatch = useAppDispatch();

  const onDelete = async () => {
    try {
      await dispatch(removeTask({ boardId: BOARD_ID, columnId, taskId, token }));
      setIsDeleteOpen(false);
    } catch (err) {
      console.error('Failed to delete the task: ', err);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const taskData = {
        title: data.title,
        order,
        description: data.description,
        userId,
        boardId: BOARD_ID,
        columnId,
      };
      await dispatch(editTask({ boardId: BOARD_ID, columnId, taskId, task: taskData, token }));
      setIsEditOpen(false);
    } catch (err) {
      console.error('Failed to edit the task: ', err);
    }
  };

  return (
    <>
      <Draggable draggableId={taskId} index={index}>
        {(provided) => (
          <li
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="card-item"
          >
            <div className="card-title-wrapper">
              {title}
              <div className="card-btn-wrapper">
                <button
                  type="button"
                  aria-label="Edit"
                  className="card-btn edit-btn"
                  onClick={() => setIsEditOpen(true)}
                />
                <button
                  type="button"
                  aria-label="Delete"
                  className="card-btn delete-task-btn"
                  onClick={() => setIsDeleteOpen(true)}
                />
              </div>
            </div>
          </li>
        )}
      </Draggable>
      {isEditOpen && (
        <Modal title="Edit task" onCancel={() => setIsEditOpen(false)}>
          <TaskForm
            onSubmit={onSubmit}
            onCancel={() => setIsEditOpen(false)}
            values={{ title, description }}
          />
        </Modal>
      )}
      {isDeleteOpen && (
        <Modal title="Confirm" onCancel={() => setIsDeleteOpen(false)}>
          <h3 className="confirm-title">Delete task?</h3>
          <div className="btn-wrapper">
            <button type="button" className="modal-btn" onClick={onDelete}>
              Yes
            </button>
            <button type="button" className="modal-btn" onClick={() => setIsDeleteOpen(false)}>
              No
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Task;
