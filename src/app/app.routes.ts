import { Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./public/routes/routes').then((r) => r.publicRoutes),
  },
  {
    path: 'secure',
    loadChildren: () => import("./secure/routes/secure.routes").then((r) => r.secureRoutes),
    canActivate: [loginGuard],
  },
];
