import { Routes } from '@angular/router';
import { MyProblemsComponent } from '../my-problems/components';

export const secureRoutes: Routes = [
  {
    path: '',
    redirectTo: 'my-problems',
    pathMatch: 'full',
  },
  {
    path: 'my-problems',
    component: MyProblemsComponent,
    title: 'My Problems',
  },
];
