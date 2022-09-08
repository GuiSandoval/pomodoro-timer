import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Play } from "phosphor-react";
import * as S from "./styles";
import { Button } from "../../components/Button";

const newPomodoFormSchemaValidation = zod.object({
  nameProject: zod.string().min(1, "Informe  a tarefa"),
  minutesAmount: zod
    .number()
    .min(5)
    .max(60)
});

export function Home() {
  console.log("Renderizou o Componente");
  const { register, handleSubmit, watch } = useForm({ resolver: zodResolver(newPomodoFormSchemaValidation) });
  const nameProject = watch("nameProject");

  function handleSendForm(data: any) {
    console.log("Executou aqui", data);
  }

  return (
    <S.Container>
      <form action="" onSubmit={handleSubmit(handleSendForm)}>
        <S.FormContainer>
          <label htmlFor="nameProject">Vou trabalhar em</label>
          <S.InputTask
            type="text"
            id="nameProject"
            list="suggestedProjects"
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
            {...register("minutesAmount", { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </S.FormContainer>

        <S.CountdownContainer>
          <span>0</span>
          <span>0</span>
          <S.Separator>:</S.Separator>
          <span>0</span>
          <span>0</span>
        </S.CountdownContainer>

        <Button
          type="submit"
          disabled={!nameProject}
          icon={<Play size={24} />}
        >
          Começar
        </Button>
      </form>
    </S.Container>
  );
}
