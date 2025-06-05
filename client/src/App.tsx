
import './App.css'

//React hook to manage state in functinal components
import { useState, useEffect } from "react";

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

  useEffect(() => {
    fetch("http://localhost:8080/tasks") //sends request to server to get tasks
      .then((res) => res.json()) //server responds with json, convert response to JS object/arrray  
      .then((data) => setTasks(data)) //Updates the 'tasks' state with the fetched data
      .catch((err) => console.error("Error fetching tasks:", err)); //catches any error
  }, []); //empty dependency  array means this runs once after the component mounts

  //function to add new task to the list 
  const handleAddTask = () => {
    fetch('http://localhost:8080/tasks', { //sends a request to the URL
      method: 'POST', //tellig the backend that you want to add a new task
      headers: {'Content-Type': 'application/json'}, //provide metadata about the request by describing its details. this tells the server that you are JSON data in the body so that the server knows how to parse the data
      body: JSON.stringify({text: newTask, done: false}), //the body is the actual data you want to send, since fetch requires a string, stringify converts the JS object into a string
    }) 
    .then((res) => res.json()) //when the server responds, fetch returns a response object res, the .json() method reads the response body and parses it into a JavaScript object or array
    .then((task: Task) => {
      setTasks((prev) => [...prev, task]); //add task to UI (You're passing a function to setTasks. That function receives the latest/current value of tasks, and you're expected to return a new one.)
      setNewTask(''); //clear input field
    }) //the parsed task's data is returned from the server 
    .catch((err) => console.error('Error adding task:', err));

  };

  //function to toggle the 'done' status of a task using ternary operators
  const toggleDone = (id: number) => { //takes in id as an input
    const task = tasks.find((t) => t.id === id); //function returns if such a task id exists or not
    if (!task) return; //if no id exist, terminate

    const updatedTask = {...task, done: !task.done} //toggle done for task
    
    fetch('http://localhost:8080/tasks/${id}', { //sends a request for the task's id
      method: "Patch", //specifies that we want to partially update the task
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({done: updatedTask.done}), //Set the key done to the value of updatedTask.done and only sending the done field with the toggled value
    })
    .then((res) => res.json()) //even though we dont use the parsed response, we need it to complete the HTTP response
    .then(() => { //recevies the parsed response but since we don't use it, we do not need to fill in the first ()
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? updatedTask : t)) //If the task has the same id as the one we want to update, replace it with the updatedTask. Otherwise, keep the old task t. 
        // SYNTAX: condition ? valueIfTrue : valueIfFalse
      );
    })
    .catch((err) => console.error('Error adding task:', err));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center text-black">Task Manager</h1>

      {/* Input + Add button */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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
                task.done ? "line-through text-gray-400" : "text-black"
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
