import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, todosFeatureKey } from './todos.reducer';

const todosState = createFeatureSelector<State>(todosFeatureKey);
export const problems = createSelector(todosState, (todosState) => todosState);

export const problemsDate = (date: string) => {
  return createSelector(problems, (problems) => {
    if (problems[date]) {
      return problems[date].problems;
    } else return [];
  });
};
