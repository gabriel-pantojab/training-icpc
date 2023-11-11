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

  async getProblemById(id: string): Promise<ProblemAPI | null> {
    id = id.toUpperCase();
    const response = await fetch(`${this.API_URL}/problemset.problems?`);
    const data = await response.json();
    if (data.status !== 'OK') throw new Error('Codeforces API error');
    const problems: ProblemAPI[] = data.result.problems;
    const problem = problems.find(
      (problem) => problem.contestId + problem.index === id
    );
    return problem ? problem : null;
  }
}
