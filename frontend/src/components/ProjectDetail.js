import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TaskList from './TaskList';

function ProjectDetail() {
  const [project, setProject] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/projects/${id}`)
      .then(response => setProject(response.data))
      .catch(error => console.error('Error fetching project:', error));
  }, [id]);

  if (!project) return <div>Loading...</div>;

  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
      <p>Deadline: {new Date(project.deadline).toDateString()}</p>
      <h2>Tasks</h2>
      <TaskList projectId={id} />
    </div>
  );
}

export default ProjectDetail;
