import { createReducer, on } from '@ngrx/store';
import { Problem } from '../services/codeforces.service';
import { TodosPageActions } from '.';

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
        const id1 = problem.contestId + problem.index;
        const id2 = problemR.contestId + problemR.index;
        return id1 !== id2;
      }),
    };
  })
);
