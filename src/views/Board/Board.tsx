import ColumnList from '../../components/ColumnList/ColumnList';
import './Board.scss';

const ITEMS_COUNT_OF_COLUMN_DATA = 5;
const columnData = new Array(ITEMS_COUNT_OF_COLUMN_DATA).fill({}).map((_, index) => ({
  id: `${index}`,
  title: `Column ${index + 1}`,
  order: index,
}));

const Board = () => {
  return (
    <div className="board">
      <div className="center-container">
        <section className="board-header">Board title</section>
        <ColumnList columns={columnData} />
      </div>
    </div>
  );
};

export default Board;
