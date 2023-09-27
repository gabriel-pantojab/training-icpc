import { createReducer, on } from '@ngrx/store';
import { TodosPageActions } from '.';
import { Problem } from '../models/model';

export interface TodosState {
  problems: Problem[];
}

const initialState: TodosState = {
  problems: [],
};

const initialTodos: Problem[] = [];

export const todosReducer = createReducer(
  initialState,
  on(TodosPageActions.init, () => ({
    problems: initialTodos,
  })),
  on(TodosPageActions.addProblem, (currentState, action) => ({
    ...currentState,
    problems: [...currentState.problems, action.problem],
  })),
  on(TodosPageActions.removeProblem, (currentState, action) => {
    const problemR = action.problem;
    return {
      ...currentState,
      problems: currentState.problems.filter((problem) => {
        return problem.id !== problemR.id;
      }),
    };
  })
);
