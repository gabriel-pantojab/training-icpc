import { createAction, props } from '@ngrx/store';
import { Problem } from '../models/model';
import { State } from './todos.reducer';

export const init = createAction('[My Problems Page] Init');

export const addProblem = createAction(
  '[Problem Set Page] Add Problem',
  props<{ problem: Problem }>()
);

export const removeProblem = createAction(
  '[My Problems Page] Remove Problem',
  props<{ id: string }>()
);

export const markAsAccepted = createAction(
  '[My Problems Page] Mark as Accepted',
  props<{ id: string; date: string }>()
);

export const markAsPending = createAction(
  '[My Problems Page] Mark as Pending',
  props<{ id: string; date: string }>()
);

export const setProblems = createAction(
  '[My Problems Page] Set Problems',
  props<{ problems: State }>()
);
