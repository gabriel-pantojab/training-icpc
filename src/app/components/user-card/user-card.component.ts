import { Component, HostListener, inject, signal } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent {
  authService = inject(AuthService);
  visibleButtonAuth = signal<boolean>(false);

  constructor() {}

  handleAuth() {
    if (this.authService.user) {
      this.authService.signOut();
    } else {
      this.authService.signInGoogle();
    }
  }

  getClassesUserInfo() {
    if (this.authService.isLogged() && !this.visibleButtonAuth()) {
      return 'hidden';
    }
    if (this.authService.isLogged()) return 'visible';
    return '';
  }

  toggleVisibleUserInfo() {
    this.visibleButtonAuth.set(!this.visibleButtonAuth());
  }
}
