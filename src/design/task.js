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
        submit.addEventListener('click', createTask);
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
        
        const projectId = document.getElementById('projectId').value;
        const title = document.getElementById('title').value;
        const desc = document.getElementById('desc').value;
        const date = document.getElementById('date').value;
        const priority = document.getElementById('priority').value;

        const taskData = { projectId, title, desc, date, priority }

        const taskElem = displayTask(taskData);
        const projectElem = document.getElementById(projectId);
        projectElem.appendChild(taskElem);
    
        ls.saveTodoTask({projectId, title, desc, date, priority});

        document.getElementById('addTodo').reset();
    };

    const createTodoCard = (project) => {
        `
        div.card
            h2.title
            ul.tasks
                li.task
                    h3.taskName
                    p.duedate
                    p.priority
                    p.desc
        `
        const projectNameElem = document.createElement('h2');
        projectNameElem.innerText = project.projectName;
        const ul = document.createElement('ul');
        ul.setAttribute('id', project.projectId);
        project.tasks.forEach(t => {
            const task = displayTask(t);
            ul.appendChild(task);
        });

        const card = document.createElement('div');
        card.classList.add('card');
        card.appendChild(projectNameElem);
        card.appendChild(ul);
        const todosMain = document.getElementById('main');
        todosMain.appendChild(card);
    }

    const displayTask = (task) => {
        const taskName = document.createElement('h3');
        const due = document.createElement('p');
        const priority = document.createElement('p');
        const description = document.createElement('p');
        taskName.innerText = task.title;
        due.innerText = task.date;
        priority.innerText = task.priority;
        description.innerText = task.desc;
        const li = document.createElement('li');
        li.appendChild(taskName);
        li.appendChild(due);
        li.appendChild(priority);
        li.appendChild(description);
        return li;
    }

    const displayTodos = () => {
        const projects = ls.getProjects();
        projects.todos.map(p => createTodoCard(p));
    }
 
    return {createTask, taskForm, displayTodos}
}

const t = task();
t.displayTodos();

document.getElementById('add-task').addEventListener('click',t.taskForm);

export default task;
