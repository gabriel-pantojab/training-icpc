import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemListDateComponent } from './problem-list-date.component';

describe('ProblemListDateComponent', () => {
  let component: ProblemListDateComponent;
  let fixture: ComponentFixture<ProblemListDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProblemListDateComponent]
    });
    fixture = TestBed.createComponent(ProblemListDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
