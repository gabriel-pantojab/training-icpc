import { Injectable } from '@angular/core';
import { ProblemAPI } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class CodeforcesService {
  private readonly API_URL = 'https://codeforces.com/api';

  constructor() {}

  async getProblemsByTagsAndDifficulty({
    tags,
    minDifficulty,
    maxDifficulty,
  }: {
    tags: string[];
    minDifficulty: number;
    maxDifficulty: number;
  }): Promise<ProblemAPI[]> {
    this.valiteDifficulty(minDifficulty, maxDifficulty);
    const response = await fetch(
      `${this.API_URL}/problemset.problems?tags=${tags.join(';')}`
    );
    let data;
    try {
      data = await response.json();
    } catch (error) {
      throw new Error('Codeforces is temporarily unavailable');
    }
    if (data.status !== 'OK')
      throw new Error('Codeforces is temporarily unavailable');
    const problems: ProblemAPI[] = data.result.problems.filter(
      (problem: ProblemAPI) =>
        problem.rating &&
        problem.rating >= minDifficulty &&
        problem.rating <= maxDifficulty
    );
    return problems;
  }

  async getProblemsByTags({ tags }: { tags: string[] }): Promise<ProblemAPI[]> {
    const response = await fetch(
      `${this.API_URL}/problemset.problems?tags=${tags.join(';')}`
    );
    const data = await response.json();
    if (data.status !== 'OK') throw new Error('Codeforces API error');
    const problems: ProblemAPI[] = data.result.problems;
    return problems;
  }

  async getRandomProblem({
    tags,
    minDifficulty,
    maxDifficulty,
  }: {
    tags: string[];
    minDifficulty?: number;
    maxDifficulty?: number;
  }): Promise<ProblemAPI> {
    if (minDifficulty && maxDifficulty)
      this.valiteDifficulty(minDifficulty, maxDifficulty);
    let problems: ProblemAPI[];
    if (minDifficulty && maxDifficulty) {
      problems = await this.getProblemsByTagsAndDifficulty({
        tags,
        minDifficulty,
        maxDifficulty,
      });
    } else {
      problems = await this.getProblemsByTags({
        tags,
      });
    }
    return problems[Math.floor(Math.random() * problems.length)];
  }

  valiteDifficulty(minDifficulty: number, maxDifficulty: number) {
    if (minDifficulty < 800)
      throw new Error('Min difficulty must be greater than 800');
    if (maxDifficulty > 3500)
      throw new Error('Max difficulty must be less than 3500');
    if (minDifficulty > maxDifficulty)
      throw new Error('Min difficulty must be less than max difficulty');
  }

  async searchProblemById(id: string): Promise<ProblemAPI[]> {
    id = id.toUpperCase();
    const response = await fetch(`${this.API_URL}/problemset.problems?`);
    const data = await response.json();
    if (data.status !== 'OK') throw new Error('Codeforces API error');
    const problems: ProblemAPI[] = data.result.problems;
    let problemsMatching: ProblemAPI[] = problems.filter((problem) => {
      const idP = problem.contestId + problem.index;
      return idP.includes(id);
    });
    problemsMatching = problemsMatching.sort((a, b) => {
      const idA = a.contestId + a.index;
      const idB = b.contestId + b.index;
      let deltaA = 0,
        deltaB = 0;
      for (let i = 0; i < id.length; i++) {
        if (idA[i] !== id[i]) deltaA++;
        if (idB[i] !== id[i]) deltaB++;
      }
      deltaA += Math.abs(idA.length - id.length);
      deltaB += Math.abs(idB.length - id.length);
      return deltaA - deltaB;
    });
    return problemsMatching;
  }

  async searchProblemByName(name: string): Promise<ProblemAPI[]> {
    name = name.toLowerCase();
    const response = await fetch(`${this.API_URL}/problemset.problems?`);
    const data = await response.json();
    if (data.status !== 'OK') throw new Error('Codeforces API error');
    const problems: ProblemAPI[] = data.result.problems;
    let problemsMatching = problems.filter((problem) =>
      problem.name.toLowerCase().includes(name)
    );
    problemsMatching = problemsMatching.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      let deltaA = 0,
        deltaB = 0;
      for (let i = 0; i < name.length; i++) {
        if (nameA[i] !== name[i]) deltaA++;
        if (nameB[i] !== name[i]) deltaB++;
      }
      deltaA += Math.abs(nameA.length - name.length);
      deltaB += Math.abs(nameB.length - name.length);
      return deltaA - deltaB;
    });
    return problemsMatching;
  }
}
