import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map(project => (
          <li key={project._id}>
            <h2><Link to={`/projects/${project._id}`}>{project.name}</Link></h2>
            <p>{project.description}</p>
            <p>Deadline: {new Date(project.deadline).toDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;
