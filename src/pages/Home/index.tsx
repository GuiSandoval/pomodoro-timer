import React, { createContext, useState } from "react";
import * as zod from "zod";
import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../components/Button";

import { NewCycleForm, Countdown } from "./components";
import * as S from "./styles";

interface Cycle {
  id: string;
  name: string;
  minutes: number;
  startDate: Date;
  stoppedAt?: Date;
  finishedAt?: Date;
}

// Validations
const newPomodoFormSchemaValidation = zod.object({
  nameProject: zod.string().min(1, "Informe  a tarefa"),
  minutesAmount: zod
    .number()
    .min(1)
    .max(60)
});

type newPomodoFormData = zod.infer<typeof newPomodoFormSchemaValidation>

// Contexts
interface ICycleContext {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSeconds: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
}
export const CyclesContext = createContext({} as ICycleContext);

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSeconds, setAmountSeconds] = useState(0);

  const newCycleForm = useForm<newPomodoFormData>({
    resolver: zodResolver(newPomodoFormSchemaValidation),
    defaultValues: {
      nameProject: "",
      minutesAmount: 0
    }
  });
  const { handleSubmit, reset, watch } = newCycleForm;


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
  function handleSendForm(data: newPomodoFormData) {
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

    reset();
  }
  function handleStopCycle() {
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

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);
  const nameProject = watch("nameProject");

  return (
    <S.Container>
      <form action="" onSubmit={handleSubmit(handleSendForm)}>

        <CyclesContext.Provider value={{
          activeCycle,
          activeCycleId,
          amountSeconds,
          markCurrentCycleAsFinished,
          setSecondsPassed
        }}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ?
          <Button
            type="button"
            color="danger"
            icon={<HandPalm size={24} />}
            onClick={handleStopCycle}
          >
            Interromper
          </Button> :
          <Button
            type="submit"
            disabled={!nameProject}
            icon={<Play size={24} />}
          >
            Começar
          </Button>
        }
      </form>
    </S.Container>
  );
}
