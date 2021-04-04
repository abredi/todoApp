import task from '../design/task';
import getProjects from '../storage/local';

const newFunc = task();

describe('task function return', () => {
  test('should have all factory function to be', () => {
    expect(task).toBeTruthy();
    expect(newFunc.displayAllProjects).toBeTruthy();
    expect(newFunc.taskForm).toBeTruthy();
    expect(newFunc.createTask).toBeTruthy();
    expect(newFunc.displayTodos).toBeTruthy();
  });
});

describe('displayTodos form task', () => {
  test('should ', () => {
    const p = getProjects();
    expect(!p).toBeFalsy();
  });
});