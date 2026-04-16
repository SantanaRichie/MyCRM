import React, { useState, useEffect } from 'react';

const ArtistStories = () => {
  const [projects, setProjects] = useState([
    {
      id: 'proj-1',
      title: 'Album Release: "Echoes of the Void"',
      description: 'Manage all tasks related to the new album launch.',
      tasks: [
        { id: 'task-1', projectId: 'proj-1', title: 'Final Mix & Master', assignee: 'Studio Engineer', status: 'In Progress', dueDate: '2024-05-10' },
        { id: 'task-2', projectId: 'proj-1', title: 'Artwork Design', assignee: 'Graphic Artist', status: 'To Do', dueDate: '2024-05-15' },
        { id: 'task-3', projectId: 'proj-1', title: 'Distributor Upload', assignee: 'Manager', status: 'To Do', dueDate: '2024-05-20' },
        { id: 'task-4', projectId: 'proj-1', title: 'Press Release Draft', assignee: 'Publicist', status: 'Done', dueDate: '2024-04-25' },
      ],
    },
    {
      id: 'proj-2',
      title: 'Summer Tour Planning',
      description: 'Organize logistics for the upcoming summer concert series.',
      tasks: [
        { id: 'task-5', projectId: 'proj-2', title: 'Venue Booking', assignee: 'Agent', status: 'In Progress', dueDate: '2024-06-01' },
        { id: 'task-6', projectId: 'proj-2', title: 'Travel Arrangements', assignee: 'Tour Manager', status: 'To Do', dueDate: '2024-06-10' },
      ],
    },
  ]);

  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null); // For editing existing tasks
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null); // For editing existing projects
  const [menuOpenId, setMenuOpenId] = useState(null);

  // Close menu when clicking outside
  useEffect(() => {
    const closeMenu = () => setMenuOpenId(null);
    if (menuOpenId) {
      window.addEventListener('click', closeMenu);
    }
    return () => window.removeEventListener('click', closeMenu);
  }, [menuOpenId]);

  const handleAddTask = (projectId) => {
    setCurrentTask({ id: `task-${Date.now()}`, projectId, title: '', description: '', assignee: '', status: 'To Do', dueDate: '' });
    setSelectedProject(projects.find(p => p.id === projectId));
    setIsTaskModalOpen(true);
    setMenuOpenId(null);
  };

  const handleEditTask = (task, projectId) => {
    setCurrentTask({ ...task });
    setSelectedProject(projects.find(p => p.id === projectId));
    setIsTaskModalOpen(true);
    setMenuOpenId(null);
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    setProjects(prevProjects => {
      const updatedProjects = prevProjects.map(project => {
        if (project.id === selectedProject.id) {
          const taskIndex = project.tasks.findIndex(t => t.id === currentTask.id);
          const updatedTasks = taskIndex > -1
            ? project.tasks.map(t => t.id === currentTask.id ? currentTask : t)
            : [...project.tasks, currentTask];
          const updatedProject = { ...project, tasks: updatedTasks };
          setSelectedProject(updatedProject);
          return updatedProject;
        }
        return project;
      });
      return updatedProjects;
    });
    setIsTaskModalOpen(false);
    setCurrentTask(null);
  };

  const handleAddProject = () => {
    setCurrentProject({ id: `proj-${Date.now()}`, title: '', description: '', tasks: [] });
    setIsProjectModalOpen(true);
    setMenuOpenId(null);
  };

  const handleEditProject = (project) => {
    setCurrentProject({ ...project });
    setIsProjectModalOpen(true);
    setMenuOpenId(null);
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    setProjects(prevProjects => {
      const isExisting = prevProjects.some(p => p.id === currentProject.id);
      const updatedProjects = isExisting
        ? prevProjects.map(p => p.id === currentProject.id ? currentProject : p)
        : [...prevProjects, currentProject];
      
      if (selectedProject?.id === currentProject.id) {
        setSelectedProject(currentProject);
      }
      return updatedProjects;
    });
    setIsProjectModalOpen(false);
    setCurrentProject(null);
  };

  const handleDeleteProject = (id) => {
    if (window.confirm("Are you sure you want to scrap this project?")) {
      setProjects(projects.filter(p => p.id !== id));
      if (selectedProject?.id === id) setSelectedProject(null);
    }
    setMenuOpenId(null);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedProjects = projects.map(project => {
        if (project.id === selectedProject.id) {
          const updatedTasks = project.tasks.filter(t => t.id !== taskId);
          const updatedProject = { ...project, tasks: updatedTasks };
          setSelectedProject(updatedProject);
          return updatedProject;
        }
        return project;
      });
      setProjects(updatedProjects);
    }
    setMenuOpenId(null);
  };

  return (
    <div className="artist-stories-view">
      <div className="view-header">
        <h2>Project Roadmap</h2>
        <button className="add-button" title="Add New Project" onClick={handleAddProject}>+</button>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Release / Project</th>
              <th>Objective</th>
              <th style={{ width: '100px' }}>Milestones</th>
              <th style={{ width: '50px' }}></th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr 
                key={project.id} 
                onClick={() => setSelectedProject(project)}
                className={selectedProject?.id === project.id ? 'selected-row' : ''}
              >
                <td><strong>{project.title}</strong></td>
                <td>{project.description}</td>
                <td><span className="status-badge" style={{ backgroundColor: 'var(--accent-bg)', color: 'var(--accent)' }}>{project.tasks.length} tasks</span></td>
                <td className="action-cell">
                  <button 
                    className="meatball-button" 
                    onClick={(e) => { e.stopPropagation(); setMenuOpenId(menuOpenId === project.id ? null : project.id); }}
                  >
                    ⋮
                  </button>
                  {menuOpenId === project.id && (
                    <div className="menu-dropdown">
                      <button onClick={(e) => { e.stopPropagation(); handleEditProject(project); }}>Edit Details</button>
                      <button className="danger" onClick={(e) => { e.stopPropagation(); handleDeleteProject(project.id); }}>Scrap Project</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedProject && (
        <div className="details-section" style={{ marginTop: '2rem' }}>
          <div className="view-header">
            <h2>Project Tasks: {selectedProject.title}</h2>
            <button className="add-button" onClick={() => handleAddTask(selectedProject.id)}>+</button>
          </div>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Action Item</th>
                  <th>Crew Member</th>
                  <th>Status</th>
                  <th>Deadline</th>
                  <th style={{ width: '50px' }}></th>
                </tr>
              </thead>
              <tbody>
                {selectedProject.tasks.map(task => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{task.assignee}</td>
                    <td>
                      <span className="status-badge" style={{ 
                        backgroundColor: task.status === 'Done' ? '#dcfce7' : task.status === 'In Progress' ? '#dbeafe' : '#f3f4f6',
                        color: task.status === 'Done' ? '#166534' : task.status === 'In Progress' ? '#1e40af' : '#374151'
                      }}>{task.status}</span>
                    </td>
                    <td>{task.dueDate}</td>
                    <td className="action-cell">
                      <button 
                        className="meatball-button" 
                        onClick={(e) => { e.stopPropagation(); setMenuOpenId(menuOpenId === task.id ? null : task.id); }}
                      >
                        ⋮
                      </button>
                      {menuOpenId === task.id && (
                        <div className="menu-dropdown">
                          <button onClick={(e) => { e.stopPropagation(); handleEditTask(task, selectedProject.id); }}>Edit Task</button>
                          <button className="danger" onClick={(e) => { e.stopPropagation(); handleDeleteTask(task.id); }}>Delete Task</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Task Modal */}
      {isTaskModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{currentTask.id.startsWith('task-') ? 'New Milestone' : 'Update Milestone'}</h3>
            <form onSubmit={handleSaveTask}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Task Title</label>
                  <input type="text" value={currentTask.title} onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Crew / Assignee</label>
                  <input type="text" value={currentTask.assignee} onChange={(e) => setCurrentTask({ ...currentTask, assignee: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Current Stage</label>
                  <select value={currentTask.status} onChange={(e) => setCurrentTask({ ...currentTask, status: e.target.value })}>
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Target Date</label>
                  <input type="date" value={currentTask.dueDate} onChange={(e) => setCurrentTask({ ...currentTask, dueDate: e.target.value })} />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={() => setIsTaskModalOpen(false)}>Discard</button>
                <button type="submit" className="submit-button">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {isProjectModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{currentProject.id.startsWith('proj-') ? 'Start New Project' : 'Edit Project Details'}</h3>
            <form onSubmit={handleSaveProject}>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Release Title</label>
                  <input type="text" value={currentProject.title} onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })} required />
                </div>
                <div className="form-group full-width">
                  <label>Description / Scope</label>
                  <textarea value={currentProject.description} onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })} rows="3"></textarea>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={() => setIsProjectModalOpen(false)}>Discard</button>
                <button type="submit" className="submit-button">Launch Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistStories;