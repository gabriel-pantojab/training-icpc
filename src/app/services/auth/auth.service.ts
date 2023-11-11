import { Injectable, inject } from '@angular/core';
import {
  signInWithPopup,
  Auth,
  GoogleAuthProvider,
  onAuthStateChanged,
} from '@angular/fire/auth';

import Swal from 'sweetalert2';
import { DatabaseService } from '../database/database.service';
import { child, get, ref } from '@angular/fire/database';
import { Store } from '@ngrx/store';
import { TodosPageActions } from 'src/app/state';
import { Router } from '@angular/router';
import { FirebaseError } from '@angular/fire/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth = inject(Auth);
  private readonly googleProvider = new GoogleAuthProvider();
  private currentUser = this.auth.currentUser;
  db = inject(DatabaseService);
  store = inject(Store);
  router = inject(Router);

  constructor() {
    this.googleProvider.setCustomParameters({ prompt: 'select_account' });
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.currentUser = user;
        this.db.getUserProblems(user.uid).then((problems) => {
          this.store.dispatch(
            TodosPageActions.setProblems({ problems: problems })
          );
        });
      } else {
        this.currentUser = null;
        this.router.navigate(['/']);
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
      await this.createUserData();
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'You have successfully signed in.',
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code !== 'auth/cancelled-popup-request') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Try again later.',
          });
        }
      }
    }
  }

  async createUserData() {
    const snapshot = await get(
      child(ref(this.db.dataBase), `users/${this.currentUser?.uid}`)
    );
    if (!snapshot.exists() && this.currentUser) {
      const user = this.currentUser;
      this.db.createUser({
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
      });
    }
  }

  async signOut() {
    return await this.auth.signOut();
  }
}
