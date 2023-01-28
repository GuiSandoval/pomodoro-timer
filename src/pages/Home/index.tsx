import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { HandPalm, Play } from "phosphor-react";
import * as S from "./styles";
import { Button } from "../../components/Button";

const newPomodoFormSchemaValidation = zod.object({
  nameProject: zod.string().min(1, "Informe  a tarefa"),
  minutesAmount: zod
    .number()
    .min(5)
    .max(60)
});

type newPomodoFormData = zod.infer<typeof newPomodoFormSchemaValidation>

interface Cycle {
  id: string;
  name: string;
  minutes: number;
  stoppedAt?: Date;

}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycle, setActiveCycle] = useState<string | null>(null);
  const [amountSeconds, setAmountSeconds] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<newPomodoFormData>({
    resolver: zodResolver(newPomodoFormSchemaValidation),
    defaultValues: {
      nameProject: "",
      minutesAmount: 0
    }
  });
  const nameProject = watch("nameProject");


  function handleSendForm(data: newPomodoFormData) {
    const id = String(new Date().getTime());

    const newCycle = {
      id,
      name: data.nameProject,
      minutes: data.minutesAmount
    };

    setCycles(prev => [...prev, newCycle]);
    setActiveCycle(id);
    setAmountSeconds(0);

    reset();
  }

  function handleStopCycle() {
    setCycles(prev => {
      const newCycles = prev.map(cycle => {
        if (cycle.id === activeCycle) {
          return {
            ...cycle,
            stoppedAt: new Date()
          };
        }
        return cycle;
      });
      return newCycles;
    });

    setActiveCycle(null);
  }

  const activeCicle = cycles.find(cycle => cycle.id === activeCycle);

  const totalSeconds = activeCicle ? activeCicle.minutes * 60 : 0;
  const currentSeconds = activeCicle ? totalSeconds - amountSeconds : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    let interval: number;

    if (activeCicle) {
      interval = setInterval(() => {
        setAmountSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);

  }, [activeCycle]);


  useEffect(() => {
    if (currentSeconds > 0) {
      document.title = `Pomodoro - ${minutes}:${seconds} `;
    }
  }, [minutes, seconds]);


  return (
    <S.Container>
      <form action="" onSubmit={handleSubmit(handleSendForm)}>
        <S.FormContainer>
          <label htmlFor="nameProject">Vou trabalhar em</label>
          <S.InputTask
            type="text"
            id="nameProject"
            list="suggestedProjects"
            disabled={!!activeCycle}
            placeholder="Dê um nome para o seu projeto"
            {...register("nameProject")}
          />

          <datalist id="suggestedProjects">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <S.InputMinutes
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            disabled={!!activeCycle}
            {...register("minutesAmount", { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </S.FormContainer>

        <S.CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <S.Separator>:</S.Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </S.CountdownContainer>

        {activeCicle ?
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
