import React, { ReactNode } from "react";
import * as S from "./styles";

interface PropsButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  icon?: ReactNode
}
export function Button({ children, icon, ...props }: PropsButton) {
  return (
    <S.ContainerButton {...props}>
      {icon}
      {children}
    </S.ContainerButton>
  );
}
