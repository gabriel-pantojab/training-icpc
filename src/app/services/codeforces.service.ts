import { Injectable } from '@angular/core';

interface Problem {
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
}
