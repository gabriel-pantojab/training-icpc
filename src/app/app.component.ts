import { Component, signal } from '@angular/core';
import { Problem } from './services/codeforces.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Training ICPC';
  problems = signal<Problem[] | null>([]);

  constructor() {}

  setProblems(problems: Problem[] | null) {
    this.problems.set(problems);
  }
}
