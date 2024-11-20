import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State, TodosSelectors } from 'src/app/state';
import { ProblemListDateComponent } from '../problem-list-date/problem-list-date.component';
import { AsyncPipe } from '@angular/common';
import { KeysOfObjectPipe } from 'src/app/pipes/keys-of-object/keys-of-object.pipe';
import { SortProblemsDatePipe } from 'src/app/pipes/sort-problems-date/sort-problems-date.pipe';

@Component({
  selector: 'app-my-problems',
  standalone: true,
  imports: [
    ProblemListDateComponent,
    AsyncPipe,
    KeysOfObjectPipe,
    SortProblemsDatePipe,
  ],
  templateUrl: './my-problems.component.html',
  styleUrls: ['./my-problems.component.css'],
})
export class MyProblemsComponent {
  title = 'My Problems';
  emptyProblems = true;
  todoProblem$: Observable<State> = this.store.select(TodosSelectors.problems);

  constructor(private store: Store) {
    this.empty();
  }

  empty() {
    this.store.select(TodosSelectors.problems).subscribe((problems) => {
      this.emptyProblems = Object.keys(problems).length === 0;
    });
  }
}
