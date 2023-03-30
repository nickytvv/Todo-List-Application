import React, { useState } from 'react';

const Task = ({ index, task, deleteTask }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <li onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div>{task}</div>
      {hovered && <button onClick={() => deleteTask(index)}>Delete</button>}
    </li>
  );
};

const TodoList = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (e) => {
    e.preventDefault();
    const newTask = e.target.elements.task.value.trim();
    if (newTask) {
      setTasks([...tasks, newTask]);
      e.target.elements.task.value = '';
    }
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={addTask}>
        <input type="text" name="task" placeholder="Add a task" />
        <button type="submit">Add Task</button>
      </form>
      {tasks.length === 0 ? (
        <p>No tasks, add a task</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <Task key={index} index={index} task={task} deleteTask={deleteTask} />
          ))}
        </ul>
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
