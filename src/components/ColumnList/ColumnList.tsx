import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { IColumnResponse } from '../../api/types';
import { addColumn } from '../../redux/thunks/thunks';
import Column from '../Column/Column';
import Modal from '../Modal/Modal';
import AddColumnForm from '../AddColumnForm/AddColumnForm';
import './ColumnList.scss';
import useAppDispatch from '../../hooks/useAppDispatch';

type ColumnListProps = {
  boardId: string;
  columns: IColumnResponse[];
};

type FormValues = {
  columnTitle: string;
};

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxOTE4MTc2Yy05ZmRmLTQ1ZTktOWM2NC1lNzYwNjc4N2EyN2QiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTI3NTI4OTF9.w2E27F-1HxgqHeGppNHNO1cXWSvsxZD69HAxcfjrjL0';

const ColumnList = ({ boardId, columns }: ColumnListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  const onCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const order = columns.length ? Math.max(...columns.map((item) => item.order)) + 1 : 1;
      const column = {
        title: data.columnTitle,
        order,
      };
      await dispatch(addColumn({ boardId, column, token }));
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to add the column: ', err);
    }
  };

  return (
    <section className="column-list">
      {Boolean(columns.length) &&
        columns.map((column) => <Column key={column.id} column={column} />)}
      <button type="button" className="add-column-btn" onClick={() => setIsModalOpen(true)}>
        Add a column...
      </button>
      {isModalOpen && (
        <Modal title="Add a column" onCancel={onCancel}>
          <AddColumnForm onSubmit={onSubmit} onCancel={onCancel} />
        </Modal>
      )}
    </section>
  );
};

export default ColumnList;
