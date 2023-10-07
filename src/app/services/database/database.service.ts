import { Injectable, inject } from '@angular/core';
import { Database, ref, set, push, update } from '@angular/fire/database';
import { get, child } from 'firebase/database';
import { Problem, ProblemStatus } from 'src/app/models/model';
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
    if (snapshot.exists() && snapshot.val().problems) {
      const problems: State = snapshot.val().problems;
      problems[key].problems.push(problem);
      set(ref(this.db, `users/${uid}/problems`), problems);
    } else {
      set(ref(this.db, `users/${uid}/problems/${key}`), {
        problems: [problem],
      });
    }
  }

  async removeProblem(uid: string, idProblem: string) {
    const snapshot = await get(child(ref(this.db), `users/${uid}`));
    if (snapshot.exists() && snapshot.val().problems) {
      const problems: State = snapshot.val().problems;
      Object.keys(problems).forEach((key) => {
        problems[key].problems = problems[key].problems.filter(
          (p: Problem) => p.id !== idProblem
        );
      });
      set(ref(this.db, `users/${uid}/problems`), problems);
    }
  }

  async markAsAccepted(uid: string, idProblem: string, key: string) {
    const snapshot = await get(child(ref(this.db), `users/${uid}`));
    if (snapshot.exists()) {
      const problems: State = snapshot.val().problems;
      const index = problems[key].problems.findIndex(
        (p: Problem) => p.id === idProblem
      );
      if (index !== -1) {
        update(ref(this.db, `users/${uid}/problems/${key}/problems/${index}`), {
          status: ProblemStatus.ACCEPTED,
        });
      }
    }
  }

  async markAsPedding(uid: string, idProblem: string, key: string) {
    const snapshot = await get(child(ref(this.db), `users/${uid}`));
    if (snapshot.exists()) {
      const problems: State = snapshot.val().problems;
      const index = problems[key].problems.findIndex(
        (p: Problem) => p.id === idProblem
      );
      if (index !== -1) {
        update(ref(this.db, `users/${uid}/problems/${key}/problems/${index}`), {
          status: ProblemStatus.PENDING,
        });
      }
    }
  }
}
