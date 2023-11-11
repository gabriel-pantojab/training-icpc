import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CodeforcesService } from 'src/app/services/codeforces.service';

@Component({
  selector: 'app-search-problem',
  templateUrl: './search-problem.component.html',
  styleUrls: ['./search-problem.component.css'],
})
export class SearchProblemComponent {
  readonly authService = inject(AuthService);
  readonly codeforcesService = inject(CodeforcesService);
  inputProblem = new FormControl('');

  constructor() {}

  async searchProblem(event: Event) {
    event.preventDefault();
    const problem = this.inputProblem.value;
    if (!problem) return;
    let problemData = await this.codeforcesService.getProblemById(problem);
    if (!problemData) {
      problemData = await this.codeforcesService.getProblemByName(problem);
    }
    console.log(problemData);
  }
}
