import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CodeforcesService, Problem } from './services/codeforces.service';
import Swal from 'sweetalert2';

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

  async onSubmit(event: Event) {
    event.preventDefault();
    if (!this.filterForm.valid) return;
    this.problems = null;
    const { minDifficulty, maxDifficulty } = this.filterForm.value;
    try {
      const problems: Problem[] =
        await this.codeforcesService.getProblemsByTagsAndDifficulty({
          tags: this.tagList,
          minDifficulty,
          maxDifficulty,
        });
      this.problems = problems;
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
      });
      this.problems = [];
    }
  }

  async getRandomProblem() {
    if (!this.filterForm.valid) return;
    this.problems = null;
    const { minDifficulty, maxDifficulty } = this.filterForm.value;
    try {
      const problem: Problem = await this.codeforcesService.getRandomProblem({
        tags: this.tagList,
        minDifficulty,
        maxDifficulty,
      });
      this.problems = [problem];
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
      });
      this.problems = [];
    }
  }

  removeTag(tag: string) {
    this.tagList = this.tagList.filter((t) => t !== tag);
  }
}
