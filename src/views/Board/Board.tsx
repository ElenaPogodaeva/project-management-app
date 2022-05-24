import { useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import ColumnList from '../../components/ColumnList/ColumnList';
import Loading from '../../components/Loading/Loading';
import useAppDispatch from '../../hooks/useAppDispatch';
import useTypedSelector from '../../hooks/useTypedSelector';
import { editTask, fetchBoardData } from '../../redux/thunks/boardThunks';
import './Board.scss';
import CONSTANTS from '../../utils/constants';
import { IColumnResponse, ITaskResponse } from '../../api/types';
import { getUserId } from '../../api/apiService';

const token = CONSTANTS.TOKEN;

const BOARD_ID = 'c1db418b-279d-42a3-97e0-ba3c4b770969';
const userId = getUserId(token);

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

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const column = columns.find((item) => item.id === source.droppableId) as IColumnResponse;

    const tasks = Array.from(column.tasks);

    const task = tasks.find((item) => item.id === draggableId) as ITaskResponse;

    try {
      const taskData = {
        title: task.title,
        order: destination.index + 1,
        description: task.description,
        userId,
        boardId: BOARD_ID,
        columnId: column.id,
      };

      await dispatch(
        editTask({ boardId: BOARD_ID, columnId: column.id, taskId: task.id, task: taskData, token })
      );
    } catch (err) {
      console.error('Failed to edit the task: ', err);
    }
  };

  let content;
  if (status === 'loading') {
    content = <Loading />;
  } else if (status === 'succeeded') {
    const orderedColumns = columns.slice().sort((a, b) => a.order - b.order);

    content = (
      <>
        <section className="board-page-header">{title}</section>
        <ColumnList boardId={BOARD_ID} columns={orderedColumns} />
      </>
    );
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board-page">
        <div className="center-container">{content}</div>
      </div>
    </DragDropContext>
  );
};

export default Board;
