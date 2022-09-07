import React from "react";
import { Play } from "phosphor-react";
import * as S from "./styles";

export function Home() {
  return (
    <S.Container>
      <form action="">
        <S.FormContainer>
          <label htmlFor="nameProject">Vou trabalhar em</label>
          <input type="text" id="nameProject" />

          <label htmlFor="minutesAmount">durante</label>
          <input type="text" id="minutesAmount" />

          <span>minutos.</span>
        </S.FormContainer>

        <S.CountdownContainer>
          <span>0</span>
          <span>0</span>
          <S.Separator>:</S.Separator>
          <span>0</span>
          <span>0</span>
        </S.CountdownContainer>

        <button type="submit">
          <Play size={24} />
          Começar
        </button>
      </form>
    </S.Container>
  );
}
