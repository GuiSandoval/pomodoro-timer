import React, { useContext } from "react";
import * as zod from "zod";
import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../components/Button";
import { CyclesContext } from "../../contexts/CyclesContext";

import { NewCycleForm, Countdown } from "./components";
import * as S from "./styles";

const newPomodoFormSchemaValidation = zod.object({
  nameProject: zod.string().min(1, "Informe  a tarefa"),
  minutesAmount: zod
    .number()
    .min(1)
    .max(60)
});

type newPomodoFormData = zod.infer<typeof newPomodoFormSchemaValidation>

export function Home() {
  const { activeCycle, createNewCycle, stopCurrentCycle } = useContext(CyclesContext);

  const newCycleForm = useForm<newPomodoFormData>({
    resolver: zodResolver(newPomodoFormSchemaValidation),
    defaultValues: {
      nameProject: "",
      minutesAmount: 0
    }
  });
  const { handleSubmit, reset, watch } = newCycleForm;

  const nameProject = watch("nameProject");

  function handleCreateNewCycle(data: newPomodoFormData) {
    createNewCycle(data);
    reset();
  }

  return (
    <S.Container>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ?
          <Button
            type="button"
            color="danger"
            icon={<HandPalm size={24} />}
            onClick={stopCurrentCycle}
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
