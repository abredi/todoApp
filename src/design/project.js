
let todos = [];
const todoUI = () => {

    const saveTodoProject = (todo) => {
        let project = localStorage.getItem('project');
        if (!project) {
            project = localStorage.setItem('project', '{"todos": null}');
            project = localStorage.getItem('project');
        }

        project = JSON.parse(project);

        project = {...project.todos, todo};
        localStorage.setItem('project', JSON.stringify(project));
    };

    const addProject = () => {
        const projectName = document.getElementById('projectName');
        if (projectName.value == '') {
            return;
        }

        saveTodoProject({projectName: projectName.value})
        projectName.value = '';
    };

    const createAddProjectForm = () => {
        const addProjectExist = document.querySelector('.project-form');

        if (addProjectExist) {
            return;
        }

        const modal = document.querySelector('.modal');

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
        modal.appendChild(projectFormWrapper);
    };

    return {createAddProjectForm}
   
};


const todoForm = todoUI();

document.getElementById('add-project').addEventListener('click', todoForm.createAddProjectForm)

export default todoUI