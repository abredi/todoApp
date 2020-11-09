import {
  cleanModal,
  createListItem,
  createCardHeader,
  deleteProject,
  createUL,
  displayInModal,
  TailwindButtonClass,
  createCard,
} from '../util/helpers';
import { local } from '../storage/local';

const todoUI = () => {
  const addProject = () => {
    const ls = local();
    const projectNameInpElem = document.getElementById('projectName');
    const errorBoard = document.getElementById('formErrorBoard');
    const projectName = projectNameInpElem.value;
    if (!projectName || projectName === '') {
      errorBoard.innerText = 'Please fill the fields';
      return;
    }
    errorBoard.innerText = '';
    errorBoard.classList.add('hidden');

    const pid = ls.saveTodoProject(projectName);
    const newProject = { projectName, projectId: pid };

    const sidebar = document.getElementById('sidebarProjects');
    sidebar.appendChild(createListItem(newProject));

    const projectNameElem = createCardHeader(newProject, deleteProject);
    const ul = createUL(newProject);
    createCard(newProject, projectNameElem, ul);
    cleanModal();
  };

  const createAddProjectForm = () => {
    const projectForm = document.createElement('form');

    projectForm.classList.add('flex', 'flex-col', 'gap-y-6', 'w-full');
    const projectName = document.createElement('input');
    projectName.classList.add(
      'border-b',
      'border-indigo-500',
      'p-4',
      'hover:border-indigo-600',
      'w-full',
    );
    const addPBtn = document.createElement('button');
    addPBtn.classList.add(...TailwindButtonClass);
    addPBtn.setAttribute('type', 'button');

    addPBtn.addEventListener('click', addProject);
    addPBtn.innerText = 'Add a project';

    projectName.setAttribute('placeholder', 'Enter a project name');
    projectName.setAttribute('id', 'projectName');
    projectName.classList.add('float-right');
    const errorMsg = document.createElement('span');
    errorMsg.setAttribute('id', 'formErrorBoard');
    errorMsg.classList.add(
      'text-sm',
      'text-red-500',
      'font-hairline',
      'text-center',
    );
    const heading = document.createElement('h2');
    heading.classList.add(
      'text-2xl',
      'text-gray-700',
      'font-hairline',
      'text-center',
    );
    heading.innerText = 'Add Project';
    projectForm.appendChild(heading);
    projectForm.appendChild(errorMsg);
    projectForm.appendChild(projectName);
    projectForm.appendChild(addPBtn);
    displayInModal(projectForm);
  };

  return { createAddProjectForm };
};

export default todoUI;
