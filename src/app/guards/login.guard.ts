import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

export function loginGuard() {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.user) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
}
