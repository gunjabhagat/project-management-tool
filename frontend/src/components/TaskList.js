import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TaskList({ projectId }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then(response => {
        if (projectId) {
          setTasks(response.data.filter(task => task.project === projectId));
        } else {
          setTasks(response.data);
        }
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, [projectId]);

  return (
    <div>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Deadline: {new Date(task.deadline).toDateString()}</p>
            <Link to={`/tasks/${task._id}`}>Edit Task</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
