import { createAction, props } from '@ngrx/store';
import { ProblemAPI } from '../models/model';

export const init = createAction('[Main Page] Init');

export const updateProblems = createAction(
  '[Main Page] Update Problems',
  props<{ problems: ProblemAPI[] }>()
);

export const updateProblemsRender = createAction(
  '[Main Page] Update Problems Render'
);
