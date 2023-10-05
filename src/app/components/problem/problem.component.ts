import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Problem, ProblemStatus } from 'src/app/models/model';
import { TodosPageActions } from 'src/app/state';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css'],
})
export class ProblemComponent {
  @Input() name!: string;
  @Input() difficulty!: number;
  @Input() tags!: string[];
  @Input() id!: string;
  @Input() contestId!: string;
  link = 'https://codeforces.com/problemset/problem/';

  constructor(private store: Store) {}

  addProblem() {
    const problem: Problem = {
      name: this.name,
      difficulty: this.difficulty,
      tags: this.tags,
      id: this.id,
      url: this.link + this.contestId + '/' + this.id,
      status: ProblemStatus.PENDING,
    };
    this.store.dispatch(
      TodosPageActions.addProblem({
        problem,
      })
    );
  }
}
