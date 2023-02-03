import React, { useContext } from "react";
import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { CyclesContext } from "../../contexts/CyclesContext";
import * as S from "./styles";

export function History() {
  const { cycles } = useContext(CyclesContext);

  return (
    <S.Container>
      <h1>Meu Histórico</h1>

      <S.HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map(cycle => (
              <tr key={cycle.id}>
                <td>{cycle.name}</td>
                <td>{cycle.minutes} minutos</td>
                <td>{formatDistanceToNow(cycle.startDate, { addSuffix: true, locale: ptBR })}</td>
                <td>
                  {cycle.finishedAt && <S.Status colorStatus="green">Concluido</S.Status>}
                  {cycle.stoppedAt && <S.Status colorStatus="red">Interrompido</S.Status>}
                  {!cycle.finishedAt && !cycle.stoppedAt && <S.Status colorStatus="yellow">Em andamento</S.Status>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </S.HistoryList>
    </S.Container>
  );
}
