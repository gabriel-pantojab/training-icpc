import { Injectable } from '@angular/core';

export interface Problem {
  contestId: number;
  problemsetName: string;
  index: string;
  name: string;
  type: ProblemType;
  points: number;
  rating?: number;
  tags: string[];
}

enum ProblemType {
  PROGRAMMING = 'PROGRAMMING',
  QUESTION = 'QUESTION',
}

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
  }): Promise<Problem[]> {
    this.valiteDifficulty(minDifficulty, maxDifficulty);
    const response = await fetch(
      `${this.API_URL}/problemset.problems?tags=${tags.join(';')}`
    );
    const data = await response.json();
    if (data.status !== 'OK') throw new Error('Codeforces API error');
    const problems: Problem[] = data.result.problems.filter(
      (problem: Problem) =>
        problem.rating &&
        problem.rating >= minDifficulty &&
        problem.rating <= maxDifficulty
    );
    return problems;
  }

  async getProblemsByTags({ tags }: { tags: string[] }): Promise<Problem[]> {
    const response = await fetch(
      `${this.API_URL}/problemset.problems?tags=${tags.join(';')}`
    );
    const data = await response.json();
    if (data.status !== 'OK') throw new Error('Codeforces API error');
    const problems: Problem[] = data.result.problems;
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
  }): Promise<Problem> {
    if (minDifficulty && maxDifficulty)
      this.valiteDifficulty(minDifficulty, maxDifficulty);
    let problems: Problem[];
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
}
