import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemSetComponent } from './problem-set.component';

describe('ProblemsComponent', () => {
  let component: ProblemSetComponent;
  let fixture: ComponentFixture<ProblemSetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProblemSetComponent],
    });
    fixture = TestBed.createComponent(ProblemSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
