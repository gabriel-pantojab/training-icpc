import { Problem } from "@/models/model";

export interface State {
  [key: string]: TodosState;
}
export interface TodosState {
  problems: Problem[];
}

export const initialState: State = {};