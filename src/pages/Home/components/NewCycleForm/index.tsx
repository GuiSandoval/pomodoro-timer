import React, { useContext } from "react";
import { useFormContext } from "react-hook-form";

import { CyclesContext } from "../..";
import * as S from "./styles";

function NewCycleForm() {
  const { activeCycleId } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <S.FormContainer>
      <label htmlFor="nameProject">Vou trabalhar em</label>
      <S.InputTask
        type="text"
        id="nameProject"
        list="suggestedProjects"
        disabled={!!activeCycleId}
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
        min={1}
        max={60}
        disabled={!!activeCycleId}
        {...register("minutesAmount", { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </S.FormContainer>
  );
}

export { NewCycleForm };