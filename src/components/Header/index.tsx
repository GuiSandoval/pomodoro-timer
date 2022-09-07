import React from "react";
import { Timer, Scroll } from "phosphor-react";
import { NavLink } from "react-router-dom";
import { LogoIcon } from "../../common/icons";
import * as S from "./styles";

export function Header() {
  return (
    <S.Container>
      <LogoIcon />
      <nav>
        <NavLink to='/' title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="History">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </S.Container>
  );
}
