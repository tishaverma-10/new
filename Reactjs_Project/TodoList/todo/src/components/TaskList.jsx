// src/components/TaskList.jsx
import { useTask } from '../context/TaskContext';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { tasks } = useTask();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Your Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks added.</p>
      ) : (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      )}
    </div>
  );
};

export default TaskList;