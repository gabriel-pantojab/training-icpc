export interface ProblemAPI {
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

export interface Problem {
  readonly id: string;
  readonly name: string;
  difficulty: number;
  tags: string[];
  url: string;
  status: ProblemStatus;
}

export enum ProblemStatus {
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING',
}
