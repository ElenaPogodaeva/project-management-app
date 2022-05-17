import { useEffect } from 'react';
import ColumnList from '../../components/ColumnList/ColumnList';
import Loading from '../../components/Loading/Loading';
import useAppDispatch from '../../hooks/useAppDispatch';
import useTypedSelector from '../../hooks/useTypedSelector';
import { fetchBoardData } from '../../redux/thunks/thunks';
import './Board.scss';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxOTE4MTc2Yy05ZmRmLTQ1ZTktOWM2NC1lNzYwNjc4N2EyN2QiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTI3NTI4OTF9.w2E27F-1HxgqHeGppNHNO1cXWSvsxZD69HAxcfjrjL0';

const boardId = 'c1db418b-279d-42a3-97e0-ba3c4b770969';

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
