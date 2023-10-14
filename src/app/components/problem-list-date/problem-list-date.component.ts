import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Problem, ProblemStatus } from 'src/app/models/model';
import { TodosSelectors } from 'src/app/state';

@Component({
  selector: 'app-problem-list-date',
  templateUrl: './problem-list-date.component.html',
  styleUrls: ['./problem-list-date.component.css'],
})
export class ProblemListDateComponent implements OnInit {
  @Input() date!: string;
  problems$!: Observable<Problem[]>;
  showProblems: boolean = false;
  pendingProblems = 0;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.problems$ = this.store.select(TodosSelectors.problemsDate(this.date));
    this.getProblemsPending();
  }

  toggleShowProblems() {
    this.showProblems = !this.showProblems;
  }

  getProblemsPending() {
    return this.problems$
      .pipe(
        map(
          (problems) =>
            problems.filter((p) => p.status === ProblemStatus.PENDING).length
        )
      )
      .subscribe((size) => {
        this.pendingProblems = size;
      });
  }

  getClasses(): string {
    let classes = '';
    if (!this.showProblems) classes += 'hidden ';
    if (this.pendingProblems > 0) classes += 'pedding-problems ';
    else classes += 'accepted-problems';
    return classes;
  }
}
