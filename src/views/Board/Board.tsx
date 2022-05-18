import { useEffect } from 'react';
import ColumnList from '../../components/ColumnList/ColumnList';
import Loading from '../../components/Loading/Loading';
import useAppDispatch from '../../hooks/useAppDispatch';
import useTypedSelector from '../../hooks/useTypedSelector';
import { fetchBoardData } from '../../redux/thunks/boardThunks';
import './Board.scss';
import CONSTANTS from '../../utils/constants';

const token = CONSTANTS.TOKEN;

const boardId = 'c1db418b-279d-42a3-97e0-ba3c4b770969';

const ITEMS_COUNT_OF_COLUMN_DATA = 5;
const columnData = new Array(ITEMS_COUNT_OF_COLUMN_DATA).fill({}).map((_, index) => ({
  id: `${index}`,
  title: `Column ${index + 1}`,
  order: index,
}));

const Board = () => {
  const { title, columns, status, error } = useTypedSelector((state) => state.board);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBoardData({ boardId, token }));
    }
  }, [status, dispatch]);

  let content;
  if (status === 'loading') {
    content = <Loading />;
  } else if (status === 'succeeded') {
    const orderedColumns = columns.slice().sort((a, b) => a.order - b.order);

    content = (
      <>
        <section className="board-page-header">{title}</section>
        <ColumnList boardId={boardId} columns={orderedColumns} />
      </>
    );
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }
  return (
    <div className="board-page">
      <div className="center-container">{content}</div>
    </div>
  );
};

export default Board;
