import React, { createContext, useState } from "react";

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
function CyclesContextProvider({ children }: ICyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSeconds, setAmountSeconds] = useState(0);

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  function setSecondsPassed(seconds: number) {
    setAmountSeconds(seconds);
  }
  function markCurrentCycleAsFinished() {
    setCycles(prev => {
      const newCycles = prev.map(cycle => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            finishedAt: new Date()
          };
        }
        return cycle;
      });
      return newCycles;
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

    setCycles(prev => [...prev, newCycle]);
    setActiveCycleId(id);
    setAmountSeconds(0);

  }
  function stopCurrentCycle() {
    setCycles(prev => {
      const newCycles = prev.map(cycle => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            stoppedAt: new Date()
          };
        }
        return cycle;
      });
      return newCycles;
    });

    setActiveCycleId(null);
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