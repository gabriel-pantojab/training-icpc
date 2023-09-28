import { createReducer, on } from '@ngrx/store';
import { TodosPageActions } from '.';
import { Problem, ProblemStatus } from '../models/model';

export const todosFeatureKey = 'todosState';
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
  }),
  on(TodosPageActions.markAsAccepted, (currentState, action) => {
    let temp = { ...currentState };
    const index = temp.problems.findIndex((problem) => {
      return problem.id === action.problem.id;
    });
    temp.problems[index].status = ProblemStatus.ACCEPTED;
    return temp;
  }),
  on(TodosPageActions.markAsPending, (currentState, action) => {
    let temp = { ...currentState };
    const index = temp.problems.findIndex((problem) => {
      return problem.id === action.problem.id;
    });
    temp.problems[index].status = ProblemStatus.PENDING;
    return temp;
  })
);
