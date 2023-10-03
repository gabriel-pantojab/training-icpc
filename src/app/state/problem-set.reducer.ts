import { createReducer, on } from '@ngrx/store';
import { ProblemAPI } from '../models/model';
import { ProblemSetActions } from '.';

export interface ProblemSetState {
  problems: ProblemAPI[];
  problemsRender: ProblemAPI[];
}

const initState: ProblemSetState = {
  problems: [],
  problemsRender: [],
};

export const problemSetReducer = createReducer(
  initState,
  on(ProblemSetActions.init, () => ({
    problems: [],
    problemsRender: [],
  })),
  on(ProblemSetActions.updateProblems, (currentState, action) => ({
    ...currentState,
    problems: action.problems,
  })),
  on(ProblemSetActions.updateProblemsRender, (currentState, action) => ({
    ...currentState,
    problemsRender: action.problemsRender,
  }))
);
