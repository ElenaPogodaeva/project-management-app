import ColumnList from '../../components/ColumnList/ColumnList';
import './Board.scss';

const columns = [
  {
    id: '1',
    title: 'Column1',
    order: 1,
  },
  {
    id: '2',
    title: 'Column2',
    order: 2,
  },
  {
    id: '3',
    title: 'Column3',
    order: 3,
  },
  {
    id: '4',
    title: 'Column4',
    order: 4,
  },
];

const Board = () => {
  return (
    <div className="board">
      <div className="center-container">
        <section className="board-header">Board title</section>
        <ColumnList columns={columns} />
      </div>
    </div>
  );
};

export default Board;
