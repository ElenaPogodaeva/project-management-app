import { useEffect } from 'react';
import ColumnList from '../../components/ColumnList/ColumnList';
import Loading from '../../components/Loading/Loading';
import useAppDispatch from '../../hooks/useAppDispatch';
import useTypedSelector from '../../hooks/useTypedSelector';
import { fetchBoardData } from '../../redux/thunks/boardThunks';
import './Board.scss';
import CONSTANTS from '../../utils/constants';

const token = CONSTANTS.TOKEN;

const BOARD_ID = 'acb08d97-3a89-4b9d-ab46-87c0e618d5b3';

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
      dispatch(fetchBoardData({ boardId: BOARD_ID, token }));
    }
  }, [status, dispatch]);

  let content;
  if (status === 'loading') {
    content = <Loading />;
  } else if (status === 'succeeded') {
    const orderedColumns = columns.slice().sort((a, b) => a.order - b.order);

    content = (
      <>
        <h2 className="board-page-header">{title}</h2>
        <ColumnList boardId={BOARD_ID} columns={orderedColumns} />
      </>
    );
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }
  return <section className="board-page">{content}</section>;
};

export default Board;
