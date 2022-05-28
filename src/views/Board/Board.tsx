import { useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import ColumnList from '../../components/ColumnList/ColumnList';
import Loading from '../../components/Loading/Loading';
import useAppDispatch from '../../hooks/useAppDispatch';
import useTypedSelector from '../../hooks/useTypedSelector';
import { editColumn, editTask, fetchBoardData } from '../../redux/thunks/boardThunks';
import './Board.scss';
import CONSTANTS from '../../utils/constants';
import { IColumnResponse, ITaskResponse } from '../../api/types';
import { getUserId } from '../../api/apiService';

const token = CONSTANTS.TOKEN;

const BOARD_ID = 'acb08d97-3a89-4b9d-ab46-87c0e618d5b3'; // c1db418b-279d-42a3-97e0-ba3c4b770969';
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
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'column') {
      const column = columns.find((item) => item.id === draggableId) as IColumnResponse;
      const columnData = {
        title: column.title,
        order: destination.index + 1,
      };

      try {
        await dispatch(
          editColumn({
            boardId: BOARD_ID,
            columnId: column.id,
            column: columnData,
            token,
          })
        );
      } catch (err) {
        console.error('Failed to edit the column: ', err);
      }
      return;
    }
    const start = columns.find((item) => item.id === source.droppableId) as IColumnResponse;

    const finish = columns.find((item) => item.id === destination.droppableId) as IColumnResponse;

    const tasks = Array.from(start.tasks);

    const task = tasks.find((item) => item.id === draggableId) as ITaskResponse;

    const taskData = {
      title: task.title,
      order: destination.index + 1,
      description: task.description,
      userId,
      boardId: BOARD_ID,
      columnId: start === finish ? start.id : finish.id,
    };

    try {
      await dispatch(
        editTask({
          boardId: BOARD_ID,
          columnId: start.id,
          taskId: task.id,
          task: taskData,
          token,
        })
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
