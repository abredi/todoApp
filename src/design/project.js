import {
  cancelModal,
  cleanModal,
  createListItem,
  createCardHeader,
  deleteProject,
  createUL,
  TailwindButtonClass,
} from "../util/helpers";
import { local } from "../storage/local";

const todoUI = () => {
  const addProject = () => {
    const ls = local();
    const projectNameInpElem = document.getElementById("projectName");
    const projectName = projectNameInpElem.value;
    if (!projectName || projectName == "") {
      return;
    }

    const pid = ls.saveTodoProject(projectName);
    const newProject = { projectName, projectId: pid };

    const sidebar = document.getElementById("sidebarProjects");
    sidebar.appendChild(createListItem(newProject));

    const projectNameElem = createCardHeader(newProject, deleteProject);
    const ul = createUL(newProject);
    const card = document.createElement("div");
    card.setAttribute("data-card-pid", newProject.projectId);
    card.classList.add("card");
    card.appendChild(projectNameElem);
    card.appendChild(ul);

    const todosMain = document.getElementById("taskStation");
    todosMain.appendChild(card);
    cleanModal();
  };

  const createAddProjectForm = () => {
    const projectForm = document.createElement("form");

    projectForm.classList.add("flex", "flex-col", "gap-y-6", "w-full");
    const projectName = document.createElement("input");
    projectName.classList.add(
      "border-b",
      "p-4",
      "hover:border-indigo-700",
      "focus:border-indigo-700",
      "w-full"
    );
    const addPBtn = document.createElement("button");
    addPBtn.classList.add(...TailwindButtonClass);
    addPBtn.setAttribute("type", "button");

    addPBtn.addEventListener("click", addProject);
    addPBtn.innerText = "Add a project";

    projectName.setAttribute("placeholder", "Enter a project name");
    projectName.setAttribute("id", "projectName");
    projectName.classList.add("float-right");
    projectForm.appendChild(projectName);
    projectForm.appendChild(addPBtn);

    const template = document.getElementById("tmpl-modal");
    const modalTmpl = template.content.cloneNode(true);
    const workStation = modalTmpl.getElementById("working-station");
    const modalContainer = modalTmpl.getElementById("modalContainer");

    modalContainer.addEventListener("click", cancelModal);

    workStation.appendChild(projectForm);

    const modal = cleanModal();

    modal.appendChild(modalTmpl);
  };

  return { createAddProjectForm };
};

export default todoUI;
