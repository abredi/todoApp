

const project = () =>{
    const addProject = document.querySelector('.projectForm');
    const projectForm = document.createElement('form');
    const projectName = document.createElement('input');
    const addPBtn = document.createElement('button');
    addPBtn.setAttribute('type','button');
    addPBtn.innerText = "Add a project"
    projectName.setAttribute('placeholder','Enter a project name')
    projectForm.appendChild(projectName);
    projectForm.appendChild(addPBtn);
    addProject.appendChild(projectForm);
}

document.getElementById('add-project').addEventListener('click',project)

export default project