import { Injectable, inject } from '@angular/core';
import { Database, ref, set } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  db = inject(Database);
  get dataBase() {
    return this.db;
  }
  createUser({
    uid,
    email,
    displayName,
    photoURL,
  }: {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
  }) {
    set(ref(this.db, `users/${uid}`), {
      uid,
      email,
      displayName,
      photoURL,
      problems: {},
    });
  }
}
