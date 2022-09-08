import React from "react";
import { Play } from "phosphor-react";
import * as S from "./styles";
import { Button } from "../../components/Button";

export function Home() {
  return (
    <S.Container>
      <form action="">
        <S.FormContainer>
          <label htmlFor="nameProject">Vou trabalhar em</label>
          <S.InputTask
            type="text"
            id="nameProject"
            list="suggestedProjects"
            placeholder="Dê um nome para o seu projeto"
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
          icon={<Play size={24} />}
        >
          Começar
        </Button>
      </form>
    </S.Container>
  );
}
