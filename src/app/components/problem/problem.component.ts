import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Problem, ProblemStatus } from 'src/app/models/model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import {
  State,
  TodosPageActions,
  TodosSelectors,
  TodosState,
} from 'src/app/state';
import { getCurrentDateFormat } from 'src/app/utils/utils';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css'],
})
export class ProblemComponent implements OnInit {
  @Input() name!: string;
  @Input() difficulty!: number;
  @Input() tags!: string[];
  @Input() id!: string;
  @Input() contestId!: string;
  isAdded = signal<boolean>(false);
  isAccepted = signal<boolean>(false);
  link = 'https://codeforces.com/problemset/problem/';

  todoProblem$: Observable<State> = this.store.select(TodosSelectors.problems);

  authService = inject(AuthService);
  db = inject(DatabaseService);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.todoProblem$.subscribe(
      (dayProblems: { [key: string]: TodosState }) => {
        Object.values(dayProblems).forEach((dayProblem: TodosState) => {
          dayProblem.problems.forEach((p: Problem) => {
            if (p.id === this.contestId + this.id) {
              this.isAdded.set(true);
              if (p.status === ProblemStatus.ACCEPTED) {
                this.isAccepted.set(true);
              }
            }
          });
        });
      }
    );
  }

  addProblem() {
    const problem: Problem = {
      name: this.name,
      difficulty: this.difficulty,
      tags: this.tags,
      id: this.contestId + this.id,
      url: this.link + this.contestId + '/' + this.id,
      status: ProblemStatus.PENDING,
      date: getCurrentDateFormat(),
    };
    this.store.dispatch(
      TodosPageActions.addProblem({
        problem,
      })
    );
    if (this.authService.user) {
      this.db.addProblem(
        getCurrentDateFormat(),
        problem,
        this.authService.user.uid
      );
    }
  }

  removeProblem() {
    this.store.dispatch(
      TodosPageActions.removeProblem({
        id: this.contestId + this.id,
      })
    );
    if (this.authService.user) {
      this.db.removeProblem(
        this.authService.user.uid,
        this.contestId + this.id
      );
    }
  }

  handleAction() {
    if (this.isAdded()) {
      this.removeProblem();
      this.isAdded.set(false);
    } else {
      this.addProblem();
      this.isAdded.set(true);
    }
  }
}
