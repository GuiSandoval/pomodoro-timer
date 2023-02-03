import { ICycle } from "./reducer";

export enum ActionTypes {
  ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
  STOP_CURRENT_CYCLE = "STOP_CURRENT_CYCLE",
  MARK_CURRENT_CYCLE_AS_FINISHED = "MARK_CURRENT_CYCLE_AS_FINISHED",
}

export const addNewCycleAction = (newCycle: ICycle) => ({
  type: ActionTypes.ADD_NEW_CYCLE,
  payload: {
    newCycle,
  },
});

export const stopCurrentCycleAction = () => ({
  type: ActionTypes.STOP_CURRENT_CYCLE,
});

export const markCurrentCycleAsFinishedAction = () => ({
  type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
});
