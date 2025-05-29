import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//React hook to manage state in functinal components
import { useState } from "react";

// Type checking when we use id, text, done later
// its like OOP ngl
interface Task {
  id: number; //unique identifier for each task
  text: string; //task description
  done: boolean; //whether task is completed
}

function App() {
  //state to store list of tasks
  const [tasks, setTasks] = useState<Task[]>([]);


  //state to store the current input value for a new task
  const [newTask, setNewTask] = useState("");

  //function to add new task to the list 
  const handleAddTask = () => {

    //Return nothing if input is empty spaces
    if (newTask.trim() === "") return;

    //Create a new task object
    const task: Task = {
      id: Date.now(), //Using timestamp as unique ID
      text: newTask.trim(),
      done: false,
    }

    //Update task list with newTask
     setTasks([...tasks, task]);

     //Clear input box
     setNewTask("");
  }

  //function to toggle the 'done' status of a task using ternary operators 
     const toggleDone = (id: number) => {
      setTasks(
        tasks.map(
          (task) => task.id === id ? {...task, done: !task.done}: task
        )
      );
     };

     const deleteTask = (id: number) => {
      setTasks(tasks.filter((task) => task.id !== id));
     };


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Task Manager</h1>

      {/* Input + Add button */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Task list */}
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center border-b border-gray-200 py-2"
          >
            <div
              onClick={() => toggleDone(task.id)}
              className={`cursor-pointer select-none ${
                task.done ? "line-through text-gray-400" : ""
              }`}
            >
              {task.text}
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
