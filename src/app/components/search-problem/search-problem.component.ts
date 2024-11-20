import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProblemAPI } from 'src/app/models/model';
import { CodeforcesService } from 'src/app/services/codeforces.service';
import { SearchIconComponent } from '../icons/search-icon/search-icon.component';

@Component({
  selector: 'app-search-problem',
  standalone: true,
  imports: [ReactiveFormsModule, SearchIconComponent],
  templateUrl: './search-problem.component.html',
  styleUrls: ['./search-problem.component.css'],
})
export class SearchProblemComponent {
  readonly codeforcesService = inject(CodeforcesService);
  inputProblem = new FormControl('');
  @Output() emitter = new EventEmitter<ProblemAPI[] | null>();

  constructor() {}

  async searchProblem(event: Event) {
    event.preventDefault();
    const problem = this.inputProblem.value;
    if (!problem) return;
    this.emitter.emit(null);
    let problemData = await this.codeforcesService.searchProblemById(problem);
    if (problemData.length === 0) {
      problemData = await this.codeforcesService.searchProblemByName(problem);
    }
    this.emitter.emit(problemData);
  }
}
