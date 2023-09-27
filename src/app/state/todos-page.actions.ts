import { createAction, props } from '@ngrx/store';
import { Problem } from '../models/model';

export const init = createAction('[My Problems Page] Init');

export const addProblem = createAction(
  '[Problem Set Page] Add Problem',
  props<{ problem: Problem }>()
);

export const removeProblem = createAction(
  '[My Problems Page] Remove Problem',
  props<{ problem: Problem }>()
);

export const markAsAccepted = createAction(
  '[My Problems Page] Mark as Accepted',
  props<{ problem: Problem }>()
);

export const markAsPending = createAction(
  '[My Problems Page] Mark as Pending',
  props<{ problem: Problem }>()
);
