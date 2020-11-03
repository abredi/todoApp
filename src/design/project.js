import { cleanModal } from "../util/helpers";
import { local } from "../storage/local";

const todoUI = () => {

    const addProject = () => {
        const ls = local();
        const projectName = document.getElementById('projectName');
        if (projectName.value == '') {
            return;
        }

        const pid = ls.saveTodoProject(projectName.value);

        const projectNameElem = document.createElement('h2');
        projectNameElem.innerText = projectName.value;

        const ul = document.createElement('ul');
        ul.setAttribute('id', pid);

        const card = document.createElement('div');
        card.classList.add('card');
        card.appendChild(projectNameElem);
        card.appendChild(ul);

        const todosMain = document.getElementById('main');
        todosMain.appendChild(card);

        projectName.value = '';
    };

    const createAddProjectForm = () => {
        const addProjectExist = document.querySelector('.project-form');

        if (addProjectExist) {
            return;
        }

        const projectFormWrapper = document.createElement('div');
        projectFormWrapper.classList.add('project-form');

        const projectForm = document.createElement('form');
        const projectName = document.createElement('input');
        const addPBtn = document.createElement('button');
        
        addPBtn.setAttribute('type','button');
        
        addPBtn.addEventListener('click', addProject);
        addPBtn.innerText = "Add a project";

        projectName.setAttribute('placeholder','Enter a project name');
        projectName.setAttribute('id', 'projectName');

        projectForm.appendChild(projectName);
        projectForm.appendChild(addPBtn);
        projectFormWrapper.appendChild(projectForm);

        const modal = cleanModal();
        modal.appendChild(projectFormWrapper);
    };

    return {createAddProjectForm}
   
};


const todoForm = todoUI();

document.getElementById('add-project').addEventListener('click', todoForm.createAddProjectForm)

export default todoUI