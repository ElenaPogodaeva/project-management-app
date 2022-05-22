import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { IColumnResponse } from '../../api/types';
import Column from '../Column/Column';
import Modal from '../Modal/Modal';
import ColumnForm from '../ColumnForm/ColumnForm';
import useAppDispatch from '../../hooks/useAppDispatch';
import { addColumn } from '../../redux/thunks/boardThunks';
import './ColumnList.scss';
import CONSTANTS from '../../utils/constants';

const token = CONSTANTS.TOKEN;

type ColumnListProps = {
  boardId: string;
  columns: IColumnResponse[];
};

type FormValues = {
  columnTitle: string;
};

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
          <ColumnForm onSubmit={onSubmit} onCancel={onCancel} />
        </Modal>
      )}
    </section>
  );
};

export default ColumnList;
