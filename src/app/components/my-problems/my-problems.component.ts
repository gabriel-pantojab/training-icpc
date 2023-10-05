import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Problem } from 'src/app/models/model';
import { TodosSelectors } from 'src/app/state';

@Component({
  selector: 'app-my-problems',
  templateUrl: './my-problems.component.html',
  styleUrls: ['./my-problems.component.css'],
})
export class MyProblemsComponent {
  title = 'My Problems';
  todoProblem$: Observable<Problem[]> = this.store.select(
    TodosSelectors.problems
  );

  constructor(private store: Store) {}
}
