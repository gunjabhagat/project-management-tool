import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to Project Management Tool</h1>
      <nav>
        <Link to="/projects">View Projects</Link>
        <Link to="/tasks">Manage Tasks</Link>
      </nav>
    </div>
  );
}

export default Home;
