import React from 'react';
import Column from '../Column/Column';
import { IColumn } from '../../types/apiTypes';
import './ColumnList.scss';

type ColumnListProps = {
  columns: IColumn[];
};

const ColumnList = ({ columns }: ColumnListProps) => {
  return (
    <section className="column-list">
      {Boolean(columns.length) &&
        columns.map((column) => <Column key={column.id} column={column} />)}
      <button type="button" className="add-column-btn">
        Add a list...
      </button>
    </section>
  );
};

export default ColumnList;
