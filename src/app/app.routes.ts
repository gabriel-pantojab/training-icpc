import { Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./public/routes/routes').then((r) => r.publicRoutes),
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
