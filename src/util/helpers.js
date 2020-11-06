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

const TailwindButtonClass = `inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-500 focus:outline-none focus:border-purple-700 focus:shadow-outline-red sm:text-sm sm:leading-5`.split(
  " "
);

export { cancelModal, cleanModal, createListItem, TailwindButtonClass };
