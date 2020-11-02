export const local = () => {
  const saveTodoProject = (todo) => {
    let project = localStorage.getItem('project');
    if (!project) {
        project = localStorage.setItem('project', '{"todos": []}');
        project = localStorage.getItem('project');
    }
  
    project = JSON.parse(project);
    const todos = [...project.todos, {
      projectName: todo,
      projectId: project.todos.length + 1
    }];

    localStorage.setItem('project', JSON.stringify({todos}));
  };

  const getProjects = () => {
    let project = localStorage.getItem('project');
    if (project) {
      return JSON.parse(project);;
    }

    return false
  }

  const saveTodoTask = (todo) => {
    const projects = getProjects();
    if (projects) {
      
    }
  }

  return {saveTodoProject, getProjects, saveTodoTask}
}

