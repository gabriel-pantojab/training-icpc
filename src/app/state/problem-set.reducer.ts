import { createReducer, on } from '@ngrx/store';
import { ProblemAPI } from '../models/model';
import { ProblemSetActions } from '.';

export interface ProblemSetState {
  problems: ProblemAPI[];
  problemsRender: ProblemAPI[];
  countPages: number;
  page: number;
}

const initState: ProblemSetState = {
  problems: [],
  problemsRender: [],
  countPages: 0,
  page: 1,
};

export const problemSetReducer = createReducer(
  initState,
  on(ProblemSetActions.init, () => ({
    problems: [],
    problemsRender: [],
    countPages: 0,
    page: 1,
  })),
  on(ProblemSetActions.updateProblems, (currentState, action) => ({
    ...currentState,
    problems: action.problems,
  })),
  on(ProblemSetActions.updateProblemsRender, (currentState) => {
    const start = (currentState.page - 1) * 100;
    const end = start + 100;
    return {
      ...currentState,
      problemsRender: currentState.problems.slice(start, end),
    };
  })
);
