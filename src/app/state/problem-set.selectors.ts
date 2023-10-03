import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProblemSetState } from './problem-set.reducer';

const problemSet = createFeatureSelector<ProblemSetState>('problemSet');

export const allProblems = createSelector(
  problemSet,
  (problemSet) => problemSet.problems
);

export const problemsRender = createSelector(
  problemSet,
  (problemSet) => problemSet.problemsRender
);
