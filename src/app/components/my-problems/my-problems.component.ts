import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State, TodosSelectors } from 'src/app/state';

@Component({
  selector: 'app-my-problems',
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
