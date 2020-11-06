import {
  deleteProject,
  createUL,
  cleanModal,
  createListItem,
  TailwindButtonClass,
  cancelModal,
  createSelectElement,
  createCardHeader,
} from "../util/helpers";
import { local } from "../storage/local";

const task = () => {
  const ls = local();

  const taskForm = (task = {}) => {
    const projects = ls.getProjects();
    const selectProject = createSelectElement(
      projects.todos,
      "projectName",
      "projectId",
      task.projectId,
      'Project'
    );
    selectProject.setAttribute("id", "projectId");

    const title = document.createElement("input");
    title.setAttribute("type", "text");
    title.setAttribute("value", task.title || "");
    title.setAttribute("id", "title");
    title.setAttribute("required", "required");
    title.setAttribute("placeholder", "Task title");
    title.classList.add("border-b", "border-indigo-500", "px-3");
    const desc = document.createElement("textarea");
    desc.innerText = task.desc || "";
    desc.setAttribute("cols", "30");
    desc.setAttribute("row", "30");
    desc.setAttribute("id", "desc");
    desc.classList.add("border-b", "border-indigo-500", "px-3");
    desc.setAttribute("placeholder", "Task description");
    desc.classList.add(
      "border-b",
      "border-solid",
      "border-1",
      "border-gray-600",
      "p-3",
      "col-span-2"
    );
    const date = document.createElement("input");
    date.setAttribute("value", task.date || "");
    date.setAttribute("type", "date");
    date.setAttribute("id", "date");
    date.setAttribute("placeholder", "Due date");
    date.classList.add("border-b", "border-indigo-500");

    const priority = createSelectElement(
      [
        { priorityName: "One", priorityValue: "1" },
        { priorityName: "Two", priorityValue: "2" },
        { priorityName: "Three", priorityValue: "3" },
      ],
      "priorityName",
      "priorityValue",
      task.priority || "",
      'Priority'
    );
    priority.setAttribute("placeholder", "Task priority");
    priority.setAttribute("id", "priority");

    const submit = document.createElement("input");
    submit.setAttribute("type", "button");
    submit.setAttribute("id", "create-task");
    const submitLabel = task.hasOwnProperty("projectId")
      ? "Update Task"
      : "Create Task";
    submit.setAttribute("value", submitLabel);
    submit.setAttribute("task-id", task.taskId || "");
    submit.classList.add(...TailwindButtonClass);
    submit.addEventListener("click", createTask);
    const form = document.createElement("form");
    form.classList.add("grid", "gap-6", "grid-cols-2");
    form.setAttribute("id", "addTodo");
    form.appendChild(selectProject);
    form.appendChild(title);
    form.appendChild(date);
    form.appendChild(priority);
    form.appendChild(desc);
    form.appendChild(submit);

    const template = document.getElementById("tmpl-modal");
    const modalTmpl = template.content.cloneNode(true);
    const workStation = modalTmpl.getElementById("working-station");
    const modalContainer = modalTmpl.getElementById("modalContainer");
    modalContainer.addEventListener("click", cancelModal);

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
    let taskId = event.target.getAttribute("task-id");

    let taskData = { projectId, title, desc, date, priority };

    const updateProcess = taskId && taskId != "";
    if (updateProcess) {
      taskData = { ...taskData, taskId };
    }

    taskId = ls.saveTodoTask(taskData);

    taskData = { ...taskData, taskId };

    const taskElem = displayTask(taskData);

    if (updateProcess) {
      const taskUi = document.querySelector(
        `[data-task-id="${projectId}_${taskId}"]`
      );
      taskUi.parentElement.replaceChild(taskElem, taskUi);
    } else {
      const projectElem = document.getElementById(projectId);
      if (projectElem) {
        projectElem.appendChild(taskElem);
      }
    }

    document.getElementById("addTodo").reset();
    cleanModal();
  };

  const toggleVisibility = (event) => {
    event.target.nextElementSibling.classList.toggle("hidden");
  };

  const createTodoCard = (project) => {
    const cardHeader = createCardHeader(project, deleteProject);
    const ul = createUL(project);
    project.tasks.forEach((t) => {
      const task = displayTask(t);
      ul.appendChild(task);
    });
    const card = document.createElement("div");
    card.setAttribute("data-card-pid", project.projectId);
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
      const taskList = document.querySelector(
        `li[data-task-id="${pid}_${tid}"]`
      );
      if (taskList) {
        taskList.parentElement.removeChild(taskList);
      }
    }
    return false;
  };

  const editTask = (event) => {
    event.preventDefault();

    const pid = event.target.getAttribute("data-pid");
    const tid = event.target.getAttribute("data-tid");
    if (!pid || !tid) {
      return;
    }
    const task = ls.getTaskById(pid, tid);
    if (!task) {
      return;
    }

    taskForm(task);
  };

  const displayTask = (task) => {
    const taskName = document.createElement("h3");
    taskName.innerText = task.title;
    taskName.addEventListener("click", toggleVisibility);
    taskName.classList.add("cursor-pointer");
    const due = document.createElement("p");
    const priority = document.createElement("p");
    const description = document.createElement("p");
    const delTaskElem = document.createElement("button");
    delTaskElem.setAttribute("data-pid", task.projectId);
    delTaskElem.setAttribute("data-tid", task.taskId);
    delTaskElem.classList.add(
      "absolute",
      "bottom-10",
      "right-5",
      "cursor-pointer",
      "text-sm",
      "text-red-600",
      "focus:outline-none"
    );
    delTaskElem.innerText = "Delete";
    delTaskElem.addEventListener("click", deleteTask);

    const editTaskElem = document.createElement("button");
    editTaskElem.setAttribute("data-pid", task.projectId);
    editTaskElem.setAttribute("data-tid", task.taskId);
    editTaskElem.classList.add(
      "absolute",
      "bottom-10",
      "right-10",
      "cursor-pointer",
      "text-sm",
      "text-indigo-900",
      "focus:outline-none"
    );
    editTaskElem.innerText = "Edit";
    editTaskElem.addEventListener("click", editTask);

    due.innerText = task.date;
    priority.innerText = task.priority;
    description.innerText = task.desc;
    const taskDetail = document.createElement("div");
    taskDetail.classList.add("hidden");
    taskDetail.appendChild(due);
    taskDetail.appendChild(priority);
    taskDetail.appendChild(description);
    taskDetail.appendChild(editTaskElem);
    taskDetail.appendChild(delTaskElem);
    const li = document.createElement("li");
    li.setAttribute("data-task-id", `${task.projectId}_${task.taskId}`);
    li.appendChild(taskName);
    li.appendChild(taskDetail);
    const priorityNumber = parseInt(task.priority, 10);
    const ListBgColor =
      priorityNumber === 3
        ? "bg-gray-100"
        : priorityNumber === 2
        ? "bg-indigo-200"
        : "bg-indigo-300";
    li.classList.add("px-8", "py-4", "shadow-lg", "relative", ListBgColor);
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
      createSidebarList(projects);
    } else if (projectId) {
      const selectedProject = ls.getProjectById(projectId);
      createTodoCard(selectedProject);
    } else {
      createSidebarList(projects);
      projects.todos.map((p) => createTodoCard(p));
    }
  };

  const displayAllProjects = (event) => {
    event.preventDefault();
    cleanModal();
    cleanModal("sidebarProjects");
    cleanModal("taskStation");
    displayTodos();
  };

  const createSidebarList = (projects) => {
    const ul = document.getElementById("sidebarProjects");
    projects.todos.forEach((p) => {
      const li = createListItem(p, ul);
      ul.appendChild(li);
    });
  };

  return { displayAllProjects, createTask, taskForm, displayTodos };
};

export default task;
