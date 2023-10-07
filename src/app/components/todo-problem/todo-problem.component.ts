import { Component, Input, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Problem, ProblemStatus } from 'src/app/models/model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { TodosPageActions } from 'src/app/state';

@Component({
  selector: 'app-todo-problem',
  templateUrl: './todo-problem.component.html',
  styleUrls: ['./todo-problem.component.css'],
})
export class TodoProblemComponent {
  @Input() problem!: Problem;
  accepted = ProblemStatus.ACCEPTED;

  constructor(
    private store: Store,
    private db: DatabaseService,
    private auth: AuthService
  ) {}

  handleAction() {
    if (this.problem.status === ProblemStatus.PENDING) {
      this.store.dispatch(
        TodosPageActions.markAsAccepted({
          id: this.problem.id,
          date: this.problem.date,
        })
      );
      if (this.auth.user) {
        this.db.markAsAccepted(
          this.auth.user?.uid,
          this.problem.id,
          this.problem.date
        );
      }
    } else {
      this.store.dispatch(
        TodosPageActions.markAsPending({
          id: this.problem.id,
          date: this.problem.date,
        })
      );
      if (this.auth.user) {
        this.db.markAsPedding(
          this.auth.user?.uid,
          this.problem.id,
          this.problem.date
        );
      }
    }
  }

  handleRemove() {
    this.store.dispatch(
      TodosPageActions.removeProblem({ id: this.problem.id })
    );
    if (this.auth.user) {
      this.db.removeProblem(this.auth.user?.uid, this.problem.id);
    }
  }
}
