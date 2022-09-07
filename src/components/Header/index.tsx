import React from "react";
import { Timer, Scroll } from "phosphor-react";
import { LogoIcon } from "../../common/icons";
import * as S from "./styles";

export function Header() {
  return (
    <S.Container>
      <LogoIcon />
      <nav>
        <a href=""><Timer width={24} /></a>
        <a href=""><Scroll width={24} /></a>
      </nav>
    </S.Container>
  );
}
