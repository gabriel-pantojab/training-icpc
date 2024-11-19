import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { TagComponent } from './components/tag/tag.component';
import { ProblemComponent } from './components/problem/problem.component';
import { FilterCodeforcesComponent } from './components/filter-codeforces/filter-codeforces.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ProblemSetComponent } from './components/problem-set/problem-set.component';
import { MyProblemsComponent } from './components/my-problems/my-problems.component';
import { TodoProblemComponent } from './components/todo-problem/todo-problem.component';
import { ProblemListDateComponent } from './components/problem-list-date/problem-list-date.component';
import { SortProblemsDatePipe } from './pipes/sort-problems-date/sort-problems-date.pipe';
import { KeysOfObjectPipe } from './pipes/keys-of-object/keys-of-object.pipe';
import { SearchProblemComponent } from './components/search-problem/search-problem.component';
import { SearchIconComponent } from './components/icons/search-icon/search-icon.component';

@NgModule({
  declarations: [
    TagComponent,
    ProblemComponent,
    FilterCodeforcesComponent,
    LoadingComponent,
    ProblemSetComponent,
    MyProblemsComponent,
    TodoProblemComponent,
    ProblemListDateComponent,
    SortProblemsDatePipe,
    KeysOfObjectPipe,
    SearchProblemComponent,
    SearchIconComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
})
export class AppModule {}
