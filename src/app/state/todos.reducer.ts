import { createReducer, on } from '@ngrx/store';
import { TodosPageActions } from '.';
import { Problem, ProblemStatus } from '../models/model';
import { getCurrentDateFormat } from '../utils/utils';

export const todosFeatureKey = 'todosState';

export interface State {
  [key: string]: TodosState;
}
export interface TodosState {
  problems: Problem[];
}

const initialState: State = {};

export const todosReducer = createReducer(
  initialState,
  on(TodosPageActions.init, () => initialState),
  on(TodosPageActions.addProblem, (currentState, action) => {
    const key = getCurrentDateFormat();
    const temp = structuredClone(currentState);
    if (!temp[key]) temp[key] = { problems: [] };
    temp[key].problems.push(action.problem);
    return temp;
  }),
  on(TodosPageActions.removeProblem, (currentState, action) => {
    const problemId = action.id;
    const temp = structuredClone(currentState);
    let key;
    for (const k in temp) {
      if (temp[k].problems.find((problem) => problem.id === problemId)) {
        key = k;
        break;
      }
    }
    if (key === undefined) return temp;
    temp[key].problems = temp[key].problems.filter((problem) => {
      return problem.id !== problemId;
    });
    return temp;
  }),
  on(TodosPageActions.markAsAccepted, (currentState, action) => {
    let temp = structuredClone(currentState);
    const key = action.date;
    const index = temp[key].problems.findIndex((problem) => {
      return problem.id === action.id;
    });
    if (index === -1) return temp;
    temp[key].problems[index].status = ProblemStatus.ACCEPTED;
    return temp;
  }),
  on(TodosPageActions.markAsPending, (currentState, action) => {
    let temp = structuredClone(currentState);
    const key = action.date;
    const index = temp[key].problems.findIndex((problem) => {
      return problem.id === action.id;
    });
    if (index === -1) return temp;
    temp[key].problems[index].status = ProblemStatus.PENDING;
    return temp;
  })
);
