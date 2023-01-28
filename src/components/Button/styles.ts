import styled from "styled-components";

interface ButtonProps {
  color?: "danger";
}

export const ContainerButton = styled.button<ButtonProps>`
  background-color: ${({ theme, color }) =>
    color ? theme[color] : theme["green-500"]};
  color: ${({ theme }) => theme["gray-100"]};
  padding: 1rem;
  width: 100%;
  border: 0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: bold;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme["green-700"]};
  }
`;
