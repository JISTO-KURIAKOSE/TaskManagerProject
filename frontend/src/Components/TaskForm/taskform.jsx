import { useState } from 'react';
import './TaskForm.css';

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (!status) {
      alert('Please select a status');
      return;
    }

    onSubmit({ title, description, status });

    setTitle('');
    setDescription('');
    setStatus('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>Add New Task</h2>

      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label>Status</label>
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          required
        >
          <option value="" disabled>
            Select status
          </option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
