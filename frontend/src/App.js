import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import TaskForm from './components/TaskForm';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/tasks/:id" element={<TaskForm />} />
          <Route path="/tasks" element={<TaskForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
