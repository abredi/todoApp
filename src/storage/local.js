export const local = () => {
  const saveTodoProject = (todo) => {
    let project = localStorage.getItem("project");
    if (!project) {
      project = localStorage.setItem("project", '{"todos": []}');
      project = localStorage.getItem("project");
    }

    project = JSON.parse(project);
    const id = project.todos.length + 1;
    const todos = [
      ...project.todos,
      {
        projectName: todo,
        projectId: id,
        tasks: [],
      },
    ];

    store(todos);

    return id;
  };

  const getProjects = () => {
    const project = localStorage.getItem("project");
    if (project) {
      return JSON.parse(project);
    }

    return false;
  };

  const saveTodoTask = (todo) => {
    const todos = getProjects().todos;
    if (!todos) {
      return false;
    }
    let taskId = 0;
    const updatedTodos = todos.map((t) => {
      if (todo.projectId == t.projectId) {
        taskId = t.tasks.length + 1;
        const newTodo = {...todo, taskId}
        t.tasks = [...t.tasks, newTodo];
      } 
      return t;
    });

    store(updatedTodos);

    return taskId;
  };

  const store = (todos) => {
    localStorage.setItem("project", JSON.stringify({ todos }));
  };

  const getProjectById = (id) => {
    const projects = getProjects();
    const p = projects.todos.find((p) => p.projectId == id);
    if (p) {
      return p;
    }
    return false;
  };

  const deleteProjectById = (id) => {
    const projects = getProjects();
    const filteredProjects = projects.todos.filter((p) => p.projectId != id);
    store(filteredProjects);
  };

  const deleteTaskById = (projectId, taskId) => {
    const projects = getProjects();
    const updatedTodos = projects.todos.map((p) => {
      if (projectId == p.projectId) {
         const filteredTasks = p.tasks.filter(
           (p) => p.projectId !== taskId
         );
         p.tasks = filteredTasks;
       }
       return p;
     });

     store(updatedTodos);
  };

  return {
    deleteTaskById,
    deleteProjectById,
    getProjectById,
    saveTodoProject,
    getProjects,
    saveTodoTask,
  };
};
