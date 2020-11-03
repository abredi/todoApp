export const local = () => {
  const saveTodoProject = (todo) => {
    let project = localStorage.getItem('project');
    if (!project) {
        project = localStorage.setItem('project', '{"todos": []}');
        project = localStorage.getItem('project');
    }
  
    project = JSON.parse(project);
    const id = project.todos.length + 1
    const todos = [...project.todos, {
      projectName: todo,
      projectId: id,
      tasks: []
    }];

    store(todos);

    return id;
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

