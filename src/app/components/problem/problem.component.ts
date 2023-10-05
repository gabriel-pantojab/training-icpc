import { Component, Input, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Problem, ProblemStatus } from 'src/app/models/model';
import { TodosPageActions, TodosSelectors } from 'src/app/state';

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
  link = 'https://codeforces.com/problemset/problem/';

  todoProblem$: Observable<Problem[]> = this.store.select(
    TodosSelectors.problems
  );

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.todoProblem$.subscribe((problems) => {
      const problem = problems.find((problem) => {
        return problem.id === this.contestId + this.id;
      });
      if (problem) {
        this.isAdded.set(true);
      } else {
        this.isAdded.set(false);
      }
    });
  }

  addProblem() {
    const problem: Problem = {
      name: this.name,
      difficulty: this.difficulty,
      tags: this.tags,
      id: this.contestId + this.id,
      url: this.link + this.contestId + '/' + this.id,
      status: ProblemStatus.PENDING,
    };
    this.store.dispatch(
      TodosPageActions.addProblem({
        problem,
      })
    );
  }

  removeProblem() {
    this.store.dispatch(
      TodosPageActions.removeProblem({
        id: this.contestId + this.id,
      })
    );
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
