import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState, todosFeatureKey } from './todos.reducer';

const todosState = createFeatureSelector<TodosState>(todosFeatureKey);

export const problems = createSelector(
  todosState,
  (todosState) => todosState.problems
);
