// src/components/TaskItem.jsx
import { useState } from 'react';
import { useTask } from '../context/TaskContext';

const TaskItem = ({ task }) => {
  const { deleteTask, toggleComplete, updateTask } = useTask();
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
  });

  const handleUpdate = () => {
    updateTask(task.id, editValues);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow mb-3">
      {isEditing ? (
        <>
          <input
            className="w-full border p-1 mb-1"
            value={editValues.title}
            onChange={(e) => setEditValues({ ...editValues, title: e.target.value })}
          />
          <textarea
            className="w-full border p-1 mb-1"
            value={editValues.description}
            onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
          />
          <select
            className="w-full border p-1 mb-2"
            value={editValues.priority}
            onChange={(e) => setEditValues({ ...editValues, priority: e.target.value })}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 rounded mr-2">
            Save
          </button>
        </>
      ) : (
        <>
          <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.title} <span className="text-sm text-gray-600">({task.priority})</span>
          </h3>
          <p className={`${task.completed ? 'line-through text-gray-500' : ''}`}>{task.description}</p>
          <div className="mt-2">
            <button onClick={() => toggleComplete(task.id)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
              Edit
            </button>
            <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white px-2 py-1 rounded">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;