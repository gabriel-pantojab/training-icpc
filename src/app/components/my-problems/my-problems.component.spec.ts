import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProblemsComponent } from './my-problems.component';

describe('MyProblemsComponent', () => {
  let component: MyProblemsComponent;
  let fixture: ComponentFixture<MyProblemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyProblemsComponent]
    });
    fixture = TestBed.createComponent(MyProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
