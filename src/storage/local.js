export const local = () => {
  const store = (todos) => {
    localStorage.setItem('project', JSON.stringify({ todos }));
  };

  const saveTodoProject = (todo) => {
    let project = localStorage.getItem('project');
    if (!project) {
      project = localStorage.setItem('project', '{"todos": []}');
      project = localStorage.getItem('project');
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
    const project = localStorage.getItem('project');
    if (project) {
      return JSON.parse(project);
    }

    return false;
  };

  const updateTask = (project, task) => {
    const updatedTasks = project.tasks.map((t) => {
      if (t.taskId === task.taskId) {
        return task;
      }
      return t;
    });

    return { ...project, tasks: updatedTasks };
  };

  const modifyTask = (givenTodo, project) => {
    if ('taskId' in givenTodo) {
      project = updateTask(project, givenTodo);
    } else {
      givenTodo = { ...givenTodo, taskId: project.tasks.length + 1 };
      project = { ...project, tasks: [...project.tasks, givenTodo] };
    }
    return { givenTodo, project };
  };

  const saveTodoTask = (givenTask) => {
    const { todos } = getProjects();
    if (!todos) {
      return false;
    }
    let taskId = 0;
    const updatedTodos = todos.map((project) => {
      if (givenTask.projectId === project.projectId) {
        const modifiedData = modifyTask(givenTask, project);
        taskId = modifiedData.givenTodo.taskId;
        // return { ...project, tasks: modifiedData.tasks };
        return modifiedData.project;
      }
      return project;
    });

    store(updatedTodos);

    return taskId;
  };

  const getProjectById = (id) => {
    const projects = getProjects();
    const p = projects.todos.find((p) => p.projectId === id);
    if (p) {
      return p;
    }
    return false;
  };

  const getTaskById = (projectId, taskId) => {
    const project = getProjectById(projectId);
    if (!project) {
      return false;
    }
    const task = project.tasks.find((t) => t.taskId === taskId);
    if (task) {
      return task;
    }
    return false;
  };

  const deleteProjectById = (id) => {
    const projects = getProjects();
    const filteredProjects = projects.todos.filter((p) => p.projectId !== id);
    store(filteredProjects);
  };

  const deleteTaskById = (projectId, taskId) => {
    const projects = getProjects();
    const updatedTodos = projects.todos.map((p) => {
      if (projectId === p.projectId) {
        p.tasks = p.tasks.filter((t) => t.taskId !== taskId);
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
    getTaskById,
  };
};

export default local;