import { Injectable, inject } from '@angular/core';
import { Database, ref, set } from '@angular/fire/database';
import { get, child } from 'firebase/database';

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

  async getUserProblems(uid: string) {
    const snapshot = await get(child(ref(this.db), `users/${uid}`));
    if (snapshot.exists()) {
      if (snapshot.val().problems) return snapshot.val().problems;
    }
    return {};
  }
}
