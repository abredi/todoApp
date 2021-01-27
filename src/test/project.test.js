import todoUI from '../design/project';

describe('TodoUI', ()=>{
    test('should be true', () => {
        expect(todoUI).toBeTruthy()
    });
    test('todoUI should return createAddProjectform ',()=>{
        let UI = todoUI();
        expect(UI.createAddProjectForm).toBeTruthy();
    });

    test('addProject function ',()=>{
        let UI = todoUI();
        expect(UI.addProject).toBeFalsy();
    });
})
