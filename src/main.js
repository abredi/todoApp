import './css/vendor/tailwind.vendor.css';

import './css/style.css';

import { local } from './storage/local';
import todoUI from './design/project';
import task from './design/task';

const init = () => {
  let project = localStorage.getItem('init');
  if (!project) {
    const ls = local();
    project = localStorage.setItem('init', 'true');
    const pid = ls.saveTodoProject('Default project');
    ls.saveTodoTask({
      projectId: pid,
      title: 'Get familiar with the app',
      desc: 'Try all the features',
      date: '2020-11-06',
      priority: '1',
    });
  }
};


init();

const t = task();
t.displayTodos();
const todoForm = todoUI();
document
  .getElementById('all-projects')
  .addEventListener('click', t.displayAllProjects);
document
  .getElementById('add-task')
  .addEventListener('click', t.taskForm);
document
  .getElementById('add-project')
  .addEventListener('click', todoForm.createAddProjectForm);
