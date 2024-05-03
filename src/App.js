import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        setTasks(response.data);
      });
  }, []);

  const addTask = (e) => {
    e.preventDefault(); 
    if (newTask.trim() === '') return;
    const newTaskObj = {
      id: Math.floor(Math.random() * 10000),
      title: newTask,
      completed: false
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };
  

  <form onSubmit={addTask} className="form-control">
  <input
    type="text"
    placeholder="Add Task"
    value={newTask}
    onChange={(e) => setNewTask(e.target.value)}
  />
  <button type="submit" className="btn add-btn">Add</button>
</form>


  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const filteredTasks = tasks.filter(task => filter === 'all' || (filter === 'completed' && task.completed) || (filter === 'incomplete' && !task.completed));

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    const updatedTasks = tasks.map(task => {
      if (task.id.toString() === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1>Task Tracker</h1>
      <form onSubmit={addTask} className="form-control">
        <input
          type="text"
          placeholder="Add Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit" className="btn add-btn">Add</button>
      </form>
      <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
      <div className="task-container" onDragOver={handleDragOver} onDrop={handleDrop}>
        {filteredTasks.map(task => (
          <div
            key={task.id}
            className={`task ${task.completed ? 'completed' : ''}`}
            draggable
            onDragStart={(e) => handleDragStart(e, task.id)}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <p>{task.title}</p>
            <button onClick={() => deleteTask(task.id)} className="btn delete-btn ">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
