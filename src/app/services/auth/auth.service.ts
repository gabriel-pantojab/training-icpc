import { Injectable, inject } from '@angular/core';
import {
  signInWithPopup,
  Auth,
  GoogleAuthProvider,
  onAuthStateChanged,
} from '@angular/fire/auth';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth = inject(Auth);
  private readonly googleProvider = new GoogleAuthProvider();
  private currentUser = this.auth.currentUser;

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
  }

  get user() {
    return this.currentUser;
  }

  isLogged() {
    return this.currentUser !== null;
  }

  async signInGoogle() {
    try {
      await signInWithPopup(this.auth, this.googleProvider);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'You have successfully signed in.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Try again later.',
      });
    }
  }

  async signOut() {
    return await this.auth.signOut();
  }
}
