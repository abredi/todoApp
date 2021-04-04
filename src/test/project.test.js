import todoUI from '../design/project';

describe('TodoUI function', () => {
  test('should be true', () => {
    expect(todoUI).toBeTruthy();
  });
  test('createAddProjectform be a factory function of todoUI', () => {
    const UI = todoUI();
    expect(UI.createAddProjectForm).toBeTruthy();
  });

  test('addProject function ', () => {
    const UI = todoUI();
    expect(UI.addProject).toBeFalsy();
  });
});
