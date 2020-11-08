import { local } from "../storage/local";

const cleanModal = (id = "modalStation") => {
  const modal = document.getElementById(id);
  while (modal.childElementCount > 0) {
    modal.removeChild(modal.firstElementChild);
  }
  return modal;
};

const createListItem = (project) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  li.classList.add("py-1");
  a.classList.add("text-xl", "font-light", "cursor-pointer");
  a.setAttribute("data", project.projectId);
  a.addEventListener("click", window.selectProjectToDisplay);
  a.innerText = project.projectName;
  li.appendChild(a);

  return li;
};

const cancelModal = (event) => {
  event.preventDefault();
  cleanModal();
};

const createSelectElement = (
  ary,
  key,
  value,
  selectedValue = null,
  lable = null
) => {
  const selectElem = document.createElement("select");
  selectElem.setAttribute("required", "required");
  const optDisabled = document.createElement("option");
  optDisabled.value = "";
  optDisabled.setAttribute("disabled", "disabled");
  if (!selectedValue) {
    optDisabled.selected = "true";
  }

  optDisabled.innerText = `Choose ${lable}`;
  selectElem.appendChild(optDisabled);
  selectElem.classList.add(
    "border-b",
    "w-full",
    "border-indigo-500",
    "px-2",
    "py-3"
  );

  if (ary) {
    ary.map((item) => {
      const opt = document.createElement("option");
      if (selectedValue == item[value]) {
        opt.selected = true;
      }
      opt.setAttribute("value", item[value]);
      opt.innerText = item[key];
      selectElem.appendChild(opt);
    });
  }
  return selectElem;
};

const createUL = (project) => {
  const ul = document.createElement("ul");
  ul.classList.add(
    "ml-4",
    "flex-row",
    "divide-y-2",
    "divide-indigo-400",
    "divide-dashed"
  );
  ul.setAttribute("id", project.projectId);

  return ul;
};

const deleteProject = (data) => {
  const ls = local();

  const pid = data.pid;

  if (pid) {
    ls.deleteProjectById(pid);
    const projectCard = document.querySelector(`[data-card-pid="${pid}"]`);
    const projectList = document.querySelector(`a[data="${pid}"]`);
    if (projectCard) {
      projectCard.parentElement.removeChild(projectCard);
      projectList.parentElement.parentElement.removeChild(
        projectList.parentElement
      );
    }
  }
  return false;
};

const createCardHeader = (project, cb) => {
  const cardHeader = document.createElement("div");
  cardHeader.classList.add(
    "flex",
    "items-center",
    "justify-between",
    "px-8",
    "py-4",
    "bg-gray-200",
    "cursor-pointer"
  );
  const delElem = document.createElement("button");
  delElem.setAttribute("data-pid", project.projectId);
  delElem.classList.add("text-sm", "text-red-600", "focus:outline-none");
  delElem.innerText = "Delete";
  delElem.addEventListener("click", cb);
  const projectNameElem = document.createElement("h2");
  projectNameElem.classList.add("text-2xl", "font-light", "text-gray-700");
  projectNameElem.innerText = project.projectName;
  cardHeader.appendChild(projectNameElem);
  cardHeader.appendChild(delElem);
  return cardHeader;
};

const displayOnModal = (innerContent) => {
  const template = document.getElementById("tmpl-modal");
  const modalTmpl = template.content.cloneNode(true);
  const workStation = modalTmpl.getElementById("working-station");
  const modalContainer = modalTmpl.getElementById("modalContainer");
  modalContainer.addEventListener("click", cancelModal);

  workStation.appendChild(innerContent);

  const modal = cleanModal();

  modal.appendChild(modalTmpl);
};

const TailwindButtonClass = `inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-red sm:text-sm sm:leading-5`.split(
  " "
);

export {
  deleteProject,
  createSelectElement,
  cancelModal,
  cleanModal,
  createListItem,
  TailwindButtonClass,
  createCardHeader,
  createUL,
  displayOnModal,
};
