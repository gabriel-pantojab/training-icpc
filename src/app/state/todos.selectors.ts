import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './todos.state';

export const MY_PROPLEMS_FEATURE_KEY = 'myProblems' as const;

const todosState = createFeatureSelector<State>(MY_PROPLEMS_FEATURE_KEY);
export const problems = createSelector(todosState, (todosState) => todosState);

export const problemsDate = (date: string) => {
  return createSelector(problems, (problems) => {
    if (problems[date]) {
      return problems[date].problems;
    } else return [];
  });
};
