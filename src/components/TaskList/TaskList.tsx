import { ITaskResponse } from '../../api/types';
import Task from '../Task/Task';
import './TaskList.scss';

type TaskListProps = {
  tasks: ITaskResponse[];
  columnId: string;
  innerRef: (element: HTMLElement | null) => void;
  children: React.ReactNode | null;
};

const TaskList = ({ tasks, columnId, innerRef }: TaskListProps) => {
  const orderedTasks = tasks.slice().sort((a, b) => a.order - b.order);

  return (
    <ul className="card-list" ref={innerRef}>
      {Boolean(orderedTasks.length) &&
        orderedTasks.map((task, index) => (
          <Task key={task.id} task={task} columnId={columnId} index={index} />
        ))}
    </ul>
  );
};

export default TaskList;
