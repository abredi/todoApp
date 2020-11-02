let main = document.getElementById('main');

const task = () => {
    document.getElementById('addTodo').style.display = 'none';

    const taskUI = () => {
        document.getElementById('addTodo').style.display = 'block';
    }
 
    const createTask = (event) =>{
        event.preventDefault();
        const taskCard = document.createElement('div');
        const taskTitle = document.createElement('div');
        const taskDesc = document.createElement('div');
        const taskDate = document.createElement('div');
        const taskPriority = document.createElement('div');
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

        document.getElementById('addTodo').reset();


    }
 
    return {taskUI,createTask}
}

const Form = task();
const create = task();

document.getElementById('add-task').addEventListener('click',Form.taskUI);
document.getElementById('create-task').addEventListener('click',create.createTask);
export default task;
