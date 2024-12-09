import { ClickOutSideDirective } from '@/shared/directives/click-out-side.directive';
import { Component, inject, signal } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [ClickOutSideDirective],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent {
  protected visibleButtonAuth = signal<boolean>(false);

  //TODO: should be private
  protected authService = inject(AuthService);

  public handleAuth() {
    if (this.authService.user) {
      this.authService.signOut();
    } else {
      this.authService.signInGoogle();
    }
  }

  public toggleVisibleUserInfo() {
    this.visibleButtonAuth.set(!this.visibleButtonAuth());
  }

  public closeUserInfo(): void {
    this.visibleButtonAuth.set(false);
  }

  public get logged(): boolean {
    return this.authService.isLogged();
  }
}
