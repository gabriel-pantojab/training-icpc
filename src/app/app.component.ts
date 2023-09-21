import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CodeforcesService, Problem } from './services/codeforces.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Training ICPC';
  tagList: string[] = [];
  problems: Problem[] | null = [];
  filterForm: FormGroup;

  constructor(private codeforcesService: CodeforcesService) {
    this.filterForm = new FormGroup({
      minDifficulty: new FormControl(800, Validators.min(800)),
      maxDifficulty: new FormControl(3500, Validators.max(3500)),
      tag: new FormControl(''),
    });
    this.filterForm.get('tag')?.valueChanges.subscribe((value) => {
      if (value && !this.tagList.includes(value)) {
        this.tagList.push(value);
        this.filterForm.get('tag')?.setValue('');
      }
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.filterForm.valid) return;
    this.problems = null;
    const { minDifficulty, maxDifficulty } = this.filterForm.value;
    this.codeforcesService
      .getProblemsByTagsAndDifficulty({
        tags: this.tagList,
        minDifficulty,
        maxDifficulty,
      })
      .then((problems) => {
        this.problems = problems;
      });
  }

  getRandomProblem() {
    if (!this.filterForm.valid) return;
    this.problems = null;
    const { minDifficulty, maxDifficulty } = this.filterForm.value;
    this.codeforcesService
      .getRandomProblem({
        tags: this.tagList,
        minDifficulty,
        maxDifficulty,
      })
      .then((problem) => {
        this.problems = [problem];
      });
  }

  removeTag(tag: string) {
    this.tagList = this.tagList.filter((t) => t !== tag);
  }
}
