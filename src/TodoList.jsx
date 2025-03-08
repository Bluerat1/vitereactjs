import { useState, useEffect } from "react";


export default function TodoList() {

  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );


  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addTask = () => {
    if (task.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: task,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setTask("");
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setEditingId(id);
      setEditText(taskToEdit.text);
    }
  };

  const handleSave = () => {
    if (editText.trim() === "") return;
    setTasks(tasks.map(task =>
      task.id === editingId ? { ...task, text: editText } : task
    ));
    setEditingId(null);
  };

  const toggleCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  // Render
  return (
    <div className="app">
      <h2>To-Do List</h2>
      <button onClick={toggleDarkMode}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <input
        type="text"
        placeholder="Add a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      <div>
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
        <button onClick={() => setFilter("Pending")}>Pending</button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <div>
          <li className="task-item"
            key={task.id}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? "green" : "blue",
            }}
            container
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompletion(task.id)}
            />
            {editingId === task.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <button onClick={() => editTask(task.id)}>Edit</button>
                <button onClick={() => removeTask(task.id)}>Delete</button>
              </>
            )}
          </li>
          </div>
        ))}
      </ul>

      <style>{`
        body.dark {
          background-color: #121212;
          color: white;
        }
        body.light {
          background-color: white;
          color: black;
        }
        .dark button {
          background-color: #333;
          color: white;
          border: 1px solid white;
        }
        .light button {
          background-color: #f0f0f0;
          color: black;
          border: 1px solid black;
        }

        /* Input styles for dark mode */
        body.dark input {
            background-color: #333;
            color: white;
            border: 1px solid white;
        }


        /* Base styling for list items */
        .task-item {
            padding: 10px;
            margin-bottom: 5px;
        }


        /* Highlight box for list items in dark mode */
        body.dark .task-item {
            background-color:rgb(112, 110, 110);
        }

        /* Task text color in light mode */
        body.light .task-text {
            color: black;
        }

        /* Completed task text in light mode */
        body.light .task-text.completed {
            color: gray;
            text-decoration: line-through;
        }

        /* Task text color in dark mode */
        body.dark .task-text {
            color: white;
        }

        /* Completed task text in dark mode */
        body.dark .task-text.completed {
            color: green;
            text-decoration: line-through;
        }
      `}</style>
    </div>
  );
}