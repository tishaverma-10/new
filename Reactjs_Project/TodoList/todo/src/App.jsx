import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-200 p-6">
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">📝 React To-Do List</h1>
          <TaskForm />
          <TaskList />
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;