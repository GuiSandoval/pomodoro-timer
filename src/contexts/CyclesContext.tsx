import React, { createContext, useReducer, useState } from "react";

interface Cycle {
  id: string;
  name: string;
  minutes: number;
  startDate: Date;
  stoppedAt?: Date;
  finishedAt?: Date;
}

interface ICreateCycleData {
  nameProject: string;
  minutesAmount: number;
}

interface ICycleContext {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSeconds: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: ICreateCycleData) => void;
  stopCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as ICycleContext);

interface ICyclesContextProviderProps {
  children: React.ReactNode;
}

interface ICycleState {
  cycles: Cycle[];
  activeCycleId: string | null;
}
function CyclesContextProvider({ children }: ICyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    (state: ICycleState, action: any) => {
      switch (action.type) {
        case "ADD_NEW_CYCLE":
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id
          };
        case "STOP_CURRENT_CYCLE":
          return {
            ...state,
            cycles: state.cycles.map(cycle => {
              if (cycle.id === action.payload.activeCycleId) {
                return {
                  ...cycle,
                  stoppedAt: new Date()
                };
              }
              return cycle;
            }),
            activeCycleId: null
          };
        case "MARK_CURRENT_CYCLE_AS_FINISHED":
          return {
            ...state,
            cycles: state.cycles.map(cycle => {
              if (cycle.id === action.payload.activeCycleId) {
                return {
                  ...cycle,
                  finishedAt: new Date()
                };
              }
              return cycle;
            }),
            activeCycleId: null
          };
        default:
          return state;
      }
    },
    {
      cycles: [],
      activeCycleId: null
    }
  );

  const { cycles, activeCycleId } = cyclesState;
  const [amountSeconds, setAmountSeconds] = useState(0);

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  function setSecondsPassed(seconds: number) {
    setAmountSeconds(seconds);
  }
  function markCurrentCycleAsFinished() {
    dispatch({
      type: "MARK_CURRENT_CYCLE_AS_FINISHED",
      payload: {
        activeCycleId
      }
    });
  }

  function createNewCycle(data: ICreateCycleData) {
    const id = String(new Date().getTime());

    const newCycle = {
      id,
      name: data.nameProject,
      minutes: data.minutesAmount,
      startDate: new Date()
    };

    dispatch({
      type: "ADD_NEW_CYCLE",
      payload: {
        newCycle
      }
    });
    setAmountSeconds(0);

  }
  function stopCurrentCycle() {

    dispatch({
      type: "STOP_CURRENT_CYCLE",
      payload: {
        activeCycleId
      }
    });

  }

  return (
    <CyclesContext.Provider value={{
      activeCycle,
      activeCycleId,
      amountSeconds,
      markCurrentCycleAsFinished,
      setSecondsPassed,
      createNewCycle,
      stopCurrentCycle,
      cycles
    }}>
      {children}
    </CyclesContext.Provider >
  );
}

export { CyclesContextProvider };