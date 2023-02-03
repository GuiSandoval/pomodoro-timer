import React, { createContext, useEffect, useReducer, useState } from "react";
import { differenceInSeconds } from "date-fns";
import {
  addNewCycleAction,
  markCurrentCycleAsFinishedAction,
  stopCurrentCycleAction
} from "../reducers/cycles/actions";
import { ICycle, cyclesReducer } from "../reducers/cycles/reducer";

interface ICreateCycleData {
  nameProject: string;
  minutesAmount: number;
}

interface ICycleContext {
  cycles: ICycle[];
  activeCycle: ICycle | undefined;
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

function CyclesContextProvider({ children }: ICyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null
    },
    () => {
      const storedStateJSON = localStorage.getItem("@pomodoro-timer:cycles-state-1.0.0");

      if (storedStateJSON) {
        return JSON.parse(storedStateJSON);
      }

      return {
        cycles: [],
        activeCycleId: null
      };

    }
  );

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  const [amountSeconds, setAmountSeconds] = useState(() => {

    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }

    return 0;
  });


  function setSecondsPassed(seconds: number) {
    setAmountSeconds(seconds);
  }
  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  function createNewCycle(data: ICreateCycleData) {
    const id = String(new Date().getTime());

    const newCycle = {
      id,
      name: data.nameProject,
      minutes: data.minutesAmount,
      startDate: new Date()
    };

    dispatch(addNewCycleAction(newCycle));
    setAmountSeconds(0);

  }
  function stopCurrentCycle() {

    dispatch(stopCurrentCycleAction());

  }

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem("@pomodoro-timer:cycles-state-1.0.0", stateJSON);
  }, [cyclesState]);

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