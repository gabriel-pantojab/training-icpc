import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Problem } from 'src/app/models/model';
import { TodosSelectors } from 'src/app/state';

@Component({
  selector: 'app-problem-list-date',
  templateUrl: './problem-list-date.component.html',
  styleUrls: ['./problem-list-date.component.css'],
})
export class ProblemListDateComponent implements OnInit {
  @Input() date!: string;
  problems$!: Observable<Problem[]>;
  showProblems: boolean = true;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.problems$ = this.store.select(TodosSelectors.problemsDate(this.date));
  }

  toggleShowProblems() {
    this.showProblems = !this.showProblems;
  }
}
