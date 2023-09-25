import { Component, signal, computed } from '@angular/core';
import { Problem } from './services/codeforces.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Training ICPC';
  problems = signal<Problem[] | null>([]);
  renderProblems = computed<Problem[] | null>(() => {
    const problems = this.problems();
    if (!problems) return null;
    const page = this.page();
    const start = (page - 1) * 100;
    const end = start + 100;
    return problems.slice(start, end);
  });
  countPages = signal<number>(0);
  page = signal<number>(1);

  constructor() {}

  setProblems(problems: Problem[] | null) {
    this.problems.set(problems);
    if (problems) {
      this.countPages.set(Math.ceil(problems.length / 100));
      this.page.set(1);
    }
  }

  nextPage() {
    if (this.page() + 1 > this.countPages()) return;
    this.page.set(this.page() + 1);
  }

  prevPage() {
    if (this.page() - 1 < 1) return;
    this.page.set(this.page() - 1);
  }
}
