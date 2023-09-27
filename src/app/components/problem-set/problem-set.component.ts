import { Component, OnInit, computed, signal } from '@angular/core';
import { ProblemAPI } from 'src/app/models/model';
import { CodeforcesService } from 'src/app/services/codeforces.service';

@Component({
  selector: 'app-problem-set',
  templateUrl: './problem-set.component.html',
  styleUrls: ['./problem-set.component.css'],
})
export class ProblemSetComponent implements OnInit {
  title = 'Problem Set';
  problems = signal<ProblemAPI[] | null>([]);
  renderProblems = computed<ProblemAPI[] | null>(() => {
    const problems = this.problems();
    if (!problems) return null;
    const page = this.page();
    const start = (page - 1) * 100;
    const end = start + 100;
    return problems.slice(start, end);
  });
  countPages = signal<number>(0);
  page = signal<number>(1);

  constructor(private codeforcesService: CodeforcesService) {}

  ngOnInit() {
    this.loadDefaultProblems();
  }

  async loadDefaultProblems() {
    this.setProblems(null);
    const problems =
      await this.codeforcesService.getProblemsByTagsAndDifficulty({
        tags: [],
        minDifficulty: 800,
        maxDifficulty: 3500,
      });
    this.setProblems(problems);
  }

  setProblems(problems: ProblemAPI[] | null) {
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
