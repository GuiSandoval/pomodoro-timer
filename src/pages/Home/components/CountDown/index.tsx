import React, { useContext, useEffect } from "react";
import { differenceInSeconds } from "date-fns";

import { CyclesContext } from "../../../../contexts/CyclesContext";

import * as S from "./styles";

function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    amountSeconds,
    markCurrentCycleAsFinished,
    setSecondsPassed
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.minutes * 60 : 0;

  const currentSeconds = activeCycle ? totalSeconds - amountSeconds : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");


  useEffect(() => {
    if (currentSeconds >= 0) {
      document.title = `Pomodoro - ${minutes}:${seconds} `;
    }
  }, [minutes, seconds]);


  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiff = differenceInSeconds(new Date(), new Date(activeCycle.startDate));

        if (secondsDiff >= totalSeconds) {
          markCurrentCycleAsFinished();
          setSecondsPassed(totalSeconds);
          clearInterval(interval);
          return;
        }
        setSecondsPassed(secondsDiff);
      }, 1000);
    }

    return () => clearInterval(interval);

  }, [activeCycleId, activeCycle, markCurrentCycleAsFinished, totalSeconds]);

  return (
    <S.CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <S.Separator>:</S.Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </S.CountdownContainer>
  );
}

export { Countdown };