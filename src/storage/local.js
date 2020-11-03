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
      projectId: project.todos.length + 1,
      tasks: []
    }];

    store(todos);
  };

  const getProjects = () => {
    const project = localStorage.getItem('project');
    if (project) {
      return JSON.parse(project);
    }

    return false
  }

  const saveTodoTask = (todo) => {
    const todos = getProjects().todos;
    if (!todos) {
      return false;
    }

    const updatedTodos = todos.map(t => {
      if (todo.projectId == t.projectId) {
         t.tasks = [...t.tasks, todo];
      }
      return t
    });
    
    store(updatedTodos)
  };

  const store = (todos) => {
    localStorage.setItem('project', JSON.stringify({todos}));
  }

  return {saveTodoProject, getProjects, saveTodoTask}
}

