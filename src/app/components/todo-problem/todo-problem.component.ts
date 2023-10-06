import { Component, Input, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Problem, ProblemStatus } from 'src/app/models/model';
import { TodosPageActions } from 'src/app/state';

@Component({
  selector: 'app-todo-problem',
  templateUrl: './todo-problem.component.html',
  styleUrls: ['./todo-problem.component.css'],
})
export class TodoProblemComponent {
  @Input() problem!: Problem;
  accepted = ProblemStatus.ACCEPTED;

  constructor(private store: Store) {}

  handleAction() {
    if (this.problem.status === ProblemStatus.PENDING) {
      this.store.dispatch(
        TodosPageActions.markAsAccepted({
          id: this.problem.id,
          date: this.problem.date,
        })
      );
    } else {
      this.store.dispatch(
        TodosPageActions.markAsPending({
          id: this.problem.id,
          date: this.problem.date,
        })
      );
    }
  }

  handleRemove() {
    this.store.dispatch(
      TodosPageActions.removeProblem({ id: this.problem.id })
    );
  }
}
