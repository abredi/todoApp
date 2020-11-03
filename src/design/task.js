import { cleanModal } from "../util/helpers";
import { local } from "../storage/local";
let main = document.getElementById('main');

const task = () => {
    const ls  = local();

    const taskForm = () => {
        const selectProject = document.createElement('select');
        selectProject.setAttribute('required', 'required');
        selectProject.setAttribute('id', 'projectId');
        const projects = ls.getProjects();
        if (projects) {
            projects.todos.map((p) => {
                const opt = document.createElement('option');
                opt.setAttribute('value', p.projectId);
                opt.innerText = p.projectName;
                selectProject.appendChild(opt)
            });
        };

        const title = document.createElement('input');
        title.setAttribute('type', 'text');
        title.setAttribute('id', 'title');
        title.setAttribute('required', 'required');
        const desc = document.createElement('textarea');
        desc.setAttribute('cols', '30');
        desc.setAttribute('row', '10');
        desc.setAttribute('id', 'desc');
        desc.setAttribute('placeholder', 'Task description');
        const date = document.createElement('input');
        date.setAttribute('type', 'date');
        date.setAttribute('id', 'date');
        date.setAttribute('placeholder', 'Due date');
        const priority = document.createElement('input');
        priority.setAttribute('type', 'number');
        priority.setAttribute('id', 'priority');
        priority.setAttribute('placeholder', 'Task priority');
        const submit = document.createElement('input');
        submit.setAttribute('type', 'button');
        submit.setAttribute('id', 'create-task');
        submit.setAttribute('value', 'Create Task');
        submit.addEventListener('click', createTask)
        const form = document.createElement('form');
        form.setAttribute('id', 'addTodo')
        form.appendChild(selectProject);
        form.appendChild(title);
        form.appendChild(desc);
        form.appendChild(date);
        form.appendChild(priority);
        form.appendChild(submit);

        const modal = cleanModal();

        modal.appendChild(form);
    }
 
    const createTask = (event) =>{
        event.preventDefault();
        const taskCard = document.createElement('div');
        const taskTitle = document.createElement('div');
        const taskDesc = document.createElement('div');
        const taskDate = document.createElement('div');
        const taskPriority = document.createElement('div');

        const projectId = document.getElementById('projectId').value;
        const title = document.getElementById('title').value;
        const desc = document.getElementById('desc').value;
        const date = document.getElementById('date').value;
        const priority = document.getElementById('priority').value;
        taskTitle.innerHTML = title;
        taskDesc.innerHTML = desc;
        taskDate.innerHTML = date
        taskPriority.innerHTML = priority
        taskCard.appendChild(taskTitle);
        taskCard.appendChild(taskDesc);
        taskCard.appendChild(taskDate);
        taskCard.appendChild(taskPriority);
        main.appendChild(taskCard);

         

        ls.saveTodoTask({projectId, title, desc, date, priority});



        document.getElementById('addTodo').reset();
    }

    const createTodoCard = (project) => {
        `
        h2.title
            ul.tasks
                li.task
                    h3.taskName
                    p.duedate
                    p.priority
                    p.desc
        `
        const projectNameElem = document.createElement('h2');
        projectNameElem.setAttribute('id', project.projectId);
        projectNameElem.innerText = project.projectName;

        project.tasks.forEach(t => displayTask(t, projectNameElem));

        const todosMain = document.querySelector('.main');
        todosMain.appendChild(p);
    }

    const displayTask = (task,project) => {


        const taskName = document.createElement('h3');
        const due = document.createElement('p');
        const priority = document.createElement('p');
        const description = document.createElement('p');
        taskName.innerText = task.title;
        due.innerText = task.date;
        priority.innerText = task.priority;
        description.innerText = task.desc;
        
    }

    const displayTodos = () => {
        const {todos} = ls.getProjects;
        todos.map(p => createTodoCard(p));
    }
 
    return {createTask, taskForm}
}

const t = task();

document.getElementById('add-task').addEventListener('click',t.taskForm);
document.getElementById('create-task').addEventListener('click',t.createTask);
export default task;