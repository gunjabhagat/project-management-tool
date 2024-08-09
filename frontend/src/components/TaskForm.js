import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function TaskForm() {
  const [task, setTask] = useState({ title: '', description: '', status: 'Not Started', deadline: '', project: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/tasks/${id}`)
        .then(response => setTask(response.data))
        .catch(error => console.error('Error fetching task:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`http://localhost:5000/api/tasks/${id}`, task)
        .then(() => navigate('/projects'))
        .catch(error => console.error('Error updating task:', error));
    } else {
      axios.post('http://localhost:5000/api/tasks', task)
        .then(() => navigate('/projects'))
        .catch(error => console.error('Error creating task:', error));
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Task' : 'Create Task'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={task.title} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={task.description} onChange={handleChange}></textarea>
        </label>
        <label>
          Status:
          <select name="status" value={task.status} onChange={handleChange}>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <label>
          Deadline:
          <input type="date" name="deadline" value={task.deadline} onChange={handleChange} />
        </label>
        <label>
          Project:
          <input type="text" name="project" value={task.project} onChange={handleChange} />
        </label>
        <button type="submit">{id ? 'Update Task' : 'Create Task'}</button>
      </form>
    </div>
  );
}

export default TaskForm;
