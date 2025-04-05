import React, { useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Button,
  Typography,
} from '@mui/material';
import './TaskList.css';

const TaskList = ({ tasks, fetchTasks }) => {
  const [editTask, setEditTask] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const handleEditSave = async () => {
    try {
      await axios.patch(
        `https://taskmanagerproject-qzlz.onrender.com/api/tasks/${editTask._id}`,
        editTask
      );
      setEditTask(null);
      fetchTasks();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `https://taskmanagerproject-qzlz.onrender.com/api/tasks/${deleteTaskId}`
      );
      setDeleteTaskId(null);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <>
      {Array.isArray(tasks) && tasks.length > 0 ? (
        tasks.map(task => (
          <div className="task-card" key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p className={`status ${task.status}`}>Status: {task.status}</p>
            <div className="task-buttons">
              <button className="edit" onClick={() => setEditTask(task)}>
                Edit
              </button>
              <button
                className="delete"
                onClick={() => setDeleteTaskId(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <Typography>No tasks found.</Typography>
      )}

      {/* Edit Task Dialog */}
      <Dialog
        open={!!editTask}
        onClose={() => setEditTask(null)}
        PaperProps={{ className: 'glass-dialog' }}
      >
        <DialogTitle className="glass-title">Edit Task</DialogTitle>
        <DialogContent
          className="glass-content"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Title"
            value={editTask?.title || ''}
            onChange={e => setEditTask({ ...editTask, title: e.target.value })}
            fullWidth
          />
          <TextField
            label="Description"
            value={editTask?.description || ''}
            onChange={e =>
              setEditTask({ ...editTask, description: e.target.value })
            }
            fullWidth
          />
          <TextField
            select
            label="Status"
            value={editTask?.status || ''}
            onChange={e => setEditTask({ ...editTask, status: e.target.value })}
            fullWidth
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button className="glass-button" onClick={() => setEditTask(null)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            className="glass-button"
            onClick={handleEditSave}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteTaskId}
        onClose={() => setDeleteTaskId(null)}
        PaperProps={{ className: 'glass-dialog' }}
      >
        <DialogTitle className="glass-title">Delete Task</DialogTitle>
        <DialogContent className="glass-content">
          <Typography>Are you sure you want to delete this task?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            className="glass-button"
            onClick={() => setDeleteTaskId(null)}
            color="primary"
          >
            No
          </Button>
          <Button
            className="glass-button"
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskList;
