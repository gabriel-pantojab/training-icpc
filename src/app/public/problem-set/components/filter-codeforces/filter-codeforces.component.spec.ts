import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCodeforcesComponent } from './filter-codeforces.component';

describe('FilterCodeforcesComponent', () => {
  let component: FilterCodeforcesComponent;
  let fixture: ComponentFixture<FilterCodeforcesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterCodeforcesComponent]
    });
    fixture = TestBed.createComponent(FilterCodeforcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
