import { Injectable, inject } from '@angular/core';
import { Database, ref, set, push } from '@angular/fire/database';
import { get, child } from 'firebase/database';
import { Problem } from 'src/app/models/model';
import { State } from 'src/app/state';

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

  async addProblem(key: string, problem: Problem, uid: string) {
    const snapshot = await get(child(ref(this.db), `users/${uid}`));
    if (snapshot.exists()) {
      const problems: State = snapshot.val().problems;
      problems[key].problems.push(problem);
      set(ref(this.db, `users/${uid}/problems`), problems);
    }
  }
}
