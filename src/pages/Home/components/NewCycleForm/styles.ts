import styled from "styled-components";

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme["gray-100"]};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`;

const InputBase = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${({ theme }) => theme["gray-500"]};
  color: ${({ theme }) => theme["gray-100"]};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme["green-500"]};
  }
`;

export const InputTask = styled(InputBase)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`;

export const InputMinutes = styled(InputBase)`
  width: 4rem;
`;
