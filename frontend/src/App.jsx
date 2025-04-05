import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './Components/TaskForm/taskform';
import TaskList from './Components/TaskList/tasklist';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `/api/tasks${filter ? '?status=' + filter : ''}`
      );
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  return (
    <div className="app-container">
      <h1 className="app-title">Task Manager</h1>

      <TaskForm
        onSubmit={async taskData => {
          try {
            await axios.post('/api/tasks', taskData);
            fetchTasks();
          } catch (error) {
            console.error('Error adding task:', error);
            alert('Failed to add task.');
          }
        }}
      />

      <div className="filter-buttons">
        <button
          className={filter === '' ? 'active' : ''}
          onClick={() => setFilter('')}
        >
          All
        </button>
        <button
          className={`pending ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          className={`completed ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      <TaskList tasks={tasks} fetchTasks={fetchTasks} />
    </div>
  );
}

export default App;
