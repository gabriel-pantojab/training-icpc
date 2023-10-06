import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoProblemComponent } from './todo-problem.component';

describe('TodoProblemComponent', () => {
  let component: TodoProblemComponent;
  let fixture: ComponentFixture<TodoProblemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoProblemComponent]
    });
    fixture = TestBed.createComponent(TodoProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
