import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider } from '@angular/fire/auth';
import { signInWithRedirect } from '@firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth: Auth = inject(Auth);
  readonly googleProvider = new GoogleAuthProvider();

  async signInGoogle() {
    try {
      // await signInWithRedirect(this.auth, this.googleProvider);
    } catch (error) {
      console.log('Google Login Error: ', error);
    }
  }
}
