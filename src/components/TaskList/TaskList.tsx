import { ITaskResponse } from '../../api/types';
import Task from '../Task/Task';
import './TaskList.scss';

type TaskListProps = {
  tasks: ITaskResponse[];
};

const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <ul className="card-list">
      {Boolean(tasks.length) &&
        tasks.map((task) => <Task key={task.id} task={task} columnId={task.columnId} />)}
    </ul>
  );
};

export default TaskList;
