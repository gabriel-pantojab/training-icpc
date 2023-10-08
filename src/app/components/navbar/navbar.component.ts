import { Component, inject, signal } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  authService = inject(AuthService);
  visibleButtonAuth = signal<boolean>(false);
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
    console.log(this.authService.user);
    this.visibleButtonAuth.set(!this.visibleButtonAuth());
  }
}
