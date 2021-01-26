import todoUI from '../design/project';

describe('TodoUI', ()=>{
    test('should be true', () => {
        expect(todoUI).toBeTruthy()
    });
    test('createAddProjectForm should to exist',()=>{
        let UI = todoUI();
        expect(UI.createAddProjectForm).toBeTruthy();
    });

    test('',()=>{
        let UI = todoUI();
        expect(UI.addProject).toBeFalsy();
    });
})
