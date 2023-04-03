import React, { useState, useEffect } from "react";

const Task = ({ index, task, deleteTask }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <li
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>{task.label}</div>
      {hovered && <button onClick={() => deleteTask(index)}>Delete</button>}
    </li>
  );
};

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      });
  }, [username]);

  const createNewUser = () => {
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`, {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const addTask = async (e) => {
    e.preventDefault();
    const newTask = e.target.elements.task.value.trim();
    if (newTask) {
      const newTasks = [...tasks, { label: newTask, done: false }];
      setTasks(newTasks);
      e.target.elements.task.value = "";
      try {
        const response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`, {
          method: "PUT",
          body: JSON.stringify(newTasks),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("There was a problem updating the tasks:", error);
      }
    }
  };
  
  const deleteTask = async (index) => {
    const newTasks = tasks.filter((task, i) => i !== index);
    setTasks(newTasks);
    try {
      const response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`, {
        method: "PUT",
        body: JSON.stringify(newTasks),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("There was a problem updating the tasks:", error);
    }
  };
  
  const deleteAllTasks = async () => {
    setTasks([]);
    try {
      const response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("There was a problem deleting the tasks:", error);
    }
  };
  

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={addTask}>
        <input type="text" name="task" placeholder="Add a task" />
        <button type="submit">Add Task</button>
      </form>
      <div>
        <input
          type="text"
          value={username}
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={createNewUser}>Create User</button>
      </div>
      {tasks.length === 0 ? (
        <p>No tasks, add a task</p>
      ) : (
        <>
          <ul>
            {tasks.map((task, index) => (
              <Task
                key={index}
                index={index}
                task={task}
                deleteTask={deleteTask}
              />
            ))}
          </ul>
          <button onClick={deleteAllTasks}>Clear All Tasks</button>
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <div>
      <TodoList />
    </div>
  );
}

export default App;