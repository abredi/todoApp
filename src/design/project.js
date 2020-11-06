import { cleanModal, createListItem } from "../util/helpers";
import { local } from "../storage/local";

const todoUI = () => {

    const addProject = () => {
        const ls = local();
        const projectNameInpElem = document.getElementById('projectName');
        const projectName = projectNameInpElem.value;
        if (!projectName || projectName == '') {
            return;
        }

        const pid = ls.saveTodoProject(projectName);

        const sidebar = document.getElementById("sidebarProjects");
        sidebar.appendChild(createListItem({ projectName, projectId: pid }));

        const projectNameElem = document.createElement('h2');
        projectNameElem.innerText = projectName;

        const ul = document.createElement('ul');
        ul.setAttribute('id', pid);

        const card = document.createElement('div');
        card.classList.add('card');
        card.appendChild(projectNameElem);
        card.appendChild(ul);

        const todosMain = document.getElementById("taskStation");
        todosMain.appendChild(card);

        projectNameInpElem.value = '';
    };

    const createAddProjectForm = () => {
        const addProjectExist = document.querySelector('.project-form');

        if (addProjectExist) {
            return;
        }

        const projectFormWrapper = document.createElement('div');
        projectFormWrapper.classList.add('project-form');

        const projectForm = document.createElement('form');
        projectForm.classList.add('border','shadow-2xl','p-8');
        const projectName = document.createElement('input');
        projectName.classList.add('border-b','p-4','hover:border-green-700','focus:border-green-700');
        const addPBtn = document.createElement('button');
        addPBtn.classList.add('bg-green-700', 'hover:bg-green-900', 'focus:bg-green-900','p-2', 'text-white')
        addPBtn.setAttribute('type','button');
        
        addPBtn.addEventListener('click', addProject);
        addPBtn.innerText = "Add a project";

        projectName.setAttribute('placeholder','Enter a project name');
        projectName.setAttribute('id', 'projectName');
        projectName.classList.add('float-right');
        projectForm.appendChild(projectName);
        projectForm.appendChild(addPBtn);
        projectFormWrapper.appendChild(projectForm);

        const modal = cleanModal();
        modal.appendChild(projectFormWrapper);
    };

    return { createAddProjectForm }

};

export default todoUI
