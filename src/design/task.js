import { cleanModal, createListItem, TailwindButtonClass } from "../util/helpers";
import { local } from "../storage/local";

const task = () => {
  const ls = local();

  const taskForm = () => {
    const selectProject = document.createElement("select");
    selectProject.setAttribute("required", "required");
    selectProject.setAttribute("id", "projectId");
    const projects = ls.getProjects();
    if (projects) {
      projects.todos.map((p) => {
        const opt = document.createElement("option");
        opt.setAttribute("value", p.projectId);
        opt.innerText = p.projectName;
        selectProject.appendChild(opt);
      });
    }

    const title = document.createElement("input");
    title.setAttribute("type", "text");
    title.setAttribute("id", "title");
    title.setAttribute("required", "required");
    const desc = document.createElement("textarea");
    desc.setAttribute("cols", "30");
    desc.setAttribute("row", "10");
    desc.setAttribute("id", "desc");
    desc.setAttribute("placeholder", "Task description");
    const date = document.createElement("input");
    date.setAttribute("type", "date");
    date.setAttribute("id", "date");
    date.setAttribute("placeholder", "Due date");
    const priority = document.createElement("input");
    priority.setAttribute("type", "number");
    priority.setAttribute("id", "priority");
    priority.setAttribute("placeholder", "Task priority");
    const submit = document.createElement("input");
    submit.setAttribute("type", "button");
    submit.setAttribute("id", "create-task");
    submit.setAttribute("value", "Create Task");
    submit.classList.add(...TailwindButtonClass);
    submit.addEventListener("click", createTask);
    const form = document.createElement("form");
    form.setAttribute("id", "addTodo");
    form.appendChild(selectProject);
    form.appendChild(title);
    form.appendChild(desc);
    form.appendChild(date);
    form.appendChild(priority);
    form.appendChild(submit);

    const template = document.getElementById("tmpl-modal");
    let modalTmpl = template.content.cloneNode(true);
    let workStation = modalTmpl.getElementById("working-station");

    workStation.appendChild(form);

    const modal = cleanModal();

    modal.appendChild(modalTmpl);
  };

  const createTask = (event) => {
    event.preventDefault();

    const projectId = document.getElementById("projectId").value;
    const title = document.getElementById("title").value;
    const desc = document.getElementById("desc").value;
    const date = document.getElementById("date").value;
    const priority = document.getElementById("priority").value;

    const taskId = ls.saveTodoTask({ projectId, title, desc, date, priority });

    const taskData = { projectId, taskId, title, desc, date, priority };

    const taskElem = displayTask(taskData);
    const projectElem = document.getElementById(projectId);
    if (projectElem) {
      projectElem.appendChild(taskElem);
    }

    document.getElementById("addTodo").reset();
    cleanModal();
  };

  const createTodoCard = (project) => {
    const cardHeader = document.createElement("div");
    cardHeader.classList.add(
      "flex",
      "items-center",
      "justify-between",
      "px-8",
      "py-4",
      "bg-purple-100",
      "cursor-pointer"
    );
    const delElem = document.createElement("span");
    delElem.setAttribute("data-pid", project.projectId);
    delElem.classList.add("text-sm");
    delElem.innerText = "Delete";
    delElem.addEventListener("click", deleteProject);
    const projectNameElem = document.createElement("h2");
    projectNameElem.classList.add("text-2xl", "font-light", "text-gray-700");
    projectNameElem.innerText = project.projectName;
    cardHeader.appendChild(projectNameElem);
    cardHeader.appendChild(delElem);
    const ul = document.createElement("ul");
    ul.classList.add(
      "flex-row",
      "divide-y-2",
      "divide-purple-200",
      "divide-dashed"
    );
    ul.setAttribute("id", project.projectId);
    project.tasks.forEach((t) => {
      const task = displayTask(t);
      ul.appendChild(task);
    });
    const card = document.createElement("div");
    card.classList.add("card");
    card.appendChild(cardHeader);
    card.appendChild(ul);
    const todosMain = document.getElementById("taskStation");
    todosMain.appendChild(card);
  };

  const deleteTask = (event) => {
    event.preventDefault();

    const pid = event.target.getAttribute("data-pid");
    const tid = event.target.getAttribute("data-tid");
    if (pid && tid) {
      ls.deleteTaskById(pid, tid);
    }
    return false;
  };

  const deleteProject = (event) => {
    event.preventDefault();
    const pid = event.target.getAttribute("data-pid");
    if (pid) {
      ls.deleteProjectById(pid);
    }
    return false;
  };

  const displayTask = (task) => {
    const taskName = document.createElement("h3");
    const due = document.createElement("p");
    const priority = document.createElement("p");
    const description = document.createElement("p");
    const delTaskElem = document.createElement("span");
    delTaskElem.setAttribute("data-pid", task.projectId);
    delTaskElem.setAttribute("data-tid", task.taskId);
    delTaskElem.classList.add(
      "absolute",
      "bottom-10",
      "right-5",
      "cursor-pointer",
      "text-sm"
    );
    delTaskElem.innerText = "Delete";
    delTaskElem.addEventListener("click", deleteTask);
    taskName.innerText = task.title;
    due.innerText = task.date;
    priority.innerText = task.priority;
    description.innerText = task.desc;
    const li = document.createElement("li");
    li.appendChild(taskName);
    li.appendChild(due);
    li.appendChild(priority);
    li.appendChild(description);
    li.appendChild(delTaskElem);
    li.classList.add("px-8", "py-4", "shadow-lg", "relative");
    return li;
  };

  window.selectProjectToDisplay = (event) => {
    event.preventDefault();
    const id = event.target.getAttribute("data");
    cleanModal("taskStation");
    displayTodos(false, id);
  };

  const displayTodos = (sidebar = false, projectId = 0) => {
    const projects = ls.getProjects();
    if (!projects) {
      return;
    }
    if (sidebar) {
      const ul = document.getElementById("sidebarProjects");
      projects.todos.forEach((p) => {
        const li = createListItem(p, ul);
        ul.appendChild(li);
      });
    } else if (projectId) {
      const selectedProject = ls.getProjectById(projectId);
      createTodoCard(selectedProject);
    } else {
      projects.todos.map((p) => createTodoCard(p));
    }
  };

  return { createTask, taskForm, displayTodos };
};

const t = task();
t.displayTodos(true);

document.getElementById("add-task").addEventListener("click", t.taskForm);

export default task;
