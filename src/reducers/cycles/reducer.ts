import { ActionTypes } from "./actions";

export interface ICycle {
  id: string;
  name: string;
  minutes: number;
  startDate: Date;
  stoppedAt?: Date;
  finishedAt?: Date;
}
interface ICycleState {
  cycles: ICycle[];
  activeCycleId: string | null;
}

export function cyclesReducer(state: ICycleState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      };
    case ActionTypes.STOP_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return {
              ...cycle,
              stoppedAt: new Date(),
            };
          }
          return cycle;
        }),
        activeCycleId: null,
      };
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return {
              ...cycle,
              finishedAt: new Date(),
            };
          }
          return cycle;
        }),
        activeCycleId: null,
      };
    default:
      return state;
  }
}
