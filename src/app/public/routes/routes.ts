import { Routes } from '@angular/router';
import { ProblemSetComponent } from '@public/problem-set/components';

export const publicRoutes: Routes = [
  {
    path: '',
    redirectTo: 'problem-set',
    pathMatch: 'full',
  },
  {
    path: 'problem-set',
    component: ProblemSetComponent,
    title: 'Problem Set',
  },
];
