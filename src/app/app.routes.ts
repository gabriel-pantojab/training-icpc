import { Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/problem-set/problem-set.component').then(
        (m) => m.ProblemSetComponent
      ),
    title: 'ProblemSet',
  },
  {
    path: 'my-problems',
    loadComponent: () =>
      import('./components/my-problems/my-problems.component').then(
        (m) => m.MyProblemsComponent
      ),
    title: 'MyProblems',
    canActivate: [loginGuard],
  },
];
