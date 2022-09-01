import styled from "styled-components";

export const ContainerButton = styled.button`
  background-color: ${({ theme }) => theme.black};
  color: ${({ theme }) => theme.white};
  padding: 1rem;
`;
